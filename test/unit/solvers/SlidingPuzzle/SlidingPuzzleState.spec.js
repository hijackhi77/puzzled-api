import { expect } from 'chai';
import { describe, it } from 'mocha';
import { SlidingPuzzleState } from '../../../../dist/solvers/SlidingPuzzleSolver/SlidingPuzzleState';

describe('Sliding Puzzle State', () => {
  it('should return the position of the white tile', () => {
    const puzzle = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
    const state = new SlidingPuzzleState(puzzle, null);
    const whileTilePosn = state.getWhiteTile();
    // Use .deep.equal or .eql to compare two objects
    expect(whileTilePosn).to.deep.equal({ row: 2, col: 2 });
  });
  
  it('should return 2 successors', () => {
    const puzzle = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
    const state = new SlidingPuzzleState(puzzle, null);
    const successors = state.getSuccessors();

    const expectedSuccessors = [
        new SlidingPuzzleState([[1, 2, 3], [4, 5, 6], [7, 0, 8]], state), // left
        new SlidingPuzzleState([[1, 2, 3], [4, 5, 0], [7, 8, 6]], state)  // up
    ];
    expect(successors).to.be.an('array');
    expect(successors.length).to.equal(2);
    // Use .have.same.members for unordered comparison
    expect(successors).to.deep.have.same.members(expectedSuccessors);
  });

  it('should return 4 successors', () => {
    const puzzle = [[1, 2, 3], [4, 0, 5], [6, 7, 8]];
    const state = new SlidingPuzzleState(puzzle, null);
    const successors = state.getSuccessors();

    const expectedSuccessors = [
        new SlidingPuzzleState([[1, 2, 3], [0, 4, 5], [6, 7, 8]], state), // left
        new SlidingPuzzleState([[1, 2, 3], [4, 5, 0], [6, 7, 8]], state), // right
        new SlidingPuzzleState([[1, 0, 3], [4, 2, 5], [6, 7, 8]], state), // up
        new SlidingPuzzleState([[1, 2, 3], [4, 7, 5], [6, 0, 8]], state)  // down
    ];
    expect(successors).to.be.an('array');
    expect(successors.length).to.equal(4);
    expect(successors).to.deep.have.same.members(expectedSuccessors);
  });
});