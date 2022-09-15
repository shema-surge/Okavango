const mongoose = require('mongoose')
const {DB_NAME,DB_USERNAME,DB_PASSWORD} = process.env

const connectToMongo = () =>{ mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ed9sx.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`).then((connection)=>{
    console.log('Connected to mongo')
}).catch((err)=>{
    console.error(err)
})}

module.exports = { connectToMongo }