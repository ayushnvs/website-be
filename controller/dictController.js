const Dictionary = require('../db/dictionaryModel')

const handleAdd = async(req,res) => {
    const { word, engSound } = req.body
    const finalWord = new Dictionary({
        word,
        engSound
    })
    await finalWord.save()
    .then(() => res.sendStatus(200))
    .catch(err => res.status(400).json({Error: err}))
}

const handleUpdate = async(req,res) => {}

const handleDelete = async(req,res) => {}

module.exports = {
    handleAdd,
    handleUpdate,
    handleDelete
}