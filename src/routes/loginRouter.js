const express = require('express')
const loginRouter = express.Router()
const registerDoc = require('../models/register')

loginRouter.get('/login',(req, res)=>{res.render('login')})

loginRouter.get('/login_form', (req, res)=>{
    console.log(req.query)
    var user_login = {
        email: req.query.email,
        password: req.query.password
    }
    registerDoc.findOne({email: req.query.email}).then((userlog) => {

        if(userlog){ 
           if(userlog.password == req.query.password){
            res.redirect('/')
           }
           else{
            console.log('Incorrect password')
           }
        }
        else{
            console.log('');
        }
    }) 
})

module.exports = loginRouter