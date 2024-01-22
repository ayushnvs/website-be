const mongoose = require('mongoose')

const DictionarySchema = new mongoose.Schema({
    // word, engSound
    word: {
        type: Map,
        of: String,
        required: true,
        unique: true
    },
    // Hindi, English
    meaning: {
        type: Map,
        of: Array
    },
    // Sanskrit, explaination
    example: {
        type: Map,
        of: Array
    }
})

const Dictionary = mongoose.model('Dictionary', DictionarySchema)

module.exports = Dictionary