var express = require('express');
var router = express.Router();
const {showAllQuestion, addQuestion, removeQuestion, updateQuestion, upvote, downVote} = require('../controllers/questionController')

router.get('/', showAllQuestion)
router.post('/', addQuestion)
router.delete('/:id', removeQuestion)
router.put('/:id', updateQuestion)
router.post('/upvote', upvote)
router.post('/donwvote', downVote)

module.exports = router;
