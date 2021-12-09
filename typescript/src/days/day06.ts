import { readFileSync } from "fs";

/*
* The "days" data is an array where entry n represents how many
* fish are n days away from creating a new lantern fish.
* so if fish[4] === 38, there are 38 fish that will spawn a new
* fish in 4 days.
*/

export function day06() {
    let days = getData();

    const after80 = part1(days);
    const after256 = part2(days);

    console.log('===== Day 6  =====');
    console.log('The number of lantern fish after 80 days is', after80);
    console.log('The number of lantern fish after 256 days is', after256);
}

function part1(days: number[]): number {
    return evolve(days, 80);
}

function part2(days: number[]): number {
    return evolve(days, 256);
}

function evolve(days: number[], ticks: number): number {
    let ds = days;
    for (let t = 0; t < ticks; t++) {
        ds = tick(ds);
    }

    const sum = ds.reduce((a, b) => a + b, 0);
    return sum;
}


function tick(days: number[]): number[] {
    const newDays = [];
    newDays[0] = days[1];
    newDays[1] = days[2];
    newDays[2] = days[3];
    newDays[3] = days[4];
    newDays[4] = days[5];
    newDays[5] = days[6];
    newDays[6] = days[0] + days[7];
    newDays[7] = days[8];
    newDays[8] = days[0];

    return newDays;
}

function getData(): number[] {
    const fish = readFileSync('../data/day06.txt', 'utf-8').split(',').map(Number);
    let days = [];
    for(let i = 0; i <= 8; i++) {
        days[i] = fish.filter(f => f === i).length;
    }
    return days;
}
