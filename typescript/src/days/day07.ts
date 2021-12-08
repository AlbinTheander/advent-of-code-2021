import { readFileSync } from "fs";

export function day07() {
    const crabs = getData();
    part1(crabs);
    part2(crabs);
}

function part1(crabs) {
    const min = Math.min(...crabs);
    const max = Math.max(...crabs);
    let best = 0;
    let bestD = Infinity;
    for(let p = min; p <= max; p++) {
        const d = crabs.reduce((s, c) => s + Math.abs(c - p), 0);
        if (d < bestD) {
            console.log('Better', p, d, bestD);
            best = p;
            bestD = d;
        }
    }
    console.log(best, bestD);
}
function part2(crabs) {
    const min = Math.min(...crabs);
    const max = Math.max(...crabs);
    const fuel = d => d * (d + 1) / 2;

    let best = 0;
    let bestD = Infinity;
    for(let p = min; p <= max; p++) {
        const d = crabs.reduce((s, c) => s + fuel(Math.abs(c - p)), 0);
        if (d < bestD) {
            console.log('Better', p, d, bestD);
            best = p;
            bestD = d;
        }
    }
    console.log(best, bestD);
}



function getData(): number[] {
    return readFileSync('../data/day07.txt', 'utf-8').split(',').map(Number);
    // return readFileSync('./test.txt', 'utf-8').split(',').map(Number);
}
