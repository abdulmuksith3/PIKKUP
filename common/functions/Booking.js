import firebase from "firebase";
import "firebase/auth";
import db from "../../db";
import { logMessage } from "./Log";
import { getDistance } from "geolib";

const NEW = "NEW"

export const AddBookingRequest = (data) => {
    try {
        const myRef = db.ref().push();
        const key = myRef.getKey(); 
        db.ref(`bookingRequest/${key}`).set({
            ...data,
            riderId: firebase.auth().currentUser.uid
        });
        db.ref(`users/${firebase.auth().currentUser.uid}/activeBooking`).update({
            id: key,
            status: "NEW"
        });
      } 
    catch (err) {
        logMessage({
            title: 'AddBookingRequest Error',
            body: err.message,
        })
    }
}

export const getDrivers = async () => {
    console.log("___________ getDrivers")
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
        console.log("DRIVERSSS", drivers)
        return drivers;
      } 
    catch (err) {
        logMessage({
            title: 'getDrivers Error',
            body: err.message,
        })
        return drivers;
    }
}


export const getActiveBooking = async () => {
    const snapshot = await db.ref(`users/${firebase.auth().currentUser.uid}/activeBooking`).once('value')
    if(snapshot.val()){
        const {id, status} = snapshot.val()
        if(status === NEW){
            const childSnapshot = await db.ref(`bookingRequest/${id}`).once('value')
            if(childSnapshot.val()){
                return childSnapshot.val()
            } else {
                return null;
            }
        } else {
            const childSnapshot = await db.ref(`bookings/${id}`).once('value')
            if(childSnapshot.val()){
                return childSnapshot.val()
            } else {
                return null;
            }
        }
    } else {
        return null;
    }
}

export const cancelBooking = async () => {
    const snapshot = await db.ref(`users/${firebase.auth().currentUser.uid}/activeBooking`).once('value')
    if(snapshot.val()){
        const {id, status} = snapshot.val()
        if(status === NEW){
            db.ref(`bookingRequest/${id}`).remove()
        } else {
            db.ref(`bookings/${id}`).remove()
        }
        db.ref(`users/${firebase.auth().currentUser.uid}/activeBooking`).remove()
        return null;
    } else {
        return null;
    }
}

export const confirmBooking = () => {
    
} 