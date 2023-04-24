const fs = require('fs');
const mapPath = './dataBase/orderMap.json';
const flightPath = './dataBase/order.json';
// 读取 JSON 数据库文件
const orderData = fs.readFileSync(flightPath);
const orderDatabase = JSON.parse(orderData.toString());
const orders = orderDatabase.orders
const mapData = fs.readFileSync(mapPath);
const mapDatabase = JSON.parse(mapData.toString());
const map = mapDatabase.ordersMap

class orderModel {
    static createOrder = (id, order_id, order) => {
        try {
            orderDatabase.orders[order_id] = order
            this.saveDatabase(orderDatabase,flightPath)
            return true
        } catch (err) {
            console.error('order create Fail', err)
            return null
        }
    }
    static createMap = (id, order_id) => {
        try {
            if(!mapDatabase.ordersMap[id]){
                mapDatabase.ordersMap[id] = []
                mapDatabase.ordersMap[id].push(order_id)
            }
            mapDatabase.ordersMap[id].push(order_id)
            this.saveDatabase(mapDatabase,mapPath)
            return true
        } catch (err) {
    console.error('order map create Fail',err)
    return null
        }
    }
    static saveDatabase = (database,path) => {
        try {
            fs.writeFileSync(path, JSON.stringify(database, null, 2));
            return true
        } catch (err) {
            console.error('save Fail', err)
            return false
        }
    }
}

module.exports = orderModel