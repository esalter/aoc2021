import run from "aocrunner";
import _ from 'lodash'

const parseInput = (rawInput: string, diagonals = false) => rawInput.split('\n').map(l =>
  l.split(' -> ').map(p => p.split(',').map(xy => parseInt(xy)))
).filter(segment => {
  if (diagonals) return true;
  let start = segment[0];
  let end = segment[1];
  return start[0] === end[0] || start[1] == end[1]
});

const drawLine = (grid: number[][], line: number[][]) => {
  let startPoint = line[0]
  let endPoint = line[1]
  if (startPoint[0] === endPoint[0]) {
    // same x coordinate, so vertical line
    // check whether we need to start from the top (start < end) or the bottom (start > end)
    let start = startPoint[1] < endPoint[1] ? startPoint[1] : endPoint[1]
    let end = startPoint[1] < endPoint[1] ? endPoint[1] : startPoint[1]
    // console.log('start/end points', startPoint, endPoint)
    // console.log('start/end', start, end)
    for (let i = start; i <= end; i++) {
      grid[startPoint[0]][i]++
    }
  } else if (startPoint[1] === endPoint[1]) {
    // same y coordinate, so horizontal line
    // check whether we need to start from the left (start < end) or the right (start > end)
    let start = startPoint[0] < endPoint[0] ? startPoint[0] : endPoint[0]
    let end = startPoint[0] < endPoint[0] ? endPoint[0] : startPoint[0]
    // console.log('start/end points', startPoint, endPoint)
    // console.log('start/end', start, end)
    for (let i = start; i <= end; i++) {
      grid[i][startPoint[1]]++
    }
  } else {
    let xDirection = Math.sign(endPoint[0] - startPoint[0])
    let yDirection = Math.sign(endPoint[1] - startPoint[1])
    let x = startPoint[0];
    let y = startPoint[1];
    for (let i = 0; i < Math.abs(endPoint[0] - startPoint[0]) + 1; i++) {
      grid[x][y]++
      x += xDirection
      y += yDirection
    }

  }
  return grid
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // get the largest x and y. That will form the initial grid size
  let gridSize = input.reduce((acc, segment) => {
    let maxX = _.max(segment.map(point => point[0])) as number
    let maxY = _.max(segment.map(point => point[1])) as number
    if (maxX > acc.x) {
      acc.x = maxX
    } if (maxY > acc.y) {
      acc.y = maxY
    }
    return acc
  }, { x: 0, y: 0 });

  // fill grid with 0's
  let grid: number[][] = new Array(gridSize.x + 1)
  for (let i = 0; i <= gridSize.x; i++) {
    grid[i] = new Array(gridSize.y + 1)
    for (let j = 0; j <= gridSize.y; j++) {
      grid[i][j] = 0
    }
  }

  grid = input.reduce((grid, segment) => drawLine(grid, segment), grid)

  // count how many points have > 1
  return grid.reduce((sum, row) => sum + row.filter(c => c > 1).length, 0)
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput, true);
  // get the largest x and y. That will form the initial grid size
  let gridSize = input.reduce((acc, segment) => {
    let maxX = _.max(segment.map(point => point[0])) as number
    let maxY = _.max(segment.map(point => point[1])) as number
    if (maxX > acc.x) {
      acc.x = maxX
    } if (maxY > acc.y) {
      acc.y = maxY
    }
    return acc
  }, { x: 0, y: 0 });

  // fill grid with 0's
  let grid: number[][] = new Array(gridSize.x + 1)
  for (let i = 0; i <= gridSize.x; i++) {
    grid[i] = new Array(gridSize.y + 1)
    for (let j = 0; j <= gridSize.y; j++) {
      grid[i][j] = 0
    }
  }

  grid = input.reduce((grid, segment) => drawLine(grid, segment), grid)

  // count how many points have > 1
  return grid.reduce((sum, row) => sum + row.filter(c => c > 1).length, 0)
};

let input: string = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
