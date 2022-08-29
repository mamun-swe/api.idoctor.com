
require('dotenv').config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload')
const { AppErrorHandeller } = require('./middleware/error-handeller')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload())

app.use('/uploads/doctor/profiles', express.static('uploads/doctor/profiles/'))
app.use('/uploads/patient/profiles', express.static('uploads/patient/profiles/'))

// Main Routes
const authRoute = require('./routes/auth')
const doctorRoute = require('./routes/doctor')
const patientRoute = require('./routes/patient')
const chatRoute = require('./routes/chat')
const adminRoute = require('./routes/admin')
const clientRoute = require('./routes/client')

// API URL's
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/doctor', doctorRoute)
app.use('/api/v1/patient', patientRoute)
app.use('/api/v1/chat', chatRoute)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/client', clientRoute)

app.use((req, res, next) => {
    let error = new Error('404 page Not Found')
    error.status = 404
    next(error)
})

app.use(AppErrorHandeller)

app.get('/', (req, res) => {
    res.send("Hello I am node.js application")
})


module.exports = { app }