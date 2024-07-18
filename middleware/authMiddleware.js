const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'secret', (err, decodedToken)=>{
            if(err){
                console.log(err.message)
            }
            else{
                console.log(decodedToken)
                next()
            }
        })
    }
}

exports.checkUser = (req, res, next) =>{
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, 'secret', async (err, decodedToken)=>{
            if(err){
                res.locals.user = null
                next()
            }
            let user = await User.findById(decodedToken.id)
            res.locals.user = user
             next()
        })
    }
    else{
        res.local.user = null
        next()
    }
}