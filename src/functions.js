const { Observable } = require('rxjs')
const { isEmpty } = require('lodash')

const createPipeableOperator = operatorFn => source => new Observable
  .create(
    (subscriber) => {
      const sub = operatorFn(subscriber)
      source.subscribe({
        next: sub.next,
        error: sub.error || (e => subscriber.error(e)),
        complete: sub.complete || (e => subscriber.complete()),
      })
    }
  )

const getFilesContent = files => new Observable(
  ((subscriber) => {
    if (isEmpty(files)) subscriber.error('no_files_has_been_uploaded')
    try {
      files.forEach((file) => {
        if (isSubtitle(file.originalname)) {
          subscriber.next(file.buffer.toString())
        }
      })
      subscriber.complete()
    } catch (error) {
      subscriber.error(error)
    }
  })
)

const isSubtitle = fileName => fileName.endsWith('.srt')

const removeBlankLines = () => createPipeableOperator(
  subscriber => ({
    next(line) {
      if (line.trim()) {
        subscriber.next(line)
      }
    }
  })
)

const removeLineIfStartsWithNumber = () => createPipeableOperator(
  subscriber => ({
    next(text) {
      const num = parseInt(text.trim())
      if (num !== num) subscriber.next(text)
    } 
  })
)

const separateLineBy = symbol => createPipeableOperator(
  subscriber => ({
    next(text) {
      text.split(symbol).forEach((line) => {
        subscriber.next(line)
      })
    } 
  })
)

const removeSymbols = symbols => createPipeableOperator(
  subscriber => ({
    next(text) {
      const filteredText = symbols.reduce(
        (acc, symbol) => acc.split(symbol).join(''),
        text,
      )
      subscriber.next(filteredText)
    }
  })
)

const setToLowerCase = () => createPipeableOperator(
  subscriber => ({
    next(word) {
      subscriber.next(word.toLowerCase())
    }
  })
)

module.exports = {
  getFilesContent,
  separateLineBy,
  removeBlankLines,
  removeLineIfStartsWithNumber,
  removeSymbols,
  setToLowerCase,
}
