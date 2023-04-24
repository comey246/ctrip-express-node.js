const fs = require('fs');
const mapPath = './dataBase/flightMap.json';
const flightPath = './dataBase/flight.json';
// 读取 JSON 数据库文件
const flightData = fs.readFileSync(flightPath);
const flightDatabase = JSON.parse(flightData.toString());
const flights = flightDatabase.flights
const mapData = fs.readFileSync(mapPath);
const mapDatabase = JSON.parse(mapData.toString());
const map = mapDatabase.flightsMap
class flightModel{
    static getFlight = (flight_number) => {
        try{
            const flight = flights[flight_number]
            return flight || null
        }catch(err){
            console.error('getAllMap Fail',err)
            return null
        }
    }
    static getMap = (origin,destination,date)=>{
        try{
            const flight_number = map[origin]?.[destination]?.[date]
            return flight_number||null
        }catch(err){
            console.error('getFlightMap Fail',err)
            return null
        }
    }
    static changeFlight(flight_number,tickets,action){
        try{
        switch (action){
            case 'inc':
            flightDatabase.flights[flight_number].seats_available += tickets;
            break;
            case 'dec':
                flightDatabase.flights[flight_number].seats_available -= tickets;
                break;
        }
        this.saveDatabase(flightDatabase,flightPath)
            return flightDatabase.flights[flight_number]
        }catch(err){
            console.error('changeFlight Fail',err)
            return null
        }
    }
    static saveDatabase = (database,path) => {
        try {
            fs.writeFileSync(path, JSON.stringify(database, null, 2));
            return true
        }catch(err) {
            console.error('save Fail',err)
            return false
        }
    }
}

module.exports = flightModel