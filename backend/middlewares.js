const jwt = require("jsonwebtoken");

const authMiddleWare = (req,res,next)=>{
    const authheader = req.headers.authorization

    if(!authheader || !authheader.startsWith("Bearer")){
        return res.status(403).json({
            message:"Unauthorized.."
        })
    }
}


module.exports = {
    authMiddleWare
}