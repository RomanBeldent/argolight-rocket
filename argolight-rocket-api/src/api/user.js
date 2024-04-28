import express  from 'express'
const router = express.Router()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token invalide' });
        }
        req.user = decoded.user;
        next();
    });
};

router.get('/details', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json({
            username: user.username
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

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