import { SlidingPuzzleSolver } from '../solvers/SlidingPuzzleSolver/SlidingPuzzleSolver';

export class SlidingPuzzleMiddleware {
  solver: SlidingPuzzleSolver;
  constructor() {
    this.solver = new SlidingPuzzleSolver();
  }

  solve(req: any, res: any): void {
    try {
      const puzzle = req.body.puzzle;
      const solution = this.solver.solve(puzzle);
      res.json(solution);
    } catch(error) {
      res.sendStatus(500);
    }
  }
}