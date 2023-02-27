const mongoose  = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/bookDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const bookSchema = new schema({
    author_name: String,
    book_title: String,
    book_img: String
})

var Bookdata = mongoose.model('book', bookSchema)
module.exports = Bookdata
