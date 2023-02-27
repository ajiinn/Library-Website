const express = require('express')
const registerRouter = express.Router()
const registerDoc = require('../models/register')

registerRouter.get('/register',(req, res)=>{
    res.render('register')
})
registerRouter.get('/save',(req,res)=>{
    console.log(req.query)
    var user_reg = {
        email: req.query.email,
        password: req.query.password,
        cpassword: req.query.cpassword,
        firstname: req.query.firstname,
        lastname: req.query.lastname
    }
    registerDoc(user_reg).save().then((reguser)=>{
       res.redirect('/')
    })

})

module.exports = registerRouter