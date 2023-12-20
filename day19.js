const fs = require('fs');
const input = fs.readFileSync('inputs/day19.txt', {encoding: 'utf-8'});
const lines = input.split('\n');

// {x=787,m=2655,a=1222,s=2876}
let parts = [];
let instructions = {};
let partsMode = false;
for (let line of lines) {
  if (!line) {
    partsMode = true;
    continue;
  };
  if (!partsMode) {
    const splitLine = line.split('{');
    const key = splitLine[0];
    const instructionString = splitLine[1].slice(0, splitLine[1].length - 1);
    const instructionsList = instructionString.split(',').map(instruction => {
      if (instruction.includes(':')) {
        let parts = instruction.split(':');
        return `if (${parts[0]}) return '${parts[1]}';`;
      } else {
        return `return '${instruction}';`;
      }
    });
    instructions[key] = `() => {const {x,m,a,s} = part; ${instructionsList.join(' ')}}`;
  } else {
    const nums = line.match(/(\d+)/g).map(num => parseInt(num));
    parts.push({x: nums[0], m: nums[1], a: nums[2], s: nums[3]});
  }
}
let total = 0;
for (let part of parts) {
  let instruction = 'in';
  while (instruction !== 'A' && instruction !== 'R') {
    instruction = eval(instructions[instruction]).call();
  }
  if (instruction === 'A') {
    total += Object.values(part).reduce((acc, curr) => acc + curr);
  }
}
console.log(total);

// const part = { x: 787, m: 2655, a: 1222, s: 2876 };
// const res = eval('() => {const {x,m,a,s} = part; if (s>2770) return "qs"; if (m<1801) return "hdj"; return "R";}').call();
// console.log("******************");
// console.log(res);

