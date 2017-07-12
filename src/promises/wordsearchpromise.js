const request = require('request-promise')
const createWordsArray = require('../transformers')
const tryRequire = require('try-require')
const { appId, appKey } = tryRequire('../../secrets/oxfordkeys')

const wordSearchPromise = wordfragment =>
  request({
    uri: 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/' + wordfragment,
    method: 'GET',
    resolveWithFullResponse: true,
    headers: {
      'Accept': 'application/json',
      'app_id': appId || process.env.OXFORDAPPID,
      'app_key': appKey || process.env.OXFORDAPPKEY
    }
  })

module.exports = { wordSearchPromise }
