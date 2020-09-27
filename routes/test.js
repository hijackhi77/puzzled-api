const express = require('express');
const router = express.Router();
const { sign } = require('../lib/utils');
const { runPy } = require('../middleware/runPy');

router.get('/', (req, res, next) => {
  res.send('test');
});

router.get('/sign', (req, res, next) => {
  res.status(200).send(sign(req.body, 'secret'));
});

router.get('/validate-sign', (req, res, next) => {
  res.status(200).send({ isValid: sign(req.body, 'secret') == req.body.sign });
});

router.post('/run-python', runPy);

module.exports = router;
