require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
const User = require('./model/user')
const PORT = 80