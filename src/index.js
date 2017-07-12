'use strict'

const { router, get } = require('microrouter')

const microCors = require('micro-cors')
const { compose, parseJSONInput } = require('./composer')
const ping = require('./ping')
const { jwtcheckr } = require('./jwtcheckr')
const { wordProcess, notFound } = require('./routes')

const cors = microCors({ allowMethods: ['GET', 'POST'] })

module.exports = compose(
  cors,
  ping,
  // jwtcheckr, //All authenticated routes start from here
  fn => router(
    get('/search/:word', wordProcess),
    get('/*', notFound)
  )
)((req, res) => ({ 'Made with': '♥️s and λs by Rajat Sharma' }))
