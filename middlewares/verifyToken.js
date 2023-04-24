const JWT = require('../utils/JWT')
const jwt = require('jsonwebtoken')
const userService = require('../services/userService')
async function  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    const username = req.headers['username']
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const userId = userService.getId(username)
        const decoded = await JWT.decodeJWT(token)
        if(userId === decoded.id) {
            req.username = username
            req.id = userId
            next();
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired' });
        } else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
}
module.exports = verifyToken