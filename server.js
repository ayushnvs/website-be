const express = require('express');
const cors = require('cors')
const corsOption = require('./config/corsConfig')
const connectDB = require('./db/dbConnection')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const user = require('./routes/user')

require('dotenv').config()

const app = express();
const port = process.env.PORT || 8000

app.use(logger)
app.use(cors(corsOption))
app.use(express.json())

const uri = process.env.ATLAS_URI
connectDB(uri)

app.use('/account', user)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
});
