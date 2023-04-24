const orderModel = require('../models/orderModel')
const createOrder = require('../utils/createOrder')
class orderService {
    static createOrder = (id,username,flightNumber,flight,orderinfo) => {
        try{
            const order_id = createOrder.createid()
            const order_time = createOrder.createTime()
            const type = "flight"
            const info = {flight,phone:orderinfo.phone,idNumber:orderinfo.idNumber}
            const user_id = id;
            const user_name = username;
            const pay_time = "";
            const number = info.tickets;
            const status = 100;
            const total = number*flight.price
            const order = {
                order_id,
                order_time,
                type,
                info,
                user_id,
                user_name,
                pay_time,
                number,
                total,
                status
            }
            orderModel.createOrder(user_id,order_id,order)
            orderModel.createMap(user_id,order_id)
            return order_id
        }catch (err){
            console.error('Failed to create order:', err);
            return [];
        }
    }
}

module.exports = orderService;