"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var input = (0, fs_1.readFileSync)('input.txt', 'utf-8').split('\n');
var scoreboard = [];
var highscore = 0;
var decisionMatrix = [
    ["DRAW", "WIN", "LOSS"],
    ["LOSS", "DRAW", "WIN"],
    ["WIN", "LOSS", "DRAW"], // THEY PLAY -> SCISSORS
];
function reset() {
    scoreboard = [];
    highscore = 0;
}
function main() {
    console.log("----- Advent of code - Day 02 -----");
    console.log('----- Part one -----');
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var line = input_1[_i];
        var opponent = convertOpponentKeyToValue(line.charAt(0));
        var ourPlay = convertOurPlayKeyToValue(line.charAt(2));
        var outcome = getOutcomeFromOurPlay(getOutcomeOptions(opponent), ourPlay);
        var outcomeScore = convertOutcomeToScore(outcome);
        scoreboard.push(convertOurPlayToScore(ourPlay) + outcomeScore);
    }
    for (var _a = 0, scoreboard_1 = scoreboard; _a < scoreboard_1.length; _a++) {
        var score = scoreboard_1[_a];
        highscore += score;
    }
    console.log(highscore);
    reset();
    console.log('----- Part two -----');
    for (var _b = 0, input_2 = input; _b < input_2.length; _b++) {
        var line = input_2[_b];
        var opponent = convertOpponentKeyToValue(line.charAt(0));
        var outcome = convertOutcomeKeyToValue(line.charAt(2));
        var ourPlay = getWhatToPlayFromOutcome(getOutcomeOptions(opponent), outcome);
        scoreboard.push(convertOurPlayToScore(ourPlay) + convertOutcomeToScore(outcome));
    }
    for (var _c = 0, scoreboard_2 = scoreboard; _c < scoreboard_2.length; _c++) {
        var score = scoreboard_2[_c];
        highscore += score;
    }
    console.log(highscore);
}
main();
function getOutcomeOptions(opponentPlay) {
    if (opponentPlay == "ROCK") {
        return decisionMatrix[0];
    }
    if (opponentPlay == "PAPER") {
        return decisionMatrix[1];
    }
    if (opponentPlay == "SCISSORS") {
        return decisionMatrix[2];
    }
    console.log('getOutcomeOptions: error, not a valid play');
    return [""];
}
function getWhatToPlayFromOutcome(decisionRow, outcome) {
    return getOurPlayFromIndex(decisionRow.indexOf(outcome));
}
function getIndexFromOurPlay(ourPlay) {
    return ["ROCK", "PAPER", "SCISSORS"].indexOf(ourPlay);
}
function getOutcomeFromOurPlay(decisionRow, ourPlay) {
    return decisionRow[getIndexFromOurPlay(ourPlay)];
}
function getOurPlayFromIndex(index) {
    var actions = ["ROCK", "PAPER", "SCISSORS"];
    return actions[index];
}
function convertOpponentKeyToValue(opponentKey) {
    var opponentMap = new Map([
        ["A", "ROCK"],
        ["B", "PAPER"],
        ["C", "SCISSORS"],
    ]);
    return opponentMap.get(opponentKey);
}
function convertOutcomeKeyToValue(outcomeKey) {
    var outcomeMap = new Map([
        ["X", "LOSS"],
        ["Y", "DRAW"],
        ["Z", "WIN"],
    ]);
    return outcomeMap.get(outcomeKey);
}
function convertOurPlayKeyToValue(outcomeKey) {
    var OurPlayMap = new Map([
        ["X", "ROCK"],
        ["Y", "PAPER"],
        ["Z", "SCISSORS"],
    ]);
    return OurPlayMap.get(outcomeKey);
}
function convertOurPlayToScore(OurPlay) {
    var scoreMap = new Map([
        ["ROCK", 1],
        ["PAPER", 2],
        ["SCISSORS", 3],
    ]);
    return scoreMap.get(OurPlay);
}
function convertOutcomeToScore(outcome) {
    var scoreMap = new Map([
        ["LOSS", 0],
        ["DRAW", 3],
        ["WIN", 6],
    ]);
    return scoreMap.get(outcome);
}
