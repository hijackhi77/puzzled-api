const dotenv = require("dotenv/config")
const express = require("express")
const { appName } = require("./config")

const app = express()
const port = typeof process.env.PORT === "undefined" ? 3000 : process.env.PORT

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
// Enable all CORS requests
const cors = require("cors")
app.use(cors())

const api = require("./routes/api")
app.use("/api", api)

app.listen(port, () =>
  console.log(`[INFO] ${appName} starts listening on port ${port}!`)
)
