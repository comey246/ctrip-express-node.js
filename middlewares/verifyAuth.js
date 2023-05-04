
const userService = require('../services/userService')
async function  verifyAuth(req, res, next) {
    try {
        let id = req.id
        if(!id){
            return res.status(403).json({ message: 'Invalid Authority' });
        }else{
            const data = userService.getUser(id)
            const role = data?.role
            if(role === 'admin') {req.role = 'admin'}
            else if(role === 'user') {req.role = 'user'}
            else return res.status(403).json({ message: 'Invalid Authority' });
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: 'Invalid Authority' });
    }
}
module.exports = verifyAuth