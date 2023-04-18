const userService = require('../services/userService');

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
        const {username, password} = req.body;
        // 调用用户服务的注册方法
        const user = userService.createUser({username, password});
        let resData = {}
        if (user) {
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
                        access_token:user
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

// 查询用户信息
async function getUserInfo(req, res) {
    try {
        const userId = req.params.userId;

        // 调用用户服务的查询用户信息方法
        const user = await userService.getUser(userId);

        // 返回成功响应
        return res.json({user});
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

module.exports = {
    getKey,
    registerUser,
    loginUser,
    getUserInfo,
    updateUserInfo,
};
