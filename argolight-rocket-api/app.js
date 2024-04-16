const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello, Express !'))

app.get('/api/rockets/:id', (req, res) => {
    const id = req.params.id
    res.send(`Voici la requête ${id}`)
})

app.listen(port, () => console.log(`Notre app node est démarré sur le port : ${port}`))