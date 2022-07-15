const jwt = require('jsonwebtoken')

const generate_key = function() {
    return require('crypto').randomBytes(64).toString('hex')
}

module.exports = 
{
    jwt, generate_key 
}