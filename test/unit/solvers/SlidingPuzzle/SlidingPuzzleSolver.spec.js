import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { SlidingPuzzleSolver } from '../../../../dist/solvers/SlidingPuzzleSolver/SlidingPuzzleSolver';

describe('Sliding Puzzle', () => {
  describe('Sliding Puzzle Solver', () => {
    const goalPuzzle = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];

    let solver;
    beforeEach(() => {
      solver = new SlidingPuzzleSolver();
    });

    it('should do noting if a solution is passed in', () => {
      const solution = solver.solve(goalPuzzle);
      expect(solution).to.be.an('array');
      expect(solution.length).to.equal(1);
      expect(solution).to.deep.equal([goalPuzzle]);
    });

    it('should return null if the puzzle is not solveable', () => {
      const initPuzzle = [[1, 2, 0], [4, 5, 6], [7, 8, 3]];
      const solution = solver.solve(initPuzzle);
      expect(solution).to.be.null;
    });

    it('should solve the easy one step problem', () => {
      const initPuzzle = [[1, 2, 3], [4, 5, 6], [7, 0, 8]];
      const solution = solver.solve(initPuzzle);
      expect(solution).to.be.an('array');
      expect(solution.length).to.equal(2);
      expect(solution).to.deep.equal([initPuzzle, goalPuzzle]);
    });
  });
});