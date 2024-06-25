const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).send("You are not authorized hii");
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.body.userId = decoded.id;
        req.body.userEmail = decoded.email;
        req.body.userName = decoded.name;
        if(!decoded){
            return res.status(401).send("You are not authorized");
        }
        next();
    } catch (error) {
        return res.status(401).send("wrong token");
    }
}
module.exports = auth;
