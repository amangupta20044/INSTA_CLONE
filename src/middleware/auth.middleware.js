 const jwt = require("jsonwebtoken")

 async function identifyUser(req,res,next){// req ke andar se token nikalega and token ke andar deta padh ke bata sakta hai kis user ne req kiya hai
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "token not provided,unauthorised access"
        })
    }
    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)// TOKEN ME SE DATA NIKALNA
    } catch {
        return res.status(401).json({
            message: "unothorised user"
        })
    }
    req.user = decoded
    next()// miidleware se req aage forward karega 
 }
 module.exports = identifyUser