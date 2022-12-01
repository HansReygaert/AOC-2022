import {readFileSync} from "fs";

const input:string[] = readFileSync('input.txt', 'utf-8').split('\n');
let scoreboard = [];

function main(): void{
    console.log(`----- Advent of code - Day 01 -----`);

    let currentCalories = 0;
    for(let line of input){
        if (line !== '') {
            currentCalories += Number.parseInt(line);
            continue;
        }

        scoreboard.push(currentCalories);
        currentCalories = 0;
    }

    scoreboard.sort((a,b) => a > b ? -1: 1);
    console.log(`part 1: ${scoreboard[0]}`);
    console.log(`part 2: ${scoreboard[0] + scoreboard[1] + scoreboard[2]}`);
}

main();