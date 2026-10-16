require('dotenv').config();

const connectToMongo = require("./db")
const express = require('express')
var cors = require('cors')

const app = express()
const port =  process.env.PORT || "5000";
const frontendurl = process.env.FRONTEND_URL || ["http://localhost:3000", "http://localhost:5173"];

app.use(cors({
  origin : frontendurl,
  optionsSuccessStatus: 200
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));;

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.use('/api/stocks',require('./routes/stocks'))

const startServer = async () => {
  await connectToMongo();
  app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port}`)
  })
}

startServer().catch(() => {
  process.exit(1);
});