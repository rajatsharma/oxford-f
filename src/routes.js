const { send } = require('micro')
const createWordsArray = require('./transformers')
const { wordSearchPromise } = require('./promises/wordsearchpromise')

const wordProcess = async(req, res) => {
  try {
    var response = await wordSearchPromise(req.params.word);
  } catch(e) {
    return e.statusCode == '404' ? send(res, 200, { words: [] }) : send(res, 500, { Internal:'We fucked up!' })
  }
  const oxfordJson = JSON.parse(response.body)
  const words = createWordsArray(
    oxfordJson.results[0].lexicalEntries[0].entries[0].senses, oxfordJson.results[0].word
  )
  const pronounciation = oxfordJson.results[0].lexicalEntries[0].pronunciations[0].audioFile
  return send(res, 200, { words, pronounciation })
}

const notFound = (req, res) => send(res, 404, { 404:'You lost bub' })


module.exports = { wordProcess, notFound }
