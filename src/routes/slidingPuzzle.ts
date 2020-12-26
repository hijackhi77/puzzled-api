import express from 'express';
import { runPy } from '../middleware/runPy';
export const router = express.Router();

router.get('/', (req, res) => {
  res.send('Sliding Puzzle');
});

router.post('/solve', [runPy]);
