const express = require('express')
const multer = require('multer')
const authorRouter = express.Router()
const authorDoc = require('../models/author')
authorRouter.use(express.static('./public'))

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/')
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

authorRouter.get('/',(req, res)=>{
    authorDoc.find().then((authordata) => {
        console.log(authordata)
        res.render('author', {authordata})
    })  
})

authorRouter.post('/formauthor', upload.single('authorimg'), (req, res)=>{
    console.log(req.query)
    var addauthor = {
        author_name: req.body.authorname,
        author_img: req.file.filename
    }
    authorDoc(addauthor).save().then((addauthor) => {
        res.redirect('/author')
    })
  
})

authorRouter.get('/deleteauthor/:id', (req, res)=>{
    var id = req.params.id
    console.log(id);
      authorDoc.findByIdAndDelete({_id:id}).then((addbooks) => {
          res.redirect('/author')
      })
  })
  
  authorRouter.get('/editauthor/:id', (req, res)=>{
      var id = req.params.id
      console.log(id) 
        authorDoc.findOne({_id:id}).then((editauthordata) => {
          console.log(editauthordata)
            res.render('editauthor', {editauthordata})
        }) 
  })
  
  authorRouter.get('/editauthorform', (req, res)=>{
      var details = {
          author_img:req.query.authorimg,
          author_name:req.query.authorname
      }
      var id = req.query.id
      console.log(details)
  
      authorDoc.updateOne({_id:id},{$set:details}).then((updatedata) =>{
          console.log(updatedata)
          res.redirect('/author')
      })
  })


module.exports = authorRouter