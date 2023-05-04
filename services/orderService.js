const orderModel = require('../models/orderModel')
const createOrder = require('../utils/createOrder')
const {static} = require("express");
class orderService {
    static createOrder = (id,username,flightNumber,flight,orderInfo) => {
        try{
            const order_id = createOrder.createid()
            const order_time = createOrder.createTime()
            const type = "flight"
            const info = {flight,phone:orderInfo.phone,idNumber:orderInfo.idNumber,name:orderInfo.name}
            const user_id = id;
            const user_name = username;
            const pay_time = "";
            const number = orderInfo.tickets;
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
    static payOrder = (id,username,order_id)=>{
        try{
            const order = orderModel.getOrder(order_id)
            if(id===order.user_id){
                order.pay_time = createOrder.createTime()
                order.status = 200
                return orderModel.changeOrder(order_id,order)
            }
        }catch (err){
            console.error('Failed to pay order:', err);
            return [];
        }
    }
    static getOrder = (order_id)=>{
        try{
            return orderModel.getOrder(order_id)
        }catch (err){
            console.error('Failed to get order:', err);
            return [];
        }

    }
    static getOrders = (id)=>{
        try{
            return orderModel.getMap(id)
        }catch (err){
            console.error('Failed to get orders:', err);
            return [];
        }
    }
    static getAllOrders = (count,total)=>{
        try{
            return orderModel.getAllMap(count,total)
        }catch (err){
            console.error('Failed to get allorders:', err);
            return [];
        }
    }
    static deletOrder = (id,order_id)=>{
        try{
            const delMap = orderModel.deletMap(id,order_id)
            const delOrder = orderModel.deletOrder(id,order_id)
            return true
        }catch (err){
            console.error('Failed to delete orders:', err);
            return [];
        }
    }
}


module.exports = orderService;