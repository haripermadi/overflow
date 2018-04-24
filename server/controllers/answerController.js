const Answer = require('../models/answers')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  addAnswer: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, secret)
    let input = {
      content: req.body.content,
      userId: decoded.id,
      upvotes: req.body.upvotes,
      downvotes: req.body.downvotes,
      questionId: req.body.questionId
    }
    Answer.create(input, (error, newAnswer) => {
      if(error) {
        res.status(400).json({
          message: 'failed add new Answer',
          error
        })
      } else {
        res.status(201).json({
          message: 'success add new Answer!',
          newAnswer
        })
      }
    })
  },
  showAnswerByQuestion: function (req, res) {
    Answer.find({
      questionId: req.params.questionid
    })
    .sort({updatedAt: 'desc'})
    .populate('userId')
    .exec()
    .then(data=>{
      res.status(200).json({
        message:' success get list Answer',
        data
      })
    }).catch(err=>{
      res.status(400).json({
        message: 'failed get Answers'
      })
    })
  },
  removeAnswer: function (req, res) {
    let id = {
      _id:req.params.id
    }
    Answer.findByIdAndRemove(id,(err,data)=>{
      if(err){
        res.status(400).json({
          message:'failed remove Answer'
        })
      }else{
        res.status(200).json({
          message:'success remove a Answer'
        })
      }
    })
  },
  upvote: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, secret)
    let answerId = req.body.answerId

    Answer.findById(answerId, (err, dataAnswer) => {
      if(err) {
        res.status(400).json({
          message: 'failed',
          error: err
        })
      } else {
        let check = true
         dataAnswer.upvotes.forEach((value, index) => {
           if(value === decoded.id) {
             console.log('voters samaaa===', value, decoded.id, index)
             check = false
             dataAnswer.upvotes.splice(index, 1)
             dataAnswer.save(function(err, data) {
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
            dataAnswer.downvotes.forEach((answerDown, index)=>{
              if(answerDown === decoded.id) {
                console.log('voters samaaa===', answerDown, decoded.id, index)
                check = false
                dataAnswer.downvotes.splice(index, 1)
              }
            })
            dataAnswer.upvotes.push(decoded.id)
            dataAnswer.save(function(err, data) {
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
    let answerId = req.body.answerId

    Answer.findById(answerId, (err, dataAnswer) => {
      if(err) {
        res.status(400).json({
          message: 'failed',
          error: err
        })
      } else {
        let check = true
         dataAnswer.downvotes.forEach((value, index) => {
           if(value === decoded.id) {
             console.log('voters samaaa===', value, decoded.id, index)
             check = false
             dataAnswer.downvotes.splice(index, 1)
             dataAnswer.save(function(err, data) {
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
            dataAnswer.upvotes.forEach((answerUp, index)=>{
              if(answerUp === decoded.id) {
                console.log('voters samaaa===', answerUp, decoded.id, index)
                check = false
                dataAnswer.upvotes.splice(index, 1)
              }
            })
            dataAnswer.downvotes.push(decoded.id)
            dataAnswer.save(function(err, data) {
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