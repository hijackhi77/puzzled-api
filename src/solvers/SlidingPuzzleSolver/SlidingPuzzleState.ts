export class SlidingPuzzleState {
  parent: any;
    whiteTile: any;
    state: [];
    constructor(array: [], parent: SlidingPuzzleState) {
      this.parent = parent;
      this.state = array;
      for (let i=0; i<array.length; ++i) {
        // for (let j=0; j<array[i].length; ++j) {
        //   if (array[i][j] === 0) this.whiteTile = { row: i, col: j};
        //   return;
        // }
      }
    }

    getWhiteTile() {
      return this.whiteTile;
    }

    getSuccessors() {
    //   const successors = [];
    //   successors;
    }

    isGoalState() {

    }

}