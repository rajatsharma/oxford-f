# Oxford-API-F

Oxford API word search Free Function

## Working APIs

- `/search/:wordfragment` Returns Word Matches with meaning and pronunciation

## Secrets

- Put in `./secrets` folder

`publickey.js`

```javascript
module.exports = 'xxxxxxx' //Public key here
```

`oxfordkeys.js`

```javascript
const appId = 'xxxxxxx'
const appKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

module.exports = { appId, appKey }
```

Protected with

<img src="https://jwt.io/assets/logo.svg" width="110">

Made With 💖
