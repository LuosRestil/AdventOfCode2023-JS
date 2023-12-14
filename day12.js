const fs = require("fs");
const input = fs.readFileSync("inputs/day12.txt", { encoding: "utf-8" });
const lines = input.split("\n");

let total = 0;
for (let line of lines) {
  const splitLine = line.split(" ");
  const springs = splitLine[0];
  const groupings = splitLine[1].split(",").map((num) => parseInt(num));
  const perms = getPerms(springs);
  for (let perm of perms) {
    if (validate(perm, groupings)) {
      total++;
    }
  }
}
console.log("Answer 1: " + total);


function validate(springs, targetGroupings) {
  const groupings = springs
    .split(/\.+/)
    .map((group) => group.length)
    .filter((num) => num);
  return (
    groupings.length === targetGroupings.length &&
    groupings.every((val, idx) => val === targetGroupings[idx])
  );
}

function getPerms(springs) {
  if (!springs.includes("?")) return [springs];
  return getPerms(springs.replace("?", "#")).concat(
    getPerms(springs.replace("?", "."))
  );
}
