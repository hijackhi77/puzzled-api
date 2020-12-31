import { deepcopy } from '../../utils';

export class SlidingPuzzleState {
  puzzle: number[][];
  parent: SlidingPuzzleState | null;
  cost: number;
  size: number;
  whiteTile: any;
  constructor(array: number[][], parent: SlidingPuzzleState | null) {
    this.puzzle = array;
    this.parent = parent;
    this.cost = parent ? parent.cost + 1 : 0;
    this.size = array.length;
    // Init the white tile position
    for (let i=0; i<array.length; ++i) {
      for (let j=0; j<array[i].length; ++j) {
        if (array[i][j] === 0) {
          this.whiteTile = { row: i, col: j };
          break;
        }
      }
    }
  }

  getWhiteTile() {
    return this.whiteTile;
  }

  private swapTile(pos1, pos2) {
    const swapped: number[][] = deepcopy(this.puzzle);
    const temp: number = swapped[pos1.row][pos1.col];
    swapped[pos1.row][pos1.col] = swapped[pos2.row][pos2.col];
    swapped[pos2.row][pos2.col] = temp;
    return swapped;
  }

  getSuccessors() {
    const successors: SlidingPuzzleState[] = [];
    const { row, col } = this.whiteTile;
    const posns = [{row: row-1, col}, {row: row+1, col}, {row, col: col-1}, {row, col: col+1}];
    posns.map((posn) => {
      const {row: r, col: c} = posn;
      if (0<=r && r<this.size && 0<=c && c<this.size) {
        successors.push(new SlidingPuzzleState(this.swapTile(posn, this.whiteTile), this));
      }
    }, this); // Second param for reserving this context
    return successors;
  }

  isGoalState(): boolean {
    const maxIndex = this.size*this.size;
    for (let i=0; i<this.size; ++i) {
      for (let j=0; j<this.size; ++j) {
        const expected = i * this.size + j + 1;
        if (expected === maxIndex) return this.puzzle[i][j] === 0;
        if (this.puzzle[i][j] !== expected) return false;
      }
    }
    return true;
  }

  getNumMisplaced(): number {
    let numMisplaced = 0;
    const maxIndex = this.size*this.size;
    for (let i=0; i<this.size; ++i) {
      for (let j=0; j<this.size; ++j) {
        const expected = i * this.size + j + 1;
        if (expected === maxIndex && this.puzzle[i][j] !== 0) numMisplaced += 1;
        if (this.puzzle[i][j] !== expected) numMisplaced += 1;
      }
    }
    return numMisplaced;
  }

  toString(): string {
    let result = '';
    for (let i=0; i<this.size; ++i) {
      for (let j=0; j<this.size; ++j) {
        result += this.puzzle[i][j];
        if (i*this.size+j === this.size*this.size) break;
        result += ',';
      }
    }
    return result;
  }
}
