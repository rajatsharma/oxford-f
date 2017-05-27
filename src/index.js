'use strict'

const { router, get } = require('microrouter')


const { compose, parseJSONInput } = require('./composer')
const { pingAPI, sampleResponse } = require('./routes')
const { jwtcheckr } = require('./jwtcheckr')
const { searchWords, notFound } = require('./routes')

module.exports = compose(
  pingAPI,
  jwtcheckr, //All authenticated routes start from here
  fn => router(
    get('/search/:word', searchWords),
    get('/*', notFound)
  )
)((req, res) => ({ 'Made with': '♥️s and λs by Rajat Sharma' }))
