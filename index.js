const dotenv = require('dotenv/config')
const express = require('express')
const { appName } = require('./config')

const app = express()
const port = process.env.PORT

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

const index = require('./routes/index')
app.get('/', index)

const huarongDao = require('./routes/huarongDao')
app.use('/huarong-dao', huarongDao)

const test = require('./routes/test')
app.use('/test', test)

app.listen(port, () => console.log(`${appName} starts listening on port ${port}!`))