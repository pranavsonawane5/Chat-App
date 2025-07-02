const mongoose = require('mongoose');

//mongoose connection 
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chatapp', {
    });
    console.log("MongoDB Connected");
    } catch(error){
        console.error("MongoDb connection error", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;