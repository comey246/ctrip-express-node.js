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
    static bookFlight = (flight_number,info) => {
        try{
            const flight = flightModel.getFlight(flight_number);
            console.log(flight.seats_available ,info.tickets)
            if(flight.seats_available >info.tickets ){
                return flightModel.changeFlight(flight_number, info.tickets, 'inc')
            }return null
        }catch (err){
            console.error('Failed to book flight:', err);
            return null;
        }
    }
}

module.exports = flightService;