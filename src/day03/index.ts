import run from "aocrunner";
import { BADHINTS } from "dns";
import _ from 'lodash'

const parseInput = (rawInput: string): string[][] => _.zip(...rawInput.split('\n').map(l => l.split(''))) as string[][]

const getBitCriteria = (bits: string[], type: string): string[] => {
  let bitCount = _.countBy(bits)
  let common = '';
  switch (type) {
    case 'oxygen':
      common = bitCount['0'] >= bitCount['1'] ? '0' : '1'
      break;
    case 'scrubber':
      common = bitCount['0'] <= bitCount['1'] ? '0' : '1'
      break;
  }

  return _.fill(Array(bitCount[common]), common);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let bits = input.map(c => _.countBy(c))
  let acc = bits.reduce((acc, cur) => {

    acc.gamma += cur['0'] > cur['1'] ? '0' : '1';
    acc.epsilon += cur['0'] < cur['1'] ? '0' : '1';
    return acc;
  }, { epsilon: '', gamma: '' })

  return parseInt(acc.gamma, 2) * parseInt(acc.epsilon, 2)
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let parsed = _.unzip(input)

  let stuffed: { [key: string]: string[][] } = { oxygen: parsed, scrubber: parsed }

  let ratings = input.reduce((numbers, __, i) => {
    ['oxygen', 'scrubber'].forEach(type => {
      let num = numbers[type];
      if (num.length === 1) return;
      let bits = _.zip(...num);
      let cur = bits.map(c => _.countBy(c))[i]
      let keep = '1'
      if (type == 'oxygen') {
        if (cur['0'] > cur['1']) {
          keep = '0'
        }
      } else {
        if (cur['0'] <= cur['1']) {
          keep = '0'
        }
      }

      numbers[type] = num.filter(arr => arr[i] === keep)
    })

    return numbers
  }, stuffed);

  let oxygen = _.flattenDeep(ratings.oxygen).join('')
  let scrubber = _.flattenDeep(ratings.scrubber).join('')


  return parseInt(oxygen, 2) * parseInt(scrubber, 2)
};

let input: string = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 198,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
