const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = (id)=>{
    return jwt.sign({id}, 'secret', {expiresIn: maxAge})
}

exports.register = (req,res, next)=>{
    const {email, password} = req.body
    User.create({email, password})
    .then((user)=>{
        const token = createToken(user._id)
        res.cookie = ('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).send({user: user._id})
    })
    .catch(next)
}

exports.login = (req, res)=>{
    const{email, password} = req.body
    res.send('login')
}