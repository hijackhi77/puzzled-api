const dotenv = require('dotenv/config')
const express = require('express')
const { appName } = require('./config')

const app = express()
const port = process.env.PORT

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`Welcome to ${appName}`)
})

app.listen(port, () => console.log(`${appName} starts listening on port ${port}!`))