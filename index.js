const express = require('express')
const multer = require('multer')
const cors = require('cors')
const bodyParser = require('body-parser')
const countSubtitleWords = require('./src/countSubtitleWords')

const app = express()
const upload = multer()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/count_subtitles', upload.array('subtitles'), countSubtitleWords)

const port = process.env.PORT || 3000

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
)
