import firebase from "firebase";
import "firebase/auth";
import db from "../../db";
import { logMessage } from "./Log";
import { getDistance } from "geolib";

const NEW = "NEW";
const ACCEPTED = "ACCEPTED";
const ARRIVED = "ARRIVED";
const COMPLETED = "COMPLETED";
const PAID = "PAID";
const CANCELLED = "CANCELLED";


export const AddBookingRequest = async (data) => {
    try {
        const {pickup} = data;
        const tempDrivers = await getDrivers()
        let drivers = []
        tempDrivers?.forEach(item => {
            let driver = item;
            let driverLat = driver.lastLocation?.coords?.latitude;
            let driverLng = driver.lastLocation?.coords?.longitude;
            driver.distance = getDistance(
                {latitude: pickup.latitude, longitude: pickup.longitude}, 
                {latitude: driverLat, longitude: driverLng}
            )
            drivers.push(driver);
        });
        drivers.sort((a,b) => a.distance - b.distance)
        const myRef = db.ref().push();
        const key = myRef.getKey(); 
        db.ref(`bookingRequest/${key}`).set({
            ...data,
            riderId: firebase.auth().currentUser.uid,
            drivers: drivers.map(driver => driver.id)
        });
        db.ref(`users/${firebase.auth().currentUser.uid}/activeBooking`).update({
            id: key,
            status: NEW
        });
        drivers.forEach(driver => {
            db.ref(`users/${driver.id}/requests/${key}`).set({
                id: key,
                status: NEW,
                riderId: firebase.auth().currentUser.uid,
            });
        });
    } 
    catch (error) {
        logMessage({
            title: 'AddBookingRequest Error',
            body: error.message,
        })
    }
}

const getDrivers = async () => {
    let drivers = [];
    try {
        const snapshot = await db.ref(`users`).orderByChild('type').equalTo('Driver').once('value')
        if(snapshot.val()){
            snapshot.forEach((childSnapshot) => {              
                let driver = childSnapshot.val();
                driver.id = childSnapshot.key;
                drivers.push(driver)  
            })
        }
        return drivers;
      } 
    catch (error) {
        logMessage({
            title: 'getDrivers Error',
            body: error.message,
        })
        return drivers;
    }
}

export const cancelBooking = async () => {
    try {
        const snapshot = await db.ref(`users/${firebase.auth().currentUser.uid}/activeBooking`).once('value')
        if(snapshot.val()){
            const {id, status, driverId} = snapshot.val()
            if(status === NEW){
                await removeDriverRequest(id)
            } else {
                db.ref(`users/${driverId}/activeBooking`).remove()
                db.ref(`bookings/${id}`).update({status:CANCELLED})
            }
            db.ref(`users/${firebase.auth().currentUser.uid}/activeBooking`).remove()
        return null;
    } else {
        return null;
    }
    } catch (error) {
        logMessage({
            title: 'cancelBooking Error',
            body: error.message,
        })  
    }
}

const removeDriverRequest = async (id) => {
    const requestSnapshot = await db.ref(`bookingRequest/${id}`).once('value');
    if(requestSnapshot.val()){
        const drivers = requestSnapshot.val().drivers;
        if(drivers){
            drivers.forEach(driverId => {
                db.ref(`users/${driverId}/requests/${id}`).set({})      
            });
        }
    }
    db.ref(`bookingRequest/${id}`).remove()
}


export const acceptRequest = async (request) => {
    const {id, riderId} = request;
    // console.log({id})
    // return;
    const driverId = firebase.auth().currentUser.uid;
    try {
        db.ref(`users/${driverId}/activeBooking`).update({
            id: id,
            status: ACCEPTED,
            riderId: riderId,
            driverId: driverId
        });
        db.ref(`users/${riderId}/activeBooking`).update({
            id: id,
            status: ACCEPTED,
            riderId: riderId,
            driverId: driverId
        });
        db.ref(`users/${riderId}/bookingHistory/${id}`).set({id, riderId, driverId});
        db.ref(`users/${driverId}/bookingHistory/${id}`).set({id, riderId, driverId});
        await db.ref(`bookingRequest/${id}`).once('value', async (snapshot) => {
            let data = snapshot.val()
            data.drivers = null;
            data.status = ACCEPTED;
            db.ref(`bookings/${id}`).set({
                ...data,
                driverId: driverId
            });
            await removeDriverRequest(id)
        })
    } catch (error) {
        logMessage({
            title: 'acceptRequest Error',
            body: error.message,
        })     
    }
}

export const confirmBooking = () => {
    
} 