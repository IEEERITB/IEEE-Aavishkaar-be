const jwt = require("jsonwebtoken");
const tech = 'xyz';

const authenticate = (req,res,next) => {
    const head = req.headers['authorization'];
    const token = head && head.split(' ')[1];
    if(!token){
        return res.status(401).json({error:"Access denied. No token provided."})
    }
    try {
        const verified = jwt.verify(token,tech);
        req.user = verified.user;
        next();
    } catch (error) {
        return res.status(400).json({error:error.name,expiredAt:error.expiredAt});
    }
}


module.exports = authenticate;