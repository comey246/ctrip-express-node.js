
const userService = require('../services/userService')
async function  verifyAuth(req, res, next) {
    try {
        const id = req?.id
        const data = userService.getUser(id)
        console.log(id,data)
        if(role === 'admin') {req.role = 'admin'}
        else if(role === 'normal'){req.role = 'user'}
        else{req.role = 'visitor'}
        next();
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: 'Invalid Authority' });
    }
}
module.exports = verifyAuth