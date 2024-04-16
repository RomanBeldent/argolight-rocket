const express = require('express')
const morgan = require('morgan')
const { success } = require('./helper')
let rockets = require('./db/mock-rocket')

const app = express()
const port = 3000

app.use(morgan('dev'))

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

app.listen(port, () => console.log(`Notre app node est démarré sur le port : http://localhost:${port}`))