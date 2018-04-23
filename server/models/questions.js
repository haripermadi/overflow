const mongoose = require('mongoose');
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: String,
  description:String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},{
  timestamps: true
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question