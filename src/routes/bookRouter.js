const express = require('express')
const multer = require('multer')
const bookRouter = express.Router()
const bookDB = require('../models/book')    
bookRouter.use(express.static('./public'))

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/')
    },
    filename: function(req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

bookRouter.get('/',(req,res)=>{
    bookDB.find().then((data)=>{
        console.log(data)
        res.render("books", {data})
    //     res.status(200).json({
    //       data:data,
    //       error:false,
    //       sucess:true,
    //       message:"Book data Found"
    //     })
    // }).catch((err)=>{
    //   res.status(400).json({
    //     data:err,
    //     error:true,
    //     sucess:false,
    //     message:"Book data Not Found"
    //   })
    })
})

bookRouter.post('/formbook', upload.single('book_img'), (req, res)=>{
    console.log(req.body)
    var addbook = {
        author_name: req.body.author_name,
        book_title: req.body.book_title, 
        book_img: req.file.filename 
    }
    bookDB(addbook).save().then((addbooks) => {
        res.redirect('/books')
        // res.status(200).json({
        //   data:addbooks,
        //   error:false,
        //   sucess:true,
        //   message:"Book Added"
        // })
    })
})

bookRouter.get('/deletebook/:id', (req, res)=>{
  var id = req.params.id
  console.log(id);
    bookDB.findByIdAndDelete({_id:id}).then((addbooks) => {
        res.redirect('/books')
    })
})

bookRouter.get('/editbook/:id', (req, res)=>{
    var id = req.params.id
    console.log(id) 
      bookDB.findOne({_id:id}).then((editdata) => {
        console.log(editdata)
          res.render('editbook', {editdata})
      }) 
})

bookRouter.get('/editbookform', (req, res)=>{
    var details = {
        book_title:req.query.book_title,
        author_name:req.query.author_name
    }
    var id = req.query.id
    console.log(details) 

    bookDB.updateOne({_id:id},{$set:details}).then((updatedata) =>{
        console.log(updatedata)
        res.redirect('/books')
    })
})


module.exports = bookRouter