import run from "aocrunner";
import _ from 'lodash'

const parseInput = (rawInput: string) => rawInput.split('\n').map(v => parseInt(v));

const part1 = (rawInput: string) => {
  // count the number of times a depth measurement increases from the previous measurement
  // measurement 0 is n/a
  // How many measurements are larger than the previous measurement?
  const input = parseInput(rawInput);

  return input.reduce((sum: number, value: number, i: number, measurements: Array<number>) => {
    if (i === 0) return 0;

    return measurements[i - 1] < value ? sum + 1 : sum;
  }, 0)
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  console.log(input)

  // group by 3's in a sliding window
  let chunked: number[] = _.compact(input.map((value: number, i: number): number[] | null => {
    let slice = input.slice(i, i + 3);
    return slice.length < 3 ? null : slice;
  })).map(g => _.sum(g));

  // now run the reducer as before
  return chunked.reduce((sum: number, value: number, i: number, measurements: Array<number>) => {
    if (i === 0) return 0;

    return measurements[i - 1] < value ? sum + 1 : sum;
  }, 0)
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
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
