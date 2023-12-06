// sample
// const raceRecords = [
//   {time: 7, distance: 9},
//   {time: 15, distance: 40},
//   {time: 30, distance: 200},
// ];

// actual
const raceRecords = [
  {time: 53, distance: 275},
  {time: 71, distance: 1181},
  {time: 78, distance: 1215},
  {time: 80, distance: 1524},
];

let total = 1;
for (let raceRecord of raceRecords) {
  let waysToWin = 0;
  for (let i = 1; i < raceRecord.time; i++) {
    const dist = i * (raceRecord.time - i);
    if (dist > raceRecord.distance) {
      waysToWin++;
    }
  }
  total *= waysToWin;
}
console.log('Answer 1: ' + total);

// sample
// const time = 71530;
// const distanceRecord = 940200;

// actual
const time = 53717880;
const distanceRecord = 275118112151524;

let waysToWin = 0;
for (let i = 1; i < time; i++) {
  const dist = i * (time - i);
  if (dist > distanceRecord) {
    waysToWin++;
  }
}
console.log('Answer 2: ' + waysToWin);