var express = require('express');
var router = express.Router();
const {showAllQuestion, showUserQuestion, getQuestionById, addQuestion, removeQuestion, updateQuestion, upvote, downVote} = require('../controllers/questionController')

router.get('/', showAllQuestion)
router.get('/:id',getQuestionById)
router.get('/userquestion/:id', showUserQuestion)
router.post('/', addQuestion)
router.delete('/:id', removeQuestion)
router.put('/:id', updateQuestion)
router.post('/upvote', upvote)
router.post('/downvote', downVote)

module.exports = router;
