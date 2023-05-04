const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken')
const judgeAuth = require('../middlewares/judgeAuth')
const judgeUser = require('../middlewares/judgeUser')
const verifyAuth =require('../middlewares/verifyAuth')
const mallController = require("../controllers/mallController");
// 创建用户路由
const router = express.Router();

//发放公钥
router.get('/publicKey',userController.getKey)

// 注册用户
router.post('/register', userController.registerUser);

// 用户登录
router.post('/login', userController.loginUser);

router.get('/menu/list',judgeUser,judgeAuth,userController.menuList)

router.get('/role',judgeUser,judgeAuth,userController.getRole)

router.get('/admin/user/map',verifyToken,verifyAuth,userController.getUsersMap)

router.get('/admin/user',verifyToken,verifyAuth,userController.getUserInfo)

router.get('/user/info',verifyToken,verifyAuth,userController.getInfo)


// // 查询用户信息
// router.get('/user/:userId', verifyToken,userController.getUserInfo);
//
// // 更新用户信息
// router.put('/user/:userId',verifyToken, userController.updateUserInfo);


module.exports = router;