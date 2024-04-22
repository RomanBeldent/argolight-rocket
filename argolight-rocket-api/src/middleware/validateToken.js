const jwt = require('jsonwebtoken')
  
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  
  if(!authorizationHeader) {
    const message = `You haven't provided an authentication token. Please add one to the request header.`
    return res.status(401).json({ message })
  }
    
    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decodedToken) => {
    if(error) {
      const message = `The user is not authorized to access this resource.`
      return res.status(401).json({ message, data: error })
    }
  
    const userId = decodedToken.id
    if (req.body.id !== userId) {
      const message = `The user ID is invalid.`
      res.status(401).json({ message })
    } else {
      next()
    }
  })
}