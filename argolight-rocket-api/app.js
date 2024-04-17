const express = require('express')
const bcrypt = require('bcrypt')
const { connectToDb, getDb } = require('./src/db/db')
const morgan = require('morgan')
const { success } = require('./src/helper/success')
const { ObjectId } = require('mongodb')
const collection = require('./src/db/auth')

// init app & middleware
const app = express()
const port = 3000

app
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))

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
app.post('/signup', async (req, res) => {
    const message = 'User created successfully'
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    const existingUser = await collection.findOne({ name: data.name })
    if (existingUser) {
        return res.status(400).send('User already exists. Please choose a different username.')
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds)
        data.password = hashedPassword
        const userdata = await collection.insertMany(data)
        console.log(userdata)
        res.status(201).json(success(message, data))
    }
})

app.post('/signin', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name })
        if (!check) {
            return res.status(400).send('Username not found')
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
        if (isPasswordMatch) {
            return res.status(200).send('Welcome to SpaceX')
        } else {
            return res.send('Wrong password')
        }
    } catch (error) {
        return res.status(500).send('Internal server error')
    }
})

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

app.patch('/api/rockets/:id', (req, res) => {
    const updates = req.body
    const message = `The rocket has been properly updated`

    if (ObjectId.isValid(req.params.id)) {
        db.collection('rockets')
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
            .then(rocket => {
                res.status(200).json(success(message, rocket))
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the rocket' })
            })
    } else {
        res.status(500).json({ error: 'Not a valid rocket ID' })
    }
})

// 404 route error handling
app.get('*', (req, res) => {
    res.status(404).json({ error: 'This route does not exist in this world, but maybe in another universe !' })
})