import { deepcopy } from '../../utils';

export class NQueensSolver {
  solve(n: number): any[] {
    const result: number[][][] = [];
    const puzzle: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));

    const isUnderAttack = (row: number, col: number): boolean => {
      if (puzzle[row][col] === 1) return true;
      for (let i=0; i<n; ++i){
        if (i !== row && puzzle[row][i] === 1) return true;
        if (i !== row && puzzle[i][col] === 1) return true;
        if (i !== 0) {
          const offsets = [-i, i];
          for (const j of offsets) {
            for (const k of offsets) {
              if (0 <= row+j && row+j < n && 0 <= col+k && col+k < n) {
                if (puzzle[row+j][col+k] === 1) return true;
              }
            }
          }
        }
      }
      return false;
    };

    const placeQueen = (row: number, col:number): void => {
      puzzle[row][col] = 1;
    };

    const removeQueen = (row: number, col:number): void => {
      puzzle[row][col] = 0;
    };

    const backTrack = (row: number): void => {
      for (let col=0; col<n; ++col) {
        if (!isUnderAttack(row, col)) {
          placeQueen(row, col);
          if (row+1 === n) {
            result.push(deepcopy(puzzle));
          } else {
            backTrack(row + 1);
          }
          removeQueen(row, col);
        }
      }
    };
    
    backTrack(0);
    return result;
  }
}