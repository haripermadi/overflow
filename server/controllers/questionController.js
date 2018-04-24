const Question = require('../models/questions')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  addQuestion: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, secret)
    let input = {
      title: req.body.title,
      description: req.body.description,
      userId: decoded.id,
      upvotes: req.body.upvotes,
      downvotes: req.body.downvotes,
    }
    Question.create(input, (error, newQuestion) => {
      if(error) {
        res.status(400).json({
          message: 'failed add new question',
          error
        })
      } else {
        res.status(201).json({
          message: 'success add new question!',
          newQuestion
        })
      }
    })
  },
  showAllQuestion: function (req, res) {
    Question.find()
    .sort({updatedAt: 'desc'})
    .populate('userId')
    .exec()
    .then(data=>{
      res.status(200).json({
        message:' success get list question',
        data
      })
    }).catch(err=>{
      res.status(400).json({
        message: 'failed get questions'
      })
    })
  },
  showUserQuestion: function (req, res) {
    console.log('userid===', req.params.id)
    Question.find({
      userId: req.params.id
    })
    .sort({updatedAt: 'desc'})
    .exec()
    .then(data=>{
      res.status(200).json({
        message:' success get list user question',
        data
      })
    }).catch(err=>{
      res.status(400).json({
        message: 'failed get questions'
      })
    })
  },
  getQuestionById: function (req, res) {
    console.log('id question==', req.params.id)
    Question.findById(req.params.id)
    .populate('userId')
    .exec()
    .then(data => {
      res.status(200).json({
        message:' success get question',
        data
      })
    }).catch(err=>{
      res.status(400).json({
        message: 'failed get questions'
      })
    })
  },
  removeQuestion: function (req, res) {
    let id = {
      _id:req.params.id
    }
    Question.findByIdAndRemove(id,(err,data)=>{
      if(err){
        res.status(400).json({
          message:'failed remove question'
        })
      }else{
        res.status(200).json({
          message:'success remove a question'
        })
      }
    })
  },
  updateQuestion: function (req, res) {
    let id = {_id: req.params.id}
    let input = {
      title: req.body.title,
      description: req.body.description
    }
    Question.findByIdAndUpdate(id, input, (err) =>{
      if(err){
        res.status(400).json({
          message:"error",
          err
        })
      }else{
        res.status(200).json({
          message:"update success",
        })
      }
    })
  },
  upvote: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, secret)
    let questionId = req.body.questionId

    Question.findById(questionId, (err, dataQuestion) => {
      if(err) {
        res.status(400).json({
          message: 'failed',
          error: err
        })
      } else {
        let check = true
         dataQuestion.upvotes.forEach((value, index) => {
           if(value === decoded.id) {
             console.log('voters samaaa===', value, decoded.id, index)
             check = false
             dataQuestion.upvotes.splice(index, 1)
             dataQuestion.save(function(err, data) {
               if (err) {
                res.status(400).json({
                  message: 'failed',
                  error: err
                })
               } else {
                 res.status(200).json({
                   message: 'cancel upvote success!!',
                   data
                 })
                }
               })
             }
          })
          if(check) {
            dataQuestion.downvotes.forEach((questionDown, index)=>{
              if(questionDown === decoded.id) {
                console.log('voters samaaa===', questionDown, decoded.id, index)
                check = false
                dataQuestion.downvotes.splice(index, 1)
              }
            })
            dataQuestion.upvotes.push(decoded.id)
            dataQuestion.save(function(err, data) {
              if (err) {
               res.status(400).json({
                 message: 'failed',
                 error: err
               })
              } else {
                res.status(200).json({
                  message: 'upvote success!!',
                  data
                })
               }
              })
          }
        }
    })
  },
  downVote: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, secret)
    let questionId = req.body.questionId

    Question.findById(questionId, (err, dataQuestion) => {
      if(err) {
        res.status(400).json({
          message: 'failed',
          error: err
        })
      } else {
        let check = true
         dataQuestion.downvotes.forEach((value, index) => {
           if(value === decoded.id) {
             console.log('voters samaaa===', value, decoded.id, index)
             check = false
             dataQuestion.downvotes.splice(index, 1)
             dataQuestion.save(function(err, data) {
               if (err) {
                res.status(400).json({
                  message: 'failed',
                  error: err
                })
               } else {
                 res.status(200).json({
                   message: 'cancel upvote success!!',
                   data
                 })
                }
               })
             }
          })
          if(check) {
            dataQuestion.upvotes.forEach((questionUp, index)=>{
              if(questionUp === decoded.id) {
                console.log('voters samaaa===', questionUp, decoded.id, index)
                check = false
                dataQuestion.upvotes.splice(index, 1)
              }
            })
            dataQuestion.downvotes.push(decoded.id)
            dataQuestion.save(function(err, data) {
              if (err) {
               res.status(400).json({
                 message: 'failed',
                 error: err
               })
              } else {
                res.status(200).json({
                  message: 'upvote success!!',
                  data
                })
               }
              })
          }
        }
    })
  }
}