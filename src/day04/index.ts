import run from "aocrunner";
import _ from "lodash";
import util from 'util'

const parseInput = (rawInput: string) => {
  let lines: string[] = rawInput.split('\n');
  return {
    rng: lines[0].split(',').map(v => parseInt(v)),
    boards: rawInput.split('\n\n').slice(1).map(card => card.split('\n').map(row => row.trim().split(/\s+/).map(v => parseInt(v))))
  }
}

const markBoard = (board: number[][], drawn: number) => {
  board.forEach((row, i) => row.forEach((col, j) => {
    if (col === drawn) {
      board[i][j] = -1
    }
  }))

}

const checkSolution = (board: number[][]) => {
  // let rows = board.length;
  // funcs so we only run them if we have to
  let rowSolution = () => board.some(row => row.every(col => col === -1))
  let columnSolution = () => _.zip(...board).some(row => row.every(col => col === -1))
  // let leftDiagonalSolution = () => _.range(0, rows).every(i => board[i][i] === -1)
  // let rightDiagonalSolution = () => _.range(0, rows).every(i => board[i][rows - i - 1] === -1)
  return rowSolution() || columnSolution() /*|| leftDiagonalSolution() || rightDiagonalSolution() */
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let boards = input.boards;
  let winningBoard: { board: number[][], hasSolution: boolean } | undefined;
  let drawn = -1;
  // console.log(boards)
  while (!winningBoard) {
    drawn = input.rng.shift() as number
    // console.log('drew number', drawn)
    // mark off each board with the drawn number
    // then check if there is a winning state
    boards.forEach(board => markBoard(board, drawn));

    // now check for a solution
    let winningBoards = boards.map(board => ({ board, hasSolution: checkSolution(board) }))
    winningBoard = winningBoards.find(board => board.hasSolution);
  }

  console.log('found a winning board', winningBoard)

  let boardSum = _.sum(winningBoard.board.map(row => _.sum(row.filter(col => col != -1))));
  console.log('boardsum', boardSum, 'drawn', drawn)

  return boardSum * drawn
};

const part2 = (rawInput: string) => {
  // same as before, but find the LAST winning board
  const input = parseInput(rawInput);
  let boards = input.boards;
  let drawn = -1;
  // console.log(boards)
  // keep going until we only have one board AND it finally gets a bingo
  let losingBoard: number[][] | undefined;
  while (boards.length > 0) {
    drawn = input.rng.shift() as number
    // console.log('drew number', drawn)
    // mark off each board with the drawn number
    // then check if there is a winning state 
    boards.forEach(board => markBoard(board, drawn));

    // now check for a solution
    boards = boards.filter(board => !checkSolution(board))
    if (boards.length == 1) {
      losingBoard = boards[0]
    }
  }

  console.log('only one board left', losingBoard)

  let boardSum = _.sum(losingBoard.map(row => _.sum(row.filter(col => col != -1))));
  console.log('boardsum', boardSum, 'drawn', drawn)

  return boardSum * drawn
};

let input: string = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 4512,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 1924,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
