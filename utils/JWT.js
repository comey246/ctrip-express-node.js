

const jwt = require('jsonwebtoken');
const secretKey = 'mySecretKey';
const option = { expiresIn: '1h' }
class JWT {
    static async genJWT(userInfo){
        try{
            return await jwt.sign(userInfo, secretKey, option);
        }catch (err){
            console.error('Failed to generate token:', err);
        }
    }
    static async decodeJWT(token){
        try{
            const decoded = jwt.verify(token, secretKey);
            return decoded
        } catch (err){
                console.error('Failed to verify token:', err);
        }
    }
}

module.exports = JWT