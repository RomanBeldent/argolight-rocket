const express = require('express')
const bcrypt = require('bcrypt')
const { connectToDb, getDb } = require('./src/db/db')
const morgan = require('morgan')
const { success } = require('./src/helper/success')
const collection = require('./src/models/userModel')
const apiRouting = require('./src/api/api')

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
app.post('/user/signup', async (req, res) => {
    const message = 'User created successfully'
    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const existingUser = await collection.findOne({ username: data.username })
    if (existingUser) {
        return res.status(400).send('User already exists. Please choose a different username.')
    } else {
        const hashedPassword = await bcrypt.hash(data.password, 10)
        data.password = hashedPassword
        const userdata = await collection.insertMany(data)
        console.log(userdata)
        res.status(201).json(success(message, data))
    }
})

app.post('/user/signin', async (req, res) => {
    try {
        const check = await collection.findOne({ username: req.body.username })
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

//api routes
app.use('/', apiRouting)
// 404 route error handling
app.get('*', (req, res) => {
    res.status(404).json({ error: 'This route does not exist in this world, but maybe in another universe !' })
})

module.exports = app