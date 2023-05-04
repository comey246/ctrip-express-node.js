const fs = require('fs');
const path = './flight.json'

function generateMockFlight() {
    const airlines = ['China Airlines', 'Air China', 'China Eastern Airlines', 'China Southern Airlines'];
    const places = ['BJS', 'SHA', 'CAN', 'CTU','SZX','HGH'];
    const planeModels = ["波音787","波音747","C919","空客A320","空客A380"]
    const placeLabels = ['北京', '上海', '广州', '成都','深圳','杭州'];
    const dates = ["2023-04-28", "2023-04-29", "2023-04-30",'2023-05-01', '2023-05-02', '2023-05-03','2023-05-04'];
    const departureTimes = ['08:00','9:30', '10:00', '10:30','11:00'];
    const arrivalTimes = ['13:30', '14:00','14:30', '15:00','15:30'];

    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    let random = Math.floor(Math.random() * places.length)
    const origin = places[random];
    const originLabel = placeLabels[random]
    random = Math.floor(Math.random() * places.length)
    const destination = places[random];
    const destinationLabel = placeLabels[random];
    const planeModel = planeModels[Math.floor(Math.random() * planeModels.length)];
    const date = dates[Math.floor(Math.random() * dates.length)];
    const departure_time = departureTimes[Math.floor(Math.random() * departureTimes.length)];
    const arrival_time = arrivalTimes[Math.floor(Math.random() * arrivalTimes.length)];
    const price = Math.floor(Math.random() * (150 - 50) + 50)*10;
    const seats_available = Math.floor(Math.random() * (50 - 10) + 10);
    const flight_number = origin[0]+ destination[0] +airlines.indexOf(airline) + date[9] + Math.floor(Math.random() * (99-0) + 0)
    const duration = getTimeDiff(departure_time,arrival_time)
    function getTimeDiff(time1, time2) {
        const [hour1, min1] = time1.split(':').map(Number);
        const [hour2, min2] = time2.split(':').map(Number);
        const minutes = Math.abs((hour2 * 60 + min2 ) - (hour1 * 60 + min1))
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return (hours+'时'+mins+'分')
    }
    const flight = {
        flight_number,
        airline,
        planeModel,
        origin,
        originLabel,
        destination,
        destinationLabel,
        date,
        departure_time,
        arrival_time,
        duration,
        price,
        seats_available
    };

    return flight;
}
let flights = {}
for (let i =0; i< 3000;i++){
    const flight = generateMockFlight()
    if(flight.origin === flight.destination) continue
    flights[flight.flight_number] = flight
}
const file1  = {flights}
fs.writeFileSync('./flight.json', JSON.stringify(file1, null, 2))
const originMap = {
    BJS:{},
    SHA:{},
    CAN:{},
    CTU:{},
    SZX:{},
    HGH:{}
}
const destinationMap = {
    BJS:{},
    SHA:{},
    CAN:{},
    CTU:{},
    SZX:{},
    HGH:{}
}
const dateMap = {
    "2023-04-28":[],
    "2023-04-29":[],
    "2023-04-30":[],
    "2023-05-01":[],
    "2023-05-02":[],
    "2023-05-03":[],
    "2023-05-04":[]
}

// 读取 JSON 数据库文件
const jsonData = fs.readFileSync(path);
const database = JSON.parse(jsonData.toString());
flights  = database.flights
const keys = Object.keys(flights)
for(let i =0; i< keys.length;i++){
    try{
        const key = keys[i];
        const flight = flights[key];
        if(originMap[flight.origin][flight.destination]){
            if(originMap[flight.origin][flight.destination][flight.date]){
                originMap[flight.origin][flight.destination][flight.date].push(key);
            }else{
                originMap[flight.origin][flight.destination][flight.date] = []
                originMap[flight.origin][flight.destination][flight.date].push(key);
            }
        }else{
            originMap[flight.origin][flight.destination] = {}
            originMap[flight.origin][flight.destination][flight.date] = []
            originMap[flight.origin][flight.destination][flight.date].push(key);
        }

    }catch (err){
        console.log(keys[i],flights[keys[i]])
    }
}
const file  = {flightsMap:originMap}
fs.writeFileSync('./flightMap.json', JSON.stringify(file, null, 2))