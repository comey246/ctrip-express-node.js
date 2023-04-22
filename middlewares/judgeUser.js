const JWT = require('../utils/JWT')
const userService = require('../services/userService')

async function judgeUser(req, res, next) {
    const token = req.headers['x-access-token'];
    const username = req.headers['username']
    if (!token || !username) {
        req.id = null
        next();
    }
    try {
        const userId = userService.getId(username)
        const decoded = await JWT.decodeJWT(token)
        if(userId === decoded?.id) {
            req.id = userId
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

}

module.exports = judgeUser