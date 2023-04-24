const mallService = require('../services/flightService');
const orderService = require('../services/orderService')
function getFlightList(req, res) {
    try {
        const {origin,destination,date} = req.query;
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

function bookFlight(req, res) {
    try {
        const {flight_number,...info} = req.body;
        const {id,username} = req
        const flight = mallService.bookFlight(flight_number,info)
        console.log(flight,'flight')
        let resData = {}
        if (flight){
            const order = orderService.createOrder(id,username,flight_number,flight,info)
            resData = {
                code: 200,
                data: {
                    order
                },
                message: "success"
            }
        }else {
            resData = {
                code: 201,
                data:{
                    flight
                },
                message: "下单失败"
            }
        }
        return res.json(resData)
    } catch (error) {
        // 错误处理
        return res.status(500).json({error: error.message});
    }
}
function payFlight(req, res) {
    try {
        let {order_id} = req.body;
        const {id,username} = req
        console.log(req.body)
        order_id = orderService.payOrder(id,username,order_id)
        let resData = {}
        if (order_id){
            resData = {
                code: 200,
                data: {
                    order_id
                },
                message: "success"
            }
        }else {
            resData = {
                code: 201,
                data:{
                    order_id
                },
                message: "支付失败"
            }
        }
        return res.json(resData)
    } catch (error) {
        // 错误处理
        return res.status(500).json({error: error.message});
    }
}

function getOrder(req,res){
    try{
        const {user_id} = req.query;
        const order = orderService.getOrder(user_id)
        let resData = {}
        if (order){
            resData = {
                code: 200,
                data:
                    order
                ,
                message: "success"
            }
        }else {
            resData = {
                code: 201,
                data:
                    null
                ,
                message: "无此订单"
            }
        }
        return res.json(resData)
    }catch (err){
        return res.status(500).json({error: error.message});
    }
}
    function getOrders(req,res){
        try{
            const {id} = req;
            const orders = orderService.getOrders(id)
            let resData = {}
            if (orders){
                resData = {
                    code: 200,
                    data:
                    orders
                    ,
                    message: "success"
                }
            }else {
                resData = {
                    code: 201,
                    data:
                        null
                    ,
                    message: "无此用户订单"
                }
            }
            return res.json(resData)
        }catch (err){
            return res.status(500).json({error: error.message});
        }
    }
    function deletOrder(req, res) {
            try {
                const {order} = req.query;
                const {id,username} = req
                const del = orderService.deletOrder(id,order)
                let resData = {}
                if (del){
                    resData = {
                        code: 200,
                        data:true,
                        message: "success"
                    }
                }else {
                    resData = {
                        code: 201,
                        data:false,
                        message: "下单失败"
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
    getFlight,
    bookFlight,
    payFlight,
    getOrder,
    getOrders,
    deletOrder
}