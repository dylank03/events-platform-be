const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')
const {Schema, model} = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true]
    },
    lastName:{
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true, 
        minLength: [8, 'Password must contain at least 8 characters']
    }
})

userSchema.post('save', function(doc, next){
    next()
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.loginUser = async function(email, password){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        throw Error('Incorrect password')
    }
    throw Error('Email is not registered to an account') 
}

const User = model('user', userSchema)


module.exports = User