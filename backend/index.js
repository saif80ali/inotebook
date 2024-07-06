const connectToMogo = require("./db")
const express = require('express')
var cors = require('cors')
require('dotenv').config();

connectToMogo()
const app = express()
const port =  process.env.PORT || "5000";
const frontendurl = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(cors())
app.use(express.json())

// Serve static files from the React app

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})