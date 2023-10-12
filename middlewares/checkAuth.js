import jwt from "jsonwebtoken"


 const checkAuth = (req, res, next)=>{
    const token = req.cookies.access_token
    if(!token){
    return    res.status(401).json(`No Token Found`)
    }
    jwt.verify(token, process.env.JWT_SECRET,  (err, userPayloadId)=>{
    if(err){
        return res.status(403).json(`Invalid token`)
    }
    req.user = {
        id: userPayloadId
    }
    next()
    })
}

export default checkAuth