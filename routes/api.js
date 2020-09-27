const routes = require('express').Router();

const slidingPuzzle = require('./slidingPuzzle');
routes.use('/sliding-puzzle', slidingPuzzle);

const huarongDao = require('./huarongDao');
routes.use('/huarong-dao', huarongDao);

const test = require('./test');
routes.use('/test', test);

module.exports = routes;
