const express = require('express')
const router = express.Router()
const { getDb } = require('./src/db/db')
const { success } = require('./src/helper/success')
const { ObjectId } = require('mongodb')

router.get('/rockets', async (req, res) => {
    let db = await getDb()
    let rockets = []

    db.collection('rockets')
        .find()
        // .sort()
        .forEach(rocket => rockets.push(rocket))
        .then(() => {
            const message = `There is currently ${rockets.length} rockets in the list`
            res.status(200).json(success(message, rockets))
        })
        .catch((err) => {
            res.status(500).json({ error: 'Could not fetch the rockets', message: err })
        })
})

router.get('/rockets/:id', async (req, res) => {
    let db = await getDb()
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
                console.log(err)
                res.status(500).json({ error: 'The ID you\'re looking for does not match an existing rocket ID', message: err })
            })
    } else {
        res.status(500).json({ error: 'Not a valid document ID' })
    }
})

router.post('/rockets', async (req, res) => {
    let db = await getDb()
    const rocket = req.body
    const message = `The rocket ${req.body.name} has been added`

    db.collection('rockets')
        .insertOne(rocket)
        .then(rocket => {
            res.status(201).json(success(message, rocket))
        })
        .catch(err => {
            res.status(500).json({ err: 'Could not create a new rocket', message: err })
        })
})

router.delete('/rockets/:id', async (req, res) => {
    let db = await getDb()
    const message = `The rocket has been properly deleted`

    if (ObjectId.isValid(req.params.id)) {
        db.collection('rockets')
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then(rocket => {
                res.status(200).json(success(message, rocket))
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not fetch the rocket', message: err })
            })
    } else {
        res.status(500).json({ error: 'Not a valid rocket ID' })
    }
})

router.patch('/rockets/:id', async (req, res) => {
    let db = await getDb()
    const updates = req.body
    const message = `The rocket has been properly updated`

    if (ObjectId.isValid(req.params.id)) {
        db.collection('rockets')
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
            .then(rocket => {
                res.status(200).json(success(message, rocket))
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the rocket', message: err })
            })
    } else {
        res.status(500).json({ error: 'Not a valid rocket ID' })
    }
})

module.exports = router