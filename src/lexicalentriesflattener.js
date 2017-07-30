const lexicalEntriesStraightner = oxfordResponse => {
  return oxfordResponse.results.map(xtext =>
    xtext.lexicalEntries.map(xlexicalCategory => xlexicalCategory.entries.map(x => {
      return x.senses.map(x => {
        return [{
          meaning: x.definitions && x.definitions[0] || x.crossReferenceMarkers && x.crossReferenceMarkers[0],
          example: x.examples && x.examples[0].text,
          id: x.id,
          word: xlexicalCategory.text,
          lexicalCategory: xlexicalCategory.lexicalCategory
        }].concat(x.subsenses ? x.subsenses.map(x => ({
          meaning: x.definitions && x.definitions[0] || x.crossReferenceMarkers && x.crossReferenceMarkers[0],
          example: x.examples && x.examples[0].text,
          id: x.id,
          word: xlexicalCategory.text,
          lexicalCategory: xlexicalCategory.lexicalCategory
        })) : [])
      }).reduce((x, acc) => acc.concat(x), [])
    }).reduce((x, acc) => acc.concat(x), [])).reduce((x, acc) => acc.concat(x), [])
  ).shift()
}

module.exports = lexicalEntriesStraightner
