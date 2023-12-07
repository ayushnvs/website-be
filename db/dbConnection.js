const mongoose = require('mongoose')

const connectDB = async (uri) => {
    mongoose.connect(uri)

    const connection = mongoose.connection
    connection.once('open', () => {
        console.log('Database connection established successfully.')
    })
}

module.exports = connectDB;