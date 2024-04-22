const express = require('express')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { connectToDb, getDb } = require('./src/db/db')
const morgan = require('morgan')
const { success } = require('./src/helper/success')
const collection = require('./src/models/userModel')
const apiRouting = require('./src/api/api')
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
        const user = await collection.findOne({ username: req.body.username })
        if (!user) {
            return res.status(400).send('Username not found')
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
        if (isPasswordMatch) {
            if (!process.env.ACCESS_TOKEN_SECRET) {
                return res.status(500).send('Access token secret is missing');
            }
            const token = jwt.sign({
                user: {
                    username: user.username,
                    id: user.id
                },
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30m" }
            )
            res.status(200).json({ token })
        } else {
            res.status(401).send('Password is not valid')
        }
    } catch (error) {
        console.error(error.message)
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