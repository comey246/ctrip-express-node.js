const userService = require('../services/userService');
const mapModel = require("../models/userMapModel");
// 发送密钥对

function getKey(req, res) {
    try {
        const {username} = req.query;
        const id = userService.getId(username)
        let resData = {}
        if (id) {
            const publicKey = userService.getKey(id)
            resData = {
                code: 200,
                data: {
                    publicKey
                },
                message: "success"
            }
        } else {
            resData = {
                code: 500,
                data: false,
                message: "用户名错误或不存在"
            }
        }
        return res.json(resData)
    } catch (error) {
        // 错误处理
        return res.status(500).json({error: error.message});
    }
}

// 注册用户
function registerUser(req, res) {
    try {
        const regUser = req.body;
        // 调用用户服务的注册方法
        const username = userService.createUser(regUser);
        let resData = {}
        if (username) {
            resData = {
                code: 200,
                data:true,
                message: "success"
            }
        } else {
            resData = {
                code: 502,
                data: {
                    username
                },
                message: "用户名已被注册"
            }
        }
        // 返回成功响应
        return res.status(201).json(resData)
    } catch (error) {
        // 错误处理
        return res.status(500).json({error: error.message});
    }
}

// 用户登录
async function loginUser(req, res) {
    try {
        const {username, password} = req.body;
        const id = userService.getId(username)
        let resData = {}
        if (id) {
            const user = await userService.verifyUser({id, password});
            if (user) {
                resData = {
                    code: 200,
                    data: {
                        access_token:user,
                        username
                    },
                    message: "success"
                }
            } else {
                resData = {
                    code: 501,
                    data: false,
                    message: "密码错误！"
                }
            }
        } else {
            resData = {
                code: 500,
                data: false,
                message: "用户名错误或不存在！"
            }
        }
        // 返回成功响应
        return res.json(resData);
    } catch (error) {
        // 错误处理
        return res.status(500).json({error: error.message});
    }
}

async function getRole(req,res){
    try{
        let data = ''
        switch (req.role){
            case 'admin':
                data = 'admin'
                break
            case 'user':
                data = 'user'
                break
            default:
                data = 'visitor'
                break
        }
        const resData = {
            code: 200,
            data,
            message: "success"
            }
        return res.json(resData)
    } catch (error) {
        // 错误处理
        return res.status(500).json({error: error.message});
    }
}
// 查询用户信息
async function getUserInfo(req, res) {
    try {
        const {id} = req.query;
        // 调用用户服务的查询用户信息方法
        const {key,password,...data} = await userService.getUser(id);
        const resData = {
            code: 200,
            data,
            message: "success"
        }
        // 返回成功响应
        return res.json(resData);
    } catch (error) {
        // 错误处理
        return res.status(500).json({error: error.message});
    }
}
async function getInfo(req, res) {
    try {
        const id = req.id;
       // 调用用户服务的查询用户信息方法
        const {key,password,...data} = await userService.getUser(id);
        const resData = {
            code: 200,
            data:{id,...data},
            message: "success"
        }
        // 返回成功响应
        return res.json(resData);
    } catch (error) {
        // 错误处理
        return res.status(500).json({error: error.message});
    }
}

// 更新用户信息
async function updateUserInfo(req, res) {
    try {
        const userId = req.params.userId;
        const {username, email} = req.body;

        // 调用用户服务的更新用户信息方法
        const user = await userService.updateUserInfo(userId, username, email);

        // 返回成功响应
        return res.json({user});
    } catch (error) {
        // 错误处理
        return res.status(500).json({error: error.message});
    }
}

async function menuList(req,res) {
    try {
        const role = req.role;
        const menuList = userService.getMenuList(role);
        const resData = {
            code: 200,
            data: menuList,
            message: "success"
        }
        return res.json(resData);
    } catch (error) {
        // 错误处理
        return res.status(500).json({error: error.message});
    }
}

async function getUsersMap(req,res){
    try {
        const role = req.role;
        if(role === 'admin'){
            const map = await userService.getUsers();
            const resData = {
                code: 200,
                data: map,
                message: "success"
            }
            return res.json(resData);
        }
        return res.status(401).json({error: '无管理员权限访问'});
    } catch (error) {
        // 错误处理
        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    getKey,
    registerUser,
    loginUser,
    getUserInfo,
    updateUserInfo,
    menuList,
    getRole,
    getUsersMap,
    getInfo
};
