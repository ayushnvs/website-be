const express = require('express');
const cors = require('cors')
const corsOption = require('./config/corsConfig')
const connectDB = require('./db/dbConnection')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const auth = require('./routes/auth')
const user = require('./routes/user')

require('dotenv').config()

const app = express();

const port = process.env.PORT || 8000
const uri = process.env.ATLAS_URI
connectDB(uri)

// Middlewares
app.use(logger)
app.use(cors(corsOption))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// APIs
app.use('/account', auth)
app.use('/user', user)

// Middlewares
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
});
