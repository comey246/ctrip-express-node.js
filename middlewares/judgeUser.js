const JWT = require('../utils/JWT')
const userService = require('../services/userService')

async function judgeUser(req, res, next) {
    const token = req.headers['x-access-token'];
    const username = req.headers['username']
    if (!token || !username) {
    } else {
        const decoded = await JWT.decodeJWT(token)
        if (decoded) {
            const userId = userService.getId(username)
            if (userId === decoded?.id) {
                req.id = userId
                next();
            }
        }
    }
    req.id = null
    next();
}

module.exports = judgeUser