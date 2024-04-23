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
        required: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 1
    }
})

LoginSchema.path('username').validate(function (value) {
    return value && value.length > 0;
}, 'Username cannot be empty');

LoginSchema.path('password').validate(function (value) {
    return value && value.length > 0;
}, 'Password cannot be empty');

const collection = new mongoose.model('users', LoginSchema)

module.exports = collection