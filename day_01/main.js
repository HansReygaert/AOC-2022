"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var input = (0, fs_1.readFileSync)('input.txt', 'utf-8').split('\n');
var scoreboard = [];
function main() {
    console.log("----- Advent of code - Day 01 -----");
    var currentCalories = 0;
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var line = input_1[_i];
        if (line !== '') {
            currentCalories += Number.parseInt(line);
            continue;
        }
        scoreboard.push(currentCalories);
        currentCalories = 0;
    }
    scoreboard.sort(function (a, b) { return a > b ? -1 : 1; });
    console.log("part 1: ".concat(scoreboard[0]));
    console.log("part 2: ".concat(scoreboard[0] + scoreboard[1] + scoreboard[2]));
}
main();
