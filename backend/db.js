const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
console.log(URI)
const connectToMogo = ()=>{
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
        },()=>{
        console.log("MongoDB Connection Successful!")
    })
}

module.exports = connectToMogo