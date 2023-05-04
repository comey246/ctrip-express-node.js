const fs = require('fs');
const path = './dataBase/userMap.json'
// 读取 JSON 数据库文件
const jsonData = fs.readFileSync(path);
const database = JSON.parse(jsonData.toString());
class userMapModel {
    // 获取所有用户
    static getAllMap = () => {
        try{
            const map = database.map
            return map || []
        }catch(err){
            console.error('getAllMap Fail',err)
            return []
        }

    }

    // 根据用户名获取用户
    static getMap = (username) => {
        try{
            const userId = database.map[username]
            return userId || null
        }catch(err){
            console.error('getMap Fail',err)
            return null
        }

    }

    // 添加映射
    static addMap = (username,userId) => {
        try{
            database.map[username] = userId
            const res = this.saveDatabase();
            return res
        } catch (err){
            console.error('addMap Fail',err)
            return false
        }

    }

    // 更新用户名
    static updateMap = (preUsername, username) => {
        try{
            const userId = database.map[preUsername]
            delete database.map[preUsername]
            database.map[username] = userId
            const res = this.saveDatabase();
            return res
        }catch(err) {
            console.error('updateMap Fail',err)
            return false
        }

    }

    // 删除用户
    static deleteMap = (username) => {
        try{
            delete database.map[username]
            const res = this.saveDatabase();
            return res
        }catch(err) {
            console.error('deleteMap Fail',err)
            return false
        }

    }

    // 保存数据库文件
    static saveDatabase = () => {
        try {
            fs.writeFileSync(path, JSON.stringify(database, null, 2));
            return true
        }catch(err) {
            console.error('save Fail',err)
            return false
        }
    }

}
// 使用示例
module.exports = userMapModel
