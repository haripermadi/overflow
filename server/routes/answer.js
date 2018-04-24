var express = require('express')
var router = express.Router()
const {addAnswer, showAnswerByQuestion, removeAnswer, upvote, downVote} = require('../controllers/answerController')

router.get('/:questionid', showAnswerByQuestion)
router.post('/', addAnswer)
router.delete('/:id', removeAnswer)
router.post('/upvote', upvote)
router.post('/donwvote', downVote)

module.exports = router