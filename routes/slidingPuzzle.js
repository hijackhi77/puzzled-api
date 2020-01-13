const express = require('express')
const router = express.Router()
const { runPy } = require('../middleware/runPy')

router.get('/', (req, res, next) => {
    res.send('Sliding Puzzle')
})

router.get('/solve', [runPy])

module.exports = router
