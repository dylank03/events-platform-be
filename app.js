const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routers/auth-router')
const {requireAuth, checkUser} = require('./middleware/authMiddleware')
const userRouter = require('./routers/user-router')
const eventsRouter = require('./routers/events-router')

const uri = process.env.URI

const app = express()

app.use(cookieParser())
app.use(cors({credentials: true, origin: 'https://coffeeconnect.netlify.app/'}))
app.use(express.json())
app.use(authRouter)
app.use(userRouter)
app.use(eventsRouter)


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

app.get('*', function(req, res){
    res.status(404).send('page not found');
  });

mongoose.connect(uri)

module.exports = app
