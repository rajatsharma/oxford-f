const request = require('request-promise')
const { appId, appKey } = require('../../secrets/oxfordkeys')
const createWordsArray = require('../transformers')

const wordSearchPromise = wordfragment =>
  request({
    uri: 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/' + wordfragment,
    method: 'GET',
    resolveWithFullResponse: true,
    headers: {
      'Accept': 'application/json',
      'app_id': appId,
      'app_key': appKey
    }
  })


module.exports = { wordSearchPromise }
