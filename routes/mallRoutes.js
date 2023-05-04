const express = require('express');
const mallController = require('../controllers/mallController');
const verifyToken = require('../middlewares/verifyToken')
const verifyAuth = require("../middlewares/verifyAuth");
// 创建用户路由
const router = express.Router();

//航班列表
router.get('/flight/list',mallController.getFlightList)
//航班信息
router.get('/flight',mallController.getFlight)
//预定航班
router.post('/flight/book',verifyToken,mallController.bookFlight)
//支付航班
router.post('/flight/pay',verifyToken,mallController.payFlight)

router.get('/user/order',verifyToken,mallController.getOrder)

router.get('/user/orders',verifyToken,mallController.getOrders)

router.get('/user/order/delete',verifyToken,mallController.deletOrder)

router.get('/admin/map/orders',verifyToken,verifyAuth,mallController.getAllMapOrders)
module.exports = router