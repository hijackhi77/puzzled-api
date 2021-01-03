import express from 'express';
import { NQueensMiddleware } from '../middleware/nQueens';
export const router = express.Router();

router.get('/', (req, res) => {
  res.send('N Queens');
});

const nQueensMiddleware = new NQueensMiddleware();
router.post('/solve', (req, res) => { nQueensMiddleware.solve(req, res); });
