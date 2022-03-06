// configuring environment variable
require('dotenv').config()

// imports
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
const User = require('./model/user')

// other consts
const app = express()
const PORT = 80

// setting up cookie and body parser
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

// serving static files
app.use(express.static(path.join(__dirname, 'static')))

// setting view engine as ejs
app.set('view engine', 'ejs')

// connecting to mongoose
mongoose.connect('mongodb://localhost:27017/jwtlogin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// endpoints
app.get('/',(req,res)=>{
    res.send('HOME')
})
app.get('/about',(req,res)=>{
    res.send('ABOUT')
})
app.get('/register',(req,res)=>{
    res.send('REGISTER')
})
app.get('/login',(req,res)=>{
    res.send('LOGIN')
})

// post requests
app.post('/register',(req,res)=>{
    res.send('REGISTER FORM')
})
app.post('/login',(req,res)=>{
    res.send('LOGIN FORM')
})

// starting the server
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})