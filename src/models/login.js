const mongoose  = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/bookDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const loginSchema = new schema({
    email: String,
    password: String,
    cpassword: String,
    firstname: String,
    lastname: String
})

var logindata = mongoose.model('login', loginSchema)
module.exports = logindata
