const { MongoClient } = require('mongodb')

let dbConnection
let password = 'mIdV6OTjRlF7Cwct'
const uri = `mongodb+srv://argolight:${password}@cluster0.wdcbpqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

module.exports = {
    connectToDb: (cb) => {
        //mongodb://localhost:27017/spacex
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: async () => await dbConnection
}