const express = require('express')
const { connectToDb, getDb } = require('./src/db/db')
const morgan = require('morgan')
const { success } = require('./src/helper/success')
const { ObjectId } = require('mongodb')

// init app & middleware
const app = express()
const port = 3000

app
    .use(morgan('dev'))
    .use(express.json())

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
    let rockets = []

    db.collection('rockets')
        .find()
        // .sort()
        .forEach(rocket => rockets.push(rocket))
        .then(() => {
            const message = `There is currently ${rockets.length} rockets in the list`
            res.status(200).json(success(message, rockets))
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the rockets' })
        })
})

app.get('/api/rockets/:id', (req, res) => {
    const message = 'A rocket has been found'

    if (ObjectId.isValid(req.params.id)) {
        db.collection('rockets')
            .findOne({ _id: new ObjectId(req.params.id) })
            .then((rocket) => {
                if (!rocket) {
                    throw new Error('Not Found')
                } else {
                    res.status(200).json(success(message, rocket))
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'The ID you\'re looking for does not match an existing rocket ID' })
            })
    } else {
        res.status(500).json({ error: 'Not a valid document ID' })
    }
})

app.post('/api/rockets', (req, res) => {
    const rocket = req.body
    const message = `The rocket ${req.body.name} has been added`

    db.collection('rockets')
        .insertOne(rocket)
        .then(rocket => {
            res.status(201).json(success(message, rocket))
        })
        .catch(err => {
            res.status(500).json({ err: 'Could not create a new rocket' })
        })
})

app.delete('/api/rockets/:id', (req, res) => {
    const message = `The rocket has been properly deleted`

    if (ObjectId.isValid(req.params.id)) {
        db.collection('rockets')
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then(rocket => {
                res.status(200).json(success(message, rocket))
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not fetch the rocket' })
            })
    } else {
        res.status(500).json({ error: 'Not a valid rocket ID' })
    }
})

// 404 route error handling
app.get('*', (req, res) => {
    res.status(404).json({ error: 'This route does not exist in this world, but maybe in another universe !' })
})