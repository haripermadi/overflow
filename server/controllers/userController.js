const User = require('../models/users')
const bcrypt = require('bcryptjs')
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  signUp: function (req, res) {
    let hash = bcrypt.hashSync(req.body.password,salt)
    let input = {
      name: req.body.name,
      email: req.body.email,
      password: hash
    }

    User.findOne({
      email: req.body.email
    })
    .exec()
    .then(dataUser => {
      if(dataUser === null){
        User.create(input,(error, newUser) =>{
          console.log('newuser==', newUser)
          if(!error){
            let token = jwt.sign({id:newUser._id,email:newUser.email},secret)
            res.status(201).json({
              message: 'success adding new user',
              data:{
              id:newUser._id,
              name:newUser.name,
              email:newUser.email,
              token :token
            }
            })
          }else{
            res.status(400).json({
              message: "failed ad new user",
              error
            })
          }
        })
      }else{
        res.status(400).json({
          message: "email already reqistered, please use another email!",
        })
      }
    }).catch(err => {
      res.status(400).json({
        message: "error",
        err
      })
    })
  },
  signIn: function(req, res) {
    User.findOne({
      email: req.body.email
    })
    .exec()
    .then(dataUser => {
      if(dataUser){
        let checkPass = bcrypt.compareSync(req.body.password,dataUser.password)
        if(checkPass){
          let token = jwt.sign({id:dataUser._id,email:dataUser.email},secret)
          res.status(200).json({
            message:"login success",
            data:{
              id:dataUser._id,
              name:dataUser.name,
              email:dataUser.email,
              token :token
            }
          })
        }else{
          res.status(400).json({
            message: "email/password is wrong"
          })
        }
      }else{
        res.status(400).json({
          message: "user not found, please register"
        })
      }
    }).catch(err =>{
      res.status(400).json({
        message: "error",
        err
      })
    })
  }
}