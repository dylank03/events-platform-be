const authRouter = require('express').Router()
const {register, login, logout } = require('../controllers/authController')

authRouter.post("/user/register", register)

authRouter.post("/user/login", login)

authRouter.get("/user/logout", logout)

module.exports = authRouter