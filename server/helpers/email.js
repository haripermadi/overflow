const nodemailer = require('nodemailer');
const pass = process.env.emailpass
const User = require('../models/users')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'catsverflow@gmail.com',
    pass: `${pass}`
  }
});
module.exports = {
  sendEmail: function (req, res) {
    User.find({
      // email: req.body.email
    })
    .exec()
    .then(dataUser => {
      dataUser.forEach(value => {
        var mailOptions = {
          from: 'catsverflow@gmail.com',
          to: `${value.email}`,
          subject: 'Sending Email using Node.js',
          text: 'Try send with nodemailer!'
        }
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
      })
      res.status(200).json({
        message: 'sending email success'
      })
    })
  }
}
