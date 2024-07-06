const connectToMogo = require("./db")
const express = require('express')
var cors = require('cors')
require('dotenv').config();

connectToMogo()
const app = express()
const port =  process.env.PORT || "5000";
const JWT_SECRET = process.env.JWT_SECRET;
const URI = process.env.MONGODB_URI
const frontendurl = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));;

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!',
    port: port,
    key: JWT_SECRET,
    uri:URI
   });
});

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})