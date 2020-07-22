const {
  getFilesContent,
  separateLineBy,
  removeBlankLines,
  removeLineIfStartsWithNumber,
  removeSymbols,
  setToLowerCase,
} = require('./functions')
const { toArray, map, groupBy, mergeMap } = require('rxjs/operators')
const { sortBy } = require('lodash')

const symbols = [
  '.', '?', '-', ',', '"', '_', '<i>', '</i>', '\r',
  '[', ']', '(', ')', '!', '𝅘𝅥𝅮', '<', '\/', '>',
]

const countSubtitlesWords = (req, res) => {
  getFilesContent(req.files)
    .pipe(
      separateLineBy('\n'),
      removeBlankLines(),
      removeLineIfStartsWithNumber(),
      removeSymbols(symbols),
      separateLineBy(' '),
      removeBlankLines(),
      removeLineIfStartsWithNumber(),
      setToLowerCase(),
      groupBy(el => el),
      mergeMap(group => group.pipe(toArray())),
      map(words => ({ word: words[0], quantity: words.length })),
      toArray(),
      map(array => sortBy(array, el => -el.quantity)),
    )
    .subscribe(
      (count) => {
        res.json({ count })
      },
      (error) => {
        res.status(400).json({ error: error || 'invalid_files' })
      }
    )

}

module.exports = countSubtitlesWords
