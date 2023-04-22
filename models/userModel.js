const fs = require('fs');
const path = './dataBase/users.json'
// 读取 JSON 数据库文件
const jsonData = fs.readFileSync(path);
const database = JSON.parse(jsonData.toString());
const AuthJson = fs.readFileSync('./dataBase/auth.json');
const AuthData = JSON.parse(AuthJson.toString());
// console.log(database.users)
class UserModel {
    // 获取所有用户数据
    static  getUsers() {
        try {
            const users = database.users
            return users || []
        } catch (err) {
            console.error('Failed to get users:', err);
            return [];
        }
    }

    // 根据 ID 获取用户
    static  getUser(id) {
        try {
            const user = database.users[id]
            return user || null;
        } catch (err) {
            console.error(`Failed to get user by ID ${id}:`, err);
            return null;
        }
    }

    // 添加用户
    static  addUser(id,user) {
        try {
            database.users[id] = user
            const res = this.saveDatabase();
            return res
        } catch (err) {
            console.error(`Failed to add user ${user.username}:`, err);
            return false;
        }
    }

    // 更新用户
    static  updateUser(id,user) {
        try {
            database.users[id] = user
            const res = this.saveDatabase();
            return res
        } catch (err) {
            console.error(`Failed to update user ${user.name}:`, err);
            return false;
        }
    }

    // 删除用户
    static deleteUser(id) {
        try {
            delete database.users[id]
            const res = this.saveDatabase();
            return res
        } catch (err) {
            console.error(`Failed to delete user with ID ${id}:`, err);
            return false;
        }

    }
    static menuList(Auth){
        try{
            const menuList = AuthData.menuList[Auth];
            return menuList || []
        }catch (err){
            console.error(`Failed to get menuList`, err);
            return false;
        }
    }
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

module.exports = UserModel;
