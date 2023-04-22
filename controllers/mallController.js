const mallService = require('../services/flightService');

function getFlightList(req, res) {
    try {
        const {origin,destination,date} = req.query;
        console.log(req.headers)
        const flightList = mallService.getFlightList(origin,destination,date)
        let resData = {}
            resData = {
                code: 200,
                data: {
                    flightList
                },
                message: "success"
            }
        return res.json(resData)
    } catch (error) {
        // 错误处理
        return res.status(500).json({error: error.message});
    }
}

function getFlight(req, res) {
    try {
        const {flightNumber} = req.query;
        const flight = mallService.getFlight(flightNumber)
        let resData = {}
        if (flight){
        resData = {
            code: 200,
            data: {
                flight
            },
            message: "success"
        }
        }else {
            resData = {
                code: 201,
                data:{
                    flight:null
                },
                message: "无此航班"
            }
        }
        return res.json(resData)
    } catch (error) {
        // 错误处理
        return res.status(500).json({error: error.message});
    }
}
module.exports = {
    getFlightList,
    getFlight
}