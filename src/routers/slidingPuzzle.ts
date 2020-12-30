import express from 'express';
import { SlidingPuzzleMiddleware } from '../middleware/slidingPuzzle';
export const router = express.Router();

router.get('/', (req, res) => {
  res.send('Sliding Puzzle');
});

const slidingPuzzleMiddleware = new SlidingPuzzleMiddleware();
router.post('/solve', (req, res) => { slidingPuzzleMiddleware.solve(req, res); });
