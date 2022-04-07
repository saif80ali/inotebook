const mongoose = require('mongoose')
const URI = "mongodb://localhost:27017/inotebook"

const connectToMogo = ()=>{
    mongoose.connect(URI,()=>{
        console.log("MongoDB Connection Successful! yaaay")
    })
}

module.exports = connectToMogo