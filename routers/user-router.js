const userRouter = require('express').Router()
const {getUser} = require('../controllers/userController')

userRouter.get('/user', getUser)

module.exports = userRouter