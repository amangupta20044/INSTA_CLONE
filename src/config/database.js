const mongoose = require('mongoose')

async function connectToDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected')
    } catch (err) {
        console.error('MongoDB connection error:', err && err.message ? err.message : err)
        throw err
    }
}

module.exports = connectToDb;