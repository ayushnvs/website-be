const express = require('express');
const cors = require('cors')
const connectDB = require('./db/dbConnection')

require('dotenv').config()

const app = express();
const port = process.env.PORT || 8000

//TODO: Custom middleware logger


const whitelist = ['http://localhost:3000']
const corsOrigin = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) callback(null, true)
        else callback(new Error('Not allowed by CORS'))
    },
    optionSuccessStatus: 200
}
app.use(cors(corsOrigin))
app.use(express.json())

const uri = process.env.ATLAS_URI
connectDB(uri)

// schema and routes
const user = require('./routes/user')
app.use('/account', user)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
});
