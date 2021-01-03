import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { NQueensSolver } from '../../../../dist/solvers/NQueensSolver/NQueensSolver';

describe('N Queens', () => {
  let solver;
  beforeEach(() => {
    solver = new NQueensSolver();
  });

  it('should return no solution for n=0', () => {
    const solution = solver.solve(0);
    expect(solution).to.be.an('array');
    expect(solution.length).to.equal(0);
  });
  it('should return no solution for n=3', () => {
    const solution = solver.solve(3);
    expect(solution).to.be.an('array');
    expect(solution.length).to.equal(0);
  });
  it('should return 2 solutions for n=4', () => {
    const solution = solver.solve(4);
    expect(solution).to.be.an('array');
    expect(solution.length).to.equal(2);
    expect(solution).to.deep.equal([
      [
        [0,1,0,0],
        [0,0,0,1],
        [1,0,0,0],
        [0,0,1,0]],
      [
        [0,0,1,0],
        [1,0,0,0],
        [0,0,0,1],
        [0,1,0,0]
      ]
    ]);
  });
});