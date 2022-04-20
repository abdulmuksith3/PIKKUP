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
                title: 'getRoute Error',
                body: err.message,
            })
            return null;
        }
}

