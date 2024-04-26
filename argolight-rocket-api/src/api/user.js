import express  from 'express'
const router = express.Router()
import success from '../helper/success.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import collection from '../models/userModel.js'

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists. Please choose a different username.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.validate();

        await newUser.save();

        const message = 'User created successfully';
        res.status(201).json({ message, data: { username: newUser.username } });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username })
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