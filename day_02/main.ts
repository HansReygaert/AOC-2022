import {readFileSync} from "fs";

const input:string[] = readFileSync('input.txt', 'utf-8').split('\n');

let scoreboard: number[] = [];
let highscore = 0;

const decisionMatrix =
    [  // ROCK    PAPER   SCISSORS -> WE PLAY
        ["DRAW" , "WIN"  , "LOSS"],  // THEY PLAY -> ROCK
        ["LOSS" , "DRAW" , "WIN" ],  // THEY PLAY -> PAPER
        ["WIN" ,  "LOSS" , "DRAW"],  // THEY PLAY -> SCISSORS
    ];

function reset() {
    scoreboard = [];
    highscore = 0;
}

function main(): void {
    console.log(`----- Advent of code - Day 02 -----`);
    console.log('----- Part one -----');

    for(let line of input){
       const opponent = convertOpponentKeyToValue(line.charAt(0));
       const ourPlay = convertOurPlayKeyToValue(line.charAt(2));

       const outcome = getOutcomeFromOurPlay(getOutcomeOptions(opponent), ourPlay);
       const outcomeScore = convertOutcomeToScore(outcome);

       scoreboard.push(convertOurPlayToScore(ourPlay) + outcomeScore);
    }

    for(let score of scoreboard){
        highscore += score;
    }

    console.log(highscore);
    reset();

    console.log('----- Part two -----');
    for(let line of input){
        const opponent = convertOpponentKeyToValue(line.charAt(0));
        const outcome = convertOutcomeKeyToValue(line.charAt(2));
        const ourPlay = getWhatToPlayFromOutcome(getOutcomeOptions(opponent), outcome);
        scoreboard.push(convertOurPlayToScore(ourPlay) + convertOutcomeToScore(outcome));
    }

    for(let score of scoreboard){
        highscore += score;
    }

    console.log(highscore);
}
main();

function getOutcomeOptions(opponentPlay: string): string[]{
    if(opponentPlay == "ROCK"){
        return decisionMatrix[0];
    }
    if(opponentPlay == "PAPER"){
        return decisionMatrix[1];
    }
    if (opponentPlay == "SCISSORS"){
        return decisionMatrix[2];
    }
    console.log('getOutcomeOptions: error, not a valid play');
    return [""];
}

function getWhatToPlayFromOutcome(decisionRow: string[], outcome: string): string{
    return getOurPlayFromIndex(decisionRow.indexOf(outcome));
}

function getIndexFromOurPlay(ourPlay: string): number{
    return ["ROCK", "PAPER", "SCISSORS"].indexOf(ourPlay);
}

function getOutcomeFromOurPlay(decisionRow: string[], ourPlay: string): string{
    return decisionRow[getIndexFromOurPlay(ourPlay)];
}

function getOurPlayFromIndex(index: number): string{
    let actions = ["ROCK", "PAPER", "SCISSORS"];
    return actions[index];
}

function convertOpponentKeyToValue(opponentKey: string){
    let opponentMap = new Map<string, string>([
        ["A", "ROCK"    ],
        ["B", "PAPER"   ],
        ["C", "SCISSORS"],
    ]);

    return opponentMap.get(opponentKey);
}

function convertOutcomeKeyToValue(outcomeKey: string){
    const outcomeMap = new Map<string, string>([
        ["X", "LOSS" ],
        ["Y", "DRAW" ],
        ["Z", "WIN"  ],
    ]);

    return outcomeMap.get(outcomeKey);
}

function convertOurPlayKeyToValue(outcomeKey: string){
    const OurPlayMap = new Map<string, string>([
        ["X", "ROCK" ],
        ["Y", "PAPER" ],
        ["Z", "SCISSORS"],
    ]);

    return OurPlayMap.get(outcomeKey);
}

function convertOurPlayToScore(OurPlay: string){
    const scoreMap = new Map<string, number>([
        ["ROCK", 1 ],
        ["PAPER", 2 ],
        ["SCISSORS", 3],
    ]);

    return scoreMap.get(OurPlay);
}

function convertOutcomeToScore(outcome: string): number{
    const scoreMap = new Map<string, number>([
        ["LOSS", 0],
        ["DRAW", 3],
        ["WIN",  6],
    ]);

    return scoreMap.get(outcome);
}