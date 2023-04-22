
const userService = require('../services/userService')
async function  verifyAuth(req, res, next) {
    try {
        let userId = req.id
        if(!userId){
        const username = req.headers['username']
        userId = userService.getId(username)
        }
        const data = userService.getUser(userId)
        const role = data?.role
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