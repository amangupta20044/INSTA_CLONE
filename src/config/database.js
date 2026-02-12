const mongoose= require('mongoose')

async function connectToDb(){
    await mongoose.connect(process.env.MONGO_URI)
}


module.exports = connectToDb;