const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken')
const verifyAuth = require('../middlewares/verifyAuth')
// 创建用户路由
const router = express.Router();

//发放公钥
router.get('/publicKey',userController.getKey)

// 注册用户
router.post('/register', userController.registerUser);

// 用户登录
router.post('/login', userController.loginUser);

router.get('/menuList',verifyAuth,userController.menuList)

// 查询用户信息
router.get('/:userId', verifyToken,verifyAuth,userController.getUserInfo);

// 更新用户信息
router.put('/:userId',verifyToken,verifyAuth, userController.updateUserInfo);

module.exports = router;