const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.getUser = (req, res, next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'secret', async(err, decodedToken)=>{
            if(err){
                next()
            }
            else{
                let user = await User.findById(decodedToken.id)
                res.status(200).send(user)
                next()
            }
        })
    }
    else{
        res.locals.user = null
        next()
    }

    // if(token){
    //     jwt.verify(token, 'secret', async(err, decodedToken)=>{
    //         if(err){
    //             next()
    //         }
    //         else{
    //             let user = await User.findById(decodedToken.id)
    //             res.status(200).send('hello')
    //         }
    //     })
    // }
}