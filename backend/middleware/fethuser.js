var jwt = require('jsonwebtoken');
const JWT_SECRET = "Saifisagoodb%oy"

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send("Unauthorized access")
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        
        req.user = data.user
    } catch(error){
        console.error(error)
        res.status(401).send("Unauthorized access")
    }
    next()
}
module.exports = fetchuser