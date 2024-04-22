const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb+srv://argolight:mIdV6OTjRlF7Cwct@cluster0.wdcbpqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

connect.then(() => {
    console.log('Database connected successfully')
})
    .catch(() => {
        console.log('Database cannot be connected')
    })

const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const collection = new mongoose.model('users', LoginSchema)

module.exports = collection