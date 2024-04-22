const express = require('express')
require('dotenv').config()
const { connectToDb, getDb } = require('./src/db/db')
const morgan = require('morgan')
const apiRouting = require('./src/api/api')
const userRouting = require('./src/api/user')
const cors = require('cors')

// init app & middleware
const app = express()
const port = 3000

app
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cors())

// db connection
let db

connectToDb((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`Notre app node est démarré sur le port : http://localhost:${port}`)
        })
        db = getDb()
    }
})

//api routes
app.use('/', apiRouting)
app.use('/user', userRouting)
// 404 route error handling
app.get('*', (req, res) => {
    res.status(404).json({ error: 'This route does not exist in this world, but maybe in another universe !' })
})

module.exports = app