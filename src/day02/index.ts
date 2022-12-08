import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n').map(l => l.split(' '));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let position = input.reduce((acc, cur) => {
    let val = parseInt(cur[1]);
    switch (cur[0]) {
      case 'forward':
        acc.horizontal += val
        break;
      case 'up':
        acc.depth -= val
        break;
      case 'down':
        acc.depth += val
        break;
    }
    return acc
  }, { horizontal: 0, depth: 0 });

  return position.horizontal * position.depth
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let position = input.reduce((acc, cur) => {
    let val = parseInt(cur[1]);
    switch (cur[0]) {
      case 'forward':
        acc.horizontal += val
        acc.depth += acc.aim * val
        break;
      case 'up':
        acc.aim -= val
        break;
      case 'down':
        acc.aim += val
        break;
    }
    return acc
  }, { horizontal: 0, depth: 0, aim: 0 });

  return position.horizontal * position.depth
};

let input: string = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 150,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 900,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
