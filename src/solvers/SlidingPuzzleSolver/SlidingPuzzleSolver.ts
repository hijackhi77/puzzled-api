import { SlidingPuzzleState } from './SlidingPuzzleState';

export class SlidingPuzzleSolver {
  /**
   * Return the f value of state (= heuristic + cost)
   * @param state state to be evaluated
   */
  private getF(state: SlidingPuzzleState): number {
    return state.getNumMisplaced() + state.cost;
  }

  /**
   * Perform DFS on the given initial state, return the steps if a goal state
   * is found, otherwise return null
   * @param state initial state
   */
  private dfs(state: SlidingPuzzleState) {
    const frontier: SlidingPuzzleState[] = [state];
    const expanded: Set<string> = new Set();
    const steps: number[][][] = [];

    while (frontier.length > 0) {
      const currState = frontier.pop();
      if (!currState) return null;
      if (currState.isGoalState()) {
        steps.push(currState.puzzle);
        return steps;
      }
      const successors = currState.getSuccessors();
      steps.push(currState.puzzle);
      for (const successor of successors) {
        if (!expanded.has(String(successor))) {
          frontier.push(successor);
          expanded.add(String(successor));
        }
      }
    }
    return null;
  }

  solve(array: number[][]): number[][][] | null {
    const initState = new SlidingPuzzleState(array, null);
    const result = this.dfs(initState);
    return result;
  }
}