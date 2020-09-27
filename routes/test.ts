import express from 'express';
import { sign } from '../lib/utils';
import { runPy } from '../middleware/runPy';

export const router = express.Router();

router.get('/', (req, res) => {
  res.send('test');
});

router.get('/sign', (req, res) => {
  res.status(200).send(sign(req.body, 'secret'));
});

router.get('/validate-sign', (req, res) => {
  res.status(200).send({ isValid: sign(req.body, 'secret') == req.body.sign });
});

router.post('/run-python', runPy);
