const request = require('request-promise')
const { appId, appKey } = require('../../secrets/oxfordkeys')
const IP = require('./identitypromise')
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
  .then(response => JSON.parse(response.body))
  .then(
    oxfordJson => Promise.all([
      IP(() => createWordsArray(
        oxfordJson.results[0].lexicalEntries[0].entries[0].senses, oxfordJson.results[0].word
      )),
      IP(() => oxfordJson.results[0].lexicalEntries[0].pronunciations[0].audioFile)
    ])
  )
  .then(wordsAndPronounciation => IP(
    () => ({ words: wordsAndPronounciation[0], pronounciation: wordsAndPronounciation[1] })
  ))
  .catch(e => {
    console.log(e)
    return ({ 'Error': 'in processing words from Oxford API' })
  })

module.exports = wordSearchPromise
