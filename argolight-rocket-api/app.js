import express  from 'express'
import dotenv from 'dotenv';
import { connectToDb, getDb } from './src/db/db.js'
import morgan  from 'morgan'
import apiRouting  from './src/api/api.js'
import userRouting  from './src/api/user.js'
import cors  from 'cors'

// init app & middleware
dotenv.config();
const app = express()
const port = process.env.PORT

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
app.use('/', apiRouting)
app.use('/user', userRouting)
app.get('*', (req, res) => {
    res.status(404).json({ error: 'This route does not exist in this world, but maybe in another universe !' })
})

export default app;