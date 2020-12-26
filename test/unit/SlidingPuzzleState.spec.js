// const { expect } = require('chai');
// const { describe, it } = require('mocha');
// const { SlidingPuzzleState } = require('../../src/solvers/SlidingPuzzleSolver/SlidingPuzzleState.ts');
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { SlidingPuzzleState } from '../../dist/solvers/SlidingPuzzleSolver/SlidingPuzzleState';

describe('Sliding Puzzle State', () => {
  it('should return the position of the white tile', () => {
    const array = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
    const state = new SlidingPuzzleState(array, null);
    const whileTilePos = state.getWhiteTile();
    expect(whileTilePos).to.equal({ row: 2, col: 2 });
  });
  
//   it('should return all the successors', () => {

//   });
});