const jwt = require('jsonwebtoken')


exports.requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'secret', (err, decodedToken)=>{
            if(err){
                res.status(401).send('unauthorized')
            }
            else{
                next()
            }
        })
    }
    else{
        res.status(401).send('unauthorized')
    }
}

exports.requireStaff = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'secret', (err, decodedToken)=>{
            if(err){
                res.status(401).send('unauthorized')
            }
            else{
                if(decodedToken.role === 'staff'){
                    next()
                }
                else{
                    res.status(401).send('unauthorized')
                }
            }
        })
    }
    else{
        res.status(401).send('unauthorized')
    }
}
