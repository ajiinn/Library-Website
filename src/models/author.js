const mongoose  = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/bookDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const authorSchema = new schema({
    author_name: String,
    author_img: String
})

var authordata = mongoose.model('author', authorSchema)
module.exports = authordata
