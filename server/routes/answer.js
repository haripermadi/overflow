var express = require('express')
var router = express.Router()
const {addAnswer, showAllAnswer, removeAnswer, upvote, downVote} = require('../controllers/answerController')

router.get('/', showAllAnswer)
router.post('/', addAnswer)
router.delete('/:id', removeAnswer)
router.post('/upvote', upvote)
router.post('/donwvote', downVote)

module.exports = router