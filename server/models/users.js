const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: [true,'name required!'],
  },
  email: {
    type: String,
    required: [true,'Email required!'],
    unique: true
  },
  password: String
},{
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User