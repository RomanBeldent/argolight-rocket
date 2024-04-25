import express  from 'express'
const router = express.Router()
import success from '../helper/success.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import collection from '../models/userModel.js'

router.post('/signup', async (req, res) => {
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

router.post('/signin', async (req, res) => {
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

export default router