const express = require('express')
const { connectToDb, getDb } = require('./db/db')
const morgan = require('morgan')
const { ObjectId } = require('mongodb')
const { success } = require('./helper')

// init app & middleware
const app = express()
const port = 3000

app.use(morgan('dev'))

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

// routes
app.get('/', (req, res) => res.send('Hello, Express !'))

app.get('/api/rockets', (req, res) => {
    const message = 'This is the list of all rockets'
    let rockets = []

    db.collection('rockets')
        .find()
        // .sort()
        .forEach(rocket => rockets.push(rocket))
        .then(() => {
            res.status(200).json(success(message, rockets))
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents' })
        })
})

app.get('/api/rockets/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const rocket = rockets.find(rocket => rocket._id === id)
    const message = 'A rocket has been found'

    db.collection('rockets')
        .findOne({ObjectId})
    res.json(success(message, rocket))
})
