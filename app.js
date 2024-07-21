const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routers/auth-router')
const {requireAuth, checkUser} = require('./middleware/authMiddleware')
const userRouter = require('./routers/user-router')

const uri = "mongodb+srv://dylankataria:Ot9aktlwjQOIjgJw@cluster0.qfmplsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const app = express()

app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
app.use(express.json())
app.use(authRouter)
app.use(userRouter)


app.use((err, req, res, next)=>{
    let errors = {firstName: '', lastName: '', email: '', password: ''}

    if(err.message === 'Email is not registered to an account'){
        errors.email = 'This email is not registered'
    }

    if(err.message === 'Incorrect password'){
        errors.password = 'Incorrect password, try again'
    }

    if(err.code === 11000){
        errors.email = 'This email is already registered'
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }

    res.status(400).send(errors)
})

app.listen(9090)

mongoose.connect(uri)

module.exports = app
