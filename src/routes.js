const { send } = require('micro')

const wordSearchPromise = require('./promises/wordsearchpromise')

const searchWords = async (req, res) => send(res, 200, await wordSearchPromise(req.params.word))

const notFound = (req, res) => {
  send(res, 404, { '404':'You lost bub' })
}

module.exports = { searchWords, notFound }
