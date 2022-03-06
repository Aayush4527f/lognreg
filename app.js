// CONFIGURING ENVIRONMENT VARIABLES
require('dotenv').config()

// IMPORTS
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
const User = require('./model/user')
const app = express()

// SETTING UP COOKIE AND BODY PARSER
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'static')))

// SETTING VIEW ENGINE AS EJS
app.set('view engine', 'ejs')

// CONNECTING TO MONGOOSE SERVER
mongoose.connect('mongodb://localhost:27017/jwtlogin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// ENDPOINTS
app.get('/',(req,res)=>{
    res.send('HOME')
})
app.get('/about',(req,res)=>{
    res.send('ABOUT')
})
app.get('/register',(req,res)=>{
    res.render('register.ejs')
})
app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

// post requests
app.post('/register',(req,res)=>{
    res.send('REGISTER FORM')
})
app.post('/login',(req,res)=>{
    res.send('LOGIN FORM')
})

// starting the server
app.listen(process.env.PORT,()=>{
    console.log(`server started at port ${process.env.PORT}`)
})