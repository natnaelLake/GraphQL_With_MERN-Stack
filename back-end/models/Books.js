const mongoose = require('mongoose');

const booksDb = mongoose.Schema({
    name:String,
    genere:String,
    authorId:String,
})


module.exports = mongoose.model("Book",booksDb)