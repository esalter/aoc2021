import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input)

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input)

  return;
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
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: true,
});
