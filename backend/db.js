const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.MONGODB_URI;
const connectToMogo = ()=>{
    mongoose.connect(URI,()=>{
        console.log("MongoDB Connection Successful!")
    })
}

module.exports = connectToMogo