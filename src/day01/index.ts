import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

let input: string = `199
200
208
210
200
207
240
269
260
263`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 7,
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
