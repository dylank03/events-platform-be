const app = require('../app')
const request = require('supertest')
const User = require('../models/userModel')
const mongoose = require('mongoose')

afterAll(()=>{
    User.deleteOne({email:'batman@batmail.com'}).then(()=>{
        mongoose.disconnect()
    })
})

describe('endpoint POST /register',()=>{
    test('responds with 201 status and user id of registered user',()=>{
        return request(app)
        .post('/register').send({email:'batman@batmail.com', password: 'password123'})
        .expect(201)
        .then(({body})=>{
            expect(typeof body.user).toBe('string')
        })
    })
    test('responds with 400 status and error message when the email entered is already registered to an account', ()=>{
        return request(app)
        .post('/register').send({email:'batman@batmail.com', password: 'password123'})
        .expect(400)
        .then(({body})=>{
            expect(body).toEqual({email: 'This email is already registered', password: ''})
        })
    })
    test('responds with error if password is shorter than 8 characters', ()=>{
        return request(app)
        .post('/register').send({email:'batman@batmail.com', password: 'passwor'})
        .expect(400)
        .then(({body})=>{
            expect(body).toEqual({email: '', password: 'Password must contain at least 8 characters'})
        })
    })
    test('responds with error if invalid email is entered', ()=>{
        return request(app)
        .post('/register').send({email:'batman', password: 'passwor'})
        .expect(400)
        .then(({body})=>{
            expect(body).toEqual({email: 'Please enter a valid email address', password: 'Password must contain at least 8 characters'})
        })
    })
})

describe('endpoint POST /login',()=>{
    test('responds with 201 status and user id of registered user',()=>{
        return request(app)
        .post('/login').send({email:'batman@batmail.com', password: 'password123'})
        .expect(201)
        .then(({body})=>{
            expect(typeof body.user).toBe('string')
        })
    })
})
