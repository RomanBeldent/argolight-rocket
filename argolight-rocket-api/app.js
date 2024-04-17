const express = require('express')
const { connectToDb, getDb } = require('./db/db')
const morgan = require('morgan')
let rockets = require('./db/mock-rocket')
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

app.get('/api/rockets/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const rocket = rockets.find(rocket => rocket.id === id)
    const message = 'Une fusée a été trouvé.'
    res.json(success(message, rocket))
})

app.get('/api/rockets', (req, res) => {
    const message = 'Voici la liste de toutes les fusées'
    res.json(success(message, rockets))
})
