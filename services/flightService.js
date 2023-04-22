const flightModel = require('../models/flightModel')

class flightService {
    static getFlightList = (origin,destination,date) => {
        try{
            const map = flightModel.getMap(origin,destination,date);
            if(!map) return []
            const flightsArray = []
            map.forEach((flight_number)=>{
                flightsArray.push(flightModel.getFlight(flight_number))
            })
            return flightsArray
        }catch (err){
            console.error('Failed to get flightList:', err);
            return [];
        }

    }
    static getFlight = (flight_number) => {
        try{
            const flight = flightModel.getFlight(flight_number);
            return flight || null
        }catch (err){
            console.error('Failed to get flight:', err);
            return null;
        }
    }
}

module.exports = flightService;