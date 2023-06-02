const mongoose = require('mongoose');

const authorDb = mongoose.Schema({
    name:String,
    age:Number,
},{timestamps:true})

module.exports = mongoose.model('Author',authorDb)