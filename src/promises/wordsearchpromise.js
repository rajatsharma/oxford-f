const request = require('request-promise')
const createWordsArray = require('../transformers')
const tryRequire =  require('try-require')
const oxfordKeys = tryRequire('./../../secrets/oxfordkeys')

const wordSearchPromise = wordfragment =>
  request({
    uri: 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/' + wordfragment,
    method: 'GET',
    resolveWithFullResponse: true,
    headers: {
      'Accept': 'application/json',
      'app_id': oxfordKeys && oxfordKeys.appId || process.env.OXFORDAPPID,
      'app_key': oxfordKeys && oxfordKeys.appKey || process.env.OXFORDAPPKEY
    }
  })

module.exports = { wordSearchPromise }
