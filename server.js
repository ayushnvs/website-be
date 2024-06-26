const express = require('express');
const cors = require('cors')
const corsOption = require('./config/corsOption')
const connectDB = require('./db/dbConnection')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const verifyToken = require('./middleware/verifyToken')
const credentials = require('./middleware/credentials')
const auth = require('./routes/auth')
const user = require('./routes/user')
const refresh = require('./routes/refresh')
const logout = require('./routes/lougout')
const dictionary = require('./routes/dictionary')
const profile = require('./routes/profile')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const app = express();

const port = process.env.PORT || 8000
const uri = process.env.ATLAS_URI
connectDB(uri)

// Middlewares
app.use(logger)
app.use(credentials)
app.use(cors(corsOption))
app.use(express.urlencoded({ extended: false }))
app.use(express.json({limit: '500kb'}))
app.use(cookieParser())

// APIs
app.use('/account', auth)
app.use('/refresh', refresh)
app.use('/logout', logout)
app.use(verifyToken)
app.use('/user', user)
app.use('/profile', profile)
app.use('/kosh', dictionary)

// Middlewares
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
});
