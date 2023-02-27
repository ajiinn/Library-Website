const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const bookDB = require('./src/models/book')
const authorDoc = require('./src/models/author')

const bookRouter = require('./src/routes/bookRouter')
const authorRouter = require('./src/routes/authorRouter')
const registerRouter = require('./src/routes/registerRouter')
const loginRouter = require('./src/routes/loginRouter') 


app.use(express.static('./public'))
app.use(bodyParser.json())

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.set('views', './src/views')


app.get('/',(req,res)=>{
    res.render('index')
})


app.get('/addbook',(req, res)=>{
    res.render('addbook')
})

app.get('/addauthor', (req,res)=>{   
    res.render('addauthor')
})


app.use('/books', bookRouter)   
app.use('/author', authorRouter)
app.use('/', registerRouter)
app.use('/', loginRouter)


app.listen(3000, () =>{ 
        console.log('Server started at port http://localhost:3000')
})


