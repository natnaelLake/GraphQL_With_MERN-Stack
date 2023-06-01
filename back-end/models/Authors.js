const mongoose = require('mongoose');

const authorDb = mongoose.Schema({
    name:String,
    age:Number,
})

module.exports = mongoose.model('Author',authorDb)