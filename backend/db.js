const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

const connectToMongo = async () => {
    try {
        await mongoose.connect(URI);
        console.log(`MongoDB connected successfully to ${mongoose.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        throw error;
    }
};

module.exports = connectToMongo;