import { NQueensSolver } from '../solvers/NQueensSolver/NQueensSolver';

export class NQueensMiddleware {
  solver: NQueensSolver;
  constructor() {
    this.solver = new NQueensSolver();
  }

  solve(req: any, res: any): void {
    try {
      const n = req.body.n;
      const solution = this.solver.solve(n);
      res.json(solution);
    } catch(error) {
      res.sendStatus(500);
    }
  }
}