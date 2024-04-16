const express = require('express')
let rockets = require('./mock-rocket')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello, Express !'))


app.get('/api/rockets/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const rocket = rockets.find(rocket => rocket.id === id)
    res.send(`${rocket.description}`)
})

app.listen(port, () => console.log(`Notre app node est démarré sur le port : ${port}`))