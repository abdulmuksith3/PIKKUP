import firebase from "firebase";
import "firebase/auth";
import db from "../../db";
import { logMessage } from "./Log";
import { getDistance } from "geolib";
import { NEW, ACCEPTED, CANCELLED, ONGOING, COMPLETED } from "../constants/BookingStatus";

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
            requestId: key,
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
            const {bookingId, requestId, status, driverId} = snapshot.val()
            if(status === NEW){
                await removeDriverRequest(requestId)
            } else {
                db.ref(`users/${driverId}/activeBooking`).remove()
                db.ref(`bookings/${bookingId}`).update({status:CANCELLED})
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
    const driverId = firebase.auth().currentUser.uid;
    try {
        const myRef = db.ref().push();
        const key = myRef.getKey();
        db.ref(`users/${driverId}/activeBooking`).update({
            bookingId: key,
            requestId: id,
            status: ACCEPTED,
            riderId: riderId,
            driverId: driverId
        });
        db.ref(`users/${riderId}/activeBooking`).update({
            bookingId: key,
            requestId: id,
            status: ACCEPTED,
            riderId: riderId,
            driverId: driverId
        });
        db.ref(`users/${riderId}/bookingHistory/${key}`).set({id:key, riderId, driverId});
        db.ref(`users/${driverId}/bookingHistory/${key}`).set({id:key, riderId, driverId});
        await db.ref(`bookingRequest/${id}`).once('value', async (snapshot) => {
            let data = snapshot.val()
            data.status = ACCEPTED;
            db.ref(`bookings/${key}`).set({
                id: key,
                driverId,
                status: ONGOING,
            });
            db.ref(`bookings/${key}/bookingRequest/${id}`).set(data);
            await removeDriverRequest(id)
        })
    } catch (error) {
        logMessage({
            title: 'acceptRequest Error',
            body: error.message,
        })     
    }
}
export const updateRequest = async (request) => {
    const {requestId, bookingId, data} = request;
    try {
        db.ref(`bookings/${bookingId}/bookingRequest/${requestId}`).update(data);
    } catch (error) {
        logMessage({
            title: 'updateRequest Error',
            body: error.message,
        })     
    }
}

export const finishRequest = (request) => {
    const {requestId, bookingId, data, riderId} = request;
    try {
        db.ref(`bookings/${bookingId}/bookingRequest/${requestId}`).update(data);
        db.ref(`users/${riderId}/activeBooking`).remove();
    } catch (error) {
        logMessage({
            title: 'finishRequest Error',
            body: error.message,
        })     
    }
}

export const finishBooking = (request) => {
    const {requestId, bookingId, data} = request;
    try {
        db.ref(`bookings/${bookingId}`).update({
            status: COMPLETED
        });
        db.ref(`users/${firebase.auth().currentUser.uid}/activeBooking`).remove();
        let data = db.ref(`bookings/${bookingId}`).once('value')
        if(snapshot.val()){
            const requests = Object.keys(data).map((i) => {
                data[i].id = i
                return data[i]
            })
            requests.forEach(request => {
                db.ref(`users/${request.riderId}/activeBooking`).remove()
            });
        }
    } catch (error) {
        logMessage({
            title: 'finishBooking Error',
            body: error.message,
        })     
    }
} 