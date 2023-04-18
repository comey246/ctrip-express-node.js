const express = require('express');
const userController = require('../controllers/userController');

// 创建用户路由
const router = express.Router();

//发放公钥
router.get('/publicKey',userController.getKey)

// 注册用户
router.post('/register', userController.registerUser);

// 用户登录
router.post('/login', userController.loginUser);

// 查询用户信息
router.get('/:userId', userController.getUserInfo);

// 更新用户信息
router.put('/:userId', userController.updateUserInfo);

module.exports = router;