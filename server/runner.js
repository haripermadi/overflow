const CronJob = require('cron').CronJob
const kue = require('kue')
const queue = kue.createQueue();
const nodemailer = require('nodemailer');
const pass = process.env.emailpass

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'catsverflow@gmail.com',
    pass: 'Catsverflow2018'
  }
});

const job = new CronJob({
  cronTime: '* * * * * *',
  onTick: function() {
    queue.process('email', 5, function(job, done){
      console.log('isi job===', job)
      let input = job.data

      var mailOptions = {
        from: 'catsverflow@gmail.com',
        to: input.to,
        subject: 'Email notifications',
        // text: `Helloo.. ${input.name}, Thank you for using CatsVerFlow!`
        html: `
        <p>Hello <strong>${input.name} </strong>, welcome back to Catsverflow!!</p>
        <p>Don't forget our monthly meeting every <strong>Saturday</strong> on the first week of the month</p>
        `
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('error send==', error);
        } else {
          console.log('Email sent: ' + info.response)
          done()
        }
      })
    });
  },
  start: false,
  timeZone: 'Asia/Jakarta'
});

job.start();