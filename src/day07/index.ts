import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string) => rawInput.split(',').map(c => parseInt(c)).sort((a, b) => a - b);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  // it SHOULD be somewhere around the midpoint
  let start = (input.length / 2) - 1
  let candidates = input.slice(start, start + 2)

  // we now have the 2 midpoints, assume it's one of those 2.  test each one.
  let options = candidates.map(candidate => input.reduce((acc, cur) => Math.abs(cur - candidate) + acc, 0))

  return _.min(options);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  // it SHOULD be somewhere around the mean now
  // get mean
  let mean = _.sum(input) / input.length | 0;
  // console.log('mean of input', input, mean)

  // start with 20% of the max number LESS than the mean and go to 10% of the mean more
  let max = input[input.length - 1] * .2 | 0
  // console.log('max', max)
  let candidates = _.range(Math.max(mean - max, 0), Math.min(mean + max + 1, input.length)) // + 1 for inclusive end range
  // console.log('candidates are', candidates)

  // we now have the 2 midpoints, assume it's one of those 2.  test each one.
  let options = candidates.map(candidate => input.reduce((acc, cur) => {
    let diff = Math.abs(cur - candidate);
    let sum = (diff / 2) * (2 + (diff - 1)) // formula slightly simplified: https://www.cuemath.com/sum-of-arithmetic-sequence-formula/
    return sum + acc;
  }, 0))

  // console.log('options are', options)

  return _.min(options);
};

let input: string = `16,1,2,0,4,2,7,1,2,14`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 37,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 168,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
