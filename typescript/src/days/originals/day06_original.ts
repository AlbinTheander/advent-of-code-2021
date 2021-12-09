import { readFileSync } from "fs";

export function day06() {
    let fish = getData();
    fish = [6];
    for(let i = 0; i < 80; i++) {
        fish = tick(fish);
    }
    
    fish = getData();
    let days = [];
    for(let i = 0; i <= 8; i++) {
        days[i] = fish.filter(f => f === i).length;
    }

    for(let i = 0; i < 256; i++) {
        days = tick2(days);
    }
    const sum = days.reduce((a, b) => a+b, 0);
    console.log(sum, days);
}

function tick(fish: number[]): number[] {
    return fish.flatMap(f => {
        return f === 0 ? [6, 8] : [f-1];
    });
}

function tick2(days: number[]): number[] {
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
    return readFileSync('../data/day06.txt', 'utf-8').split(',').map(Number);
    // return readFileSync('./test.txt', 'utf-8').split(',').map(Number);
}
