//module import
const jwt = require('jsonwebtoken')

// generic function for generating 64 bit keystrings with hex
const generate_key = function() {
    return require('crypto').randomBytes(64).toString('hex')
}

// we need to be able to look at this value moving forward, so it stays up here
const initial_key = generate_key()

// create token
const get_token = function(input){
    return jwt.sign(input, initial_key)
}

// middleware function for authenticating a user
const authenticate_token = function(req, res, next){
    const auth_header = req.headers['authorization']
    const token = auth_header && auth_header.split(' ')[1]
    
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, initial_key,(err, user)=>{
      if(err) return res.sendStatus(403)
      req.user = user
      next()
    })

  }

module.exports = 
{
    jwt, generate_key, authenticate_token, get_token 
}