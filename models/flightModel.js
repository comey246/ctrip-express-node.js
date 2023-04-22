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
}

module.exports = flightModel