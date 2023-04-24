const { v4: uuidv4 } = require("uuid")
const path = require('path')
const userModel = require('../models/userModel')
const mapModel = require('../models/userMapModel')
const RSA = require('../utils/RSA')
const JWT = require('../utils/JWT')

class userService {
    // 获取密钥
    static getKey(id) {
        try {
            const user = userModel.getUser(id)
            const key = user.key.publicKey
            return key || null
        } catch (err) {
            console.error('Failed to get key:', err);
            return null;
        }
    }

    //验证密码
    static async verifyUser({id, password}) {
        try {
            const {password:{salt,hashPassword},key:{privateKey}} = userModel.getUser(id)
            const decodePassword = RSA.decodePassword(password,privateKey)
            const userPassword = RSA.encodeHashPassword(decodePassword,salt);
            if(userPassword === hashPassword){
                return await JWT.genJWT({id})
            }else {
                return false
            }
            // 调用 UserModel 中的方法获取用户数据
        } catch (err) {
            console.error('Failed to get key:', err);
            return false;
        }
    }

    // 获取所有用户数据
    static async getUsers() {
        try {
            return await userModel.getUsers(); // 调用 UserModel 中的方法获取用户数据
        } catch (err) {
            console.error('Failed to get users:', err);
            return [];
        }
    }

    // 获取用户id
    static  getId(username) {
        try {
            const id = mapModel.getMap(username)
            return id || null
        } catch (err) {
            console.error(`Failed to get user by ID ${userId}:`, err);
            return null;
        }
    }

    // 根据用户ID获取用户数据
    static getUser(userId) {
        try {
            return userModel.getUser(userId); // 调用 UserModel 中的方法获取指定用户ID的用户数据
        } catch (err) {
            console.error(`Failed to get user by ID ${userId}:`, err);
            return null;
        }
    }

    // 创建用户
    static createUser(regUser) {
        try {
            let {username,password,...regForm} = regUser
            const hasUser = mapModel.getMap(username);
            if (hasUser){
                return false
            }
            const key = RSA.genKey()
            password = RSA.genHashPassword(password)
            const userInfo = {
                password,
                key,
                ...regForm
            }
            const id  = uuidv4();
            userModel.addUser(id,userInfo);
            mapModel.addMap(username,id)
            return username
        } catch (err) {
            console.error('Failed to create user:', err);
            return false;
        }
    }

    // 更新用户
    static async updateUser(userId, updatedUser) {
        try {
            return await UserModel.updateUser(userId, updatedUser); // 调用 UserModel 中的方法更新用户
        } catch (err) {
            console.error(`Failed to update user by ID ${userId}:`, err);
            return false;
        }
    }

    // 删除用户
    static async deleteUser(userId) {
        try {
            return await UserModel.deleteUser(userId); // 调用 UserModel 中的方法删除用户
        } catch (err) {
            console.error(`Failed to delete user by ID ${userId}:`, err);
            return false;
        }
    }

    static getMenuList(Auth){
        try {
            return userModel.menuList(Auth) || []
        } catch (err) {
            console.error(`Failed to get menuList`, err);
            return false;
        }

    }
}

module.exports = userService;
