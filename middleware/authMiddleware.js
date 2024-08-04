const jwt = require('jsonwebtoken')
const User = require('../models/userModel')



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
        jwt.verify(token, 'secret', async (err, decodedToken)=>{
            if(err){
                res.status(401).send('unauthorized')
            }
            else{
                let user = await User.findById(decodedToken.id)
                if(user.role === 'staff'){

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
