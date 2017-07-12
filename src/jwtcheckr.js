const jwt = require('jsonwebtoken')
const fs = require('fs')
const tryRequire = require('try-require')
const publicKey = tryRequire('../secrets/publickey')

const jwtverifyPromise = token => new Promise((resolve, reject) => {
  jwt.verify(token, publicKey || process.env.PUBLICKEY, { algorithms: ['HS256'] }, function(err, decoded) {
    if(err) {
      reject(err)
      return
    }
    resolve(decoded)
  })
})

const jwtcheckr = fn => async(req, res) => {
  if(!req.headers['authorization']) {
    return { 'boo': 'No Token' }
  }
  try {
    await jwtverifyPromise(req.headers['authorization'].split(' ')[1])
    return fn(req, res)
  } catch(e) {
    return { 'boo': 'authentication failed' }
  }
}

module.exports = { jwtcheckr }
