const express = require('express');
const mallController = require('../controllers/mallController');
const verifyToken = require('../middlewares/verifyToken')
// 创建用户路由
const router = express.Router();

//航班列表
router.get('/flightList',mallController.getFlightList)
//航班信息
router.get('/flight',mallController.getFlight)

module.exports = router