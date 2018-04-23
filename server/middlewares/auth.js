const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  auth : function (req, res, next) {
    console.log("masuk middleware auth===", req.headers)
    let token = req.headers.token
    if (token) {
      try {
        let decoded = jwt.verify(token, secret)
        next()
      }
      catch (err) {
        res.status(400).json({
          message: 'error',
          error: err
        })
      }
    } else {
      res.status(400).json({
        message:" restricted!!! You need token to access"
      })
    }
    
  }
}
