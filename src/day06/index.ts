import run from "aocrunner";
import _ from 'lodash'

const parseInput = (rawInput: string) => rawInput.split(',').map(f => parseInt(f));

const incrementDay = (ages: number[]) => {
  // console.log('current fish', fishes)

  let reproducingFish = ages.shift() as number;
  ages.push(reproducingFish)
  ages[6] += reproducingFish
  // console.log('after day, fish are:', ages)
}

const part1 = (rawInput: string) => {
  let input = parseInput(rawInput);
  let ages: number[] = new Array(9).fill(0);
  input.forEach(f => ages[f]++)
  for (let i = 0; i < 80; i++) {
    incrementDay(ages)
  }

  return _.sum(ages)
};

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput);
  let ages: number[] = new Array(9).fill(0);
  input.forEach(f => ages[f]++)
  for (let i = 0; i < 256; i++) {
    incrementDay(ages)
  }

  return _.sum(ages)
};

let input: string = `3,4,3,1,2`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 5934,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 26984457539,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
