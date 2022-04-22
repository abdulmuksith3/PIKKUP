import { ARRIVED, COMPLETED, PAID } from "../constants/BookingStatus";
import { getUser } from "./Authentication";
import { logMessage } from "./Log";

const API_KEY = "ADGeaR17csnMIb1yXpbAl9Qrt0NwN5DA";


export const getRoute = async (pickup, dropoff) => {
    try {
        const URL = `https://api.tomtom.com/routing/1/calculateRoute/${pickup.latitude},${pickup.longitude}:${dropoff.latitude},${dropoff.longitude}/json?key=${API_KEY}`;
        const response = await fetch(URL, {
            method: "GET",
            headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            }
        })
        let res = await response.json()
        if(res) {
            let routes = res.routes[0].legs[0].points;
            const {lengthInMeters, travelTimeInSeconds} = res.routes[0].summary;
            let tempRoutes = []
            routes.forEach(item => {
                const {latitude, longitude} = item;
                tempRoutes.push({latitude, longitude})
            });

            return ({
                route:tempRoutes,
                distance: lengthInMeters,
                duration: travelTimeInSeconds 
            });
        }
        else {
            return null;
        }
        } catch (err) {
            logMessage({
                title: 'getRoute Error',
                body: err.message,
            })
            return null;
        }
}

export const getTripRoute = async (data, location) => {
    try {
        let waypoints = [{
            point: location.coords,
        }]
        let reqWaypoints = [{
            point: location.coords,
        }]
        let completed = []
        const requests = Object.keys(data).map((i) => {
            data[i].id = i
            return data[i]
        })
        requests.forEach(request => {
            if(request.status === PAID){

            } 
            else if(request.status === COMPLETED){
                completed.push(request);
            }
            else {
                if(request.status !== ARRIVED && request.status !== COMPLETED){
                    let waypointPickup = {
                        request: request.id,
                        riderId: request.riderId,
                        point: request.pickup,
                        isPickup: true,
                        requests: request
                    }
                    let reqPickup = {
                        point: {
                            latitude: request.pickup.longitude,
                            longitude: request.pickup.latitude,
                        },
                    }
                    reqWaypoints.push(reqPickup)
                    waypoints.push(waypointPickup)
                }
                if(request.status !== COMPLETED){
                    let waypointDropoff = {
                        request: request.id,
                        riderId: request.riderId,
                        point: request.dropoff,
                        isDropoff: true,
                        requests: request
                    }
                    let reqDropoff = {
                        point: {
                            latitude: request.dropoff.longitude,
                            longitude: request.dropoff.latitude,
                        }
                    }
                    reqWaypoints.push(reqDropoff)
                    waypoints.push(waypointDropoff)
                }
            }
        });

        if(waypoints.length <= 1){
            return ({waypoints: null, destinations: null, completed: completed, finished: true});
        }
        const URL = `https://api.tomtom.com/routing/waypointoptimization/1/best?key=${API_KEY}`;
        const response = await fetch(URL, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
            body: JSON.stringify({
                waypoints:reqWaypoints
            })
        })
        let res = await response.json()
        if(res) {
            const order = res.optimizedOrder;
            let finalWay = []
            for (let index = 0; index < waypoints.length - 1; index++) {
                const item = index
                const item2 = index + 1;
                const pointA = {
                    latitude: waypoints[item].point.latitude,
                    longitude: waypoints[item].point.longitude,
                }
                const pointB = {
                    latitude: waypoints[item2].point.latitude,
                    longitude: waypoints[item2].point.longitude,
                }
                const singleRoute = await getRoute(pointA, pointB)
                const user =  await getUser(waypoints[item].riderId)
                finalWay.push({
                    data: waypoints[item2],
                    route: singleRoute,
                    user: user
                })
            }
            // console.log("WAYYYYYYY ", finalWay)
            return ({waypoints:finalWay, destinations: waypoints, completed: completed});
        }
        else {
            return ({waypoints: null, destinations: null, completed: null});
        }
        } catch (err) {
            logMessage({
                title: 'getTripRoute Error',
                body: err.message,
            })
            return ({waypoints: null, destinations: null, completed: null});
        }
}

export const getSearchResult = async (name) => {
    try {
        const URL = `https://api.tomtom.com/search/2/search/pizza.json?lat=37.337&lon=-121.89&minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=off&key=${API_KEY}`;
        const response = await fetch(URL, {
            method: "GET",
            headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            }
        })
        let res = await response.json()
        if(res) {
            let routes = res.routes[0].legs[0].points;
            let tempRoutes = []
            routes.forEach(item => {
                const {latitude, longitude} = item;
                tempRoutes.push({latitude, longitude})
            });
            return tempRoutes;
        }
        else {
            return null;
        }
        } catch (err) {
            logMessage({
                title: 'getSearchResult Error',
                body: err.message,
            })
            return null;
        }
}

