const jwt = require('jsonwebtoken')


exports.requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'secret', (err, decodedToken)=>{
            if(err){
            }
            else{
                next()
            }
        })
    }
    else{
        next()
    }
}