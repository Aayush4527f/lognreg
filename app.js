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
app.get('/', (req, res) => {
    res.send('HOME')
})
app.get('/about', (req, res) => {
    res.send('ABOUT')
})
app.get('/register', (req, res) => {
    res.render('register.ejs')
})
app.get('/login', (req, res) => {
    // try {
    //     jwt.verify(req.cookies.token, process.env.access_token_secret)
    //     res.redirect('/')
    // } catch (error) {
    //     console.log(error.message)
    //     res.render('login.ejs')
    // }
})

// post requests
app.post('/register', async (req, res) => {
    const { username, password: textPassword } = req.body
    const password = await bcrypt.hash(textPassword, 10)

    try {
        const response = await User.create({
            username,
            password
        })
        // console.log('User created successfully: ', response)
        let token = jwt.sign({ "username": `${username}` }, process.env.access_token_secret, { expiresIn: "7d" })
        res.cookie(`token`, `${token}`, { maxAge: (60 * 60 * 24 * 7) * 1000, secure: true })
        return res.redirect('/')

    } catch (error) {
        if (error.code === 11000) {
            // duplicate key
            return res.send('Username already in use')
        }
        throw error
    }
})
app.post('/login', async(req, res) => {
    // const { username, password } = req.body
    // const user = await User.findOne({ username }).lean()

    // if (!user) {
    //     return res.send('Invalid username/password')
    // }

    // if (await bcrypt.compare(password, user.password)) {
    //     // the username, password combination is successful

    //     console.log(`succesful login`)

    //     return res.redirect(`/`)
    // }

    // res.send('Invalid Username/Password');
})

// starting the server
app.listen(process.env.PORT, () => {
    console.log(`server started at port ${process.env.PORT}`)
})