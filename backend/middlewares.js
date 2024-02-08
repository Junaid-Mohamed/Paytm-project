const jwt = require("jsonwebtoken");
const JWT_SECRET = "jsonJunaidSecret";

const authMiddleWare = (req,res,next)=>{
    const authheader = req.headers.authorization

    if(!authheader || !authheader.startsWith("Bearer")){
        return res.status(403).json({
            message:"Unauthorized.."
        })
    }
 
    const token = authheader.split(" ")[1];
    
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(e){
        res.status(403).json({message:"error in authenticating"})
        
    }
}


module.exports = {
    authMiddleWare
}