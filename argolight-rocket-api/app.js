const express = require('express')
const { success } = require('./helper')
let rockets = require('./mock-rocket')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello, Express !'))

app.get('/api/rockets/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const rocket = rockets.find(rocket => rocket.id === id)
    const message = 'Une fusée a été trouvé.'
    res.json(success(message, rocket))
})

app.get('/api/rockets', (req, res) => {
    res.json(`Il y a un total de ${rockets.length} fusées dans l'API pour l'instant`)
})

app.listen(port, () => console.log(`Notre app node est démarré sur le port : http://localhost:${port}`))