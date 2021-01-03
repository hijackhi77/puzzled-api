import express from 'express';
export const router = express.Router();

import { router as slidingPuzzleRouter } from './slidingPuzzle';
router.use('/sliding-puzzle', slidingPuzzleRouter);

import { router as nQueensRouter } from './nQueens';
router.use('/n-queens', nQueensRouter);

import { router as huarongDaoRouter } from './huarongDao';
router.use('/huarong-dao', huarongDaoRouter);

import { router as testRouter } from './test';
router.use('/test', testRouter);
