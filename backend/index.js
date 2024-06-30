const connectToMogo = require("./db")
const express = require('express')
var cors = require('cors')
require('dotenv').config();

connectToMogo()
const app = express()
const port =  process.env.PORT;
const frontend_url = process.env.FRONTEND_URL;
app.use(cors({
  origin: frontend_url, // Allow requests from this origin
  methods: 'GET,POST,PUT,DELETE', // Allow these methods
  credentials: true // Include credentials like cookies in requests
}))
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})