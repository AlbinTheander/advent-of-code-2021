import { readFileSync } from "fs";

export function day07() {
    const crabs = getData();
    const lowFuel = part1(crabs);
    const highFuel = part2(crabs);

    console.log('===== Day 7  =====');
    console.log('The minimal fuel when fuel = distance is', lowFuel);
    console.log('With the real fuel consumption, they need', highFuel);
}

function part1(crabs) {
    return findMinimalFuelNeeded(crabs, d => d);
}

function part2(crabs) {
    return findMinimalFuelNeeded(crabs, d => d * (d + 1) / 2);
}

function findMinimalFuelNeeded(crabs: number[], fuelConsumption: (distance: number) => number): number {
    const min = Math.min(...crabs);
    const max = Math.max(...crabs);

    let best = 0;
    let bestFuel = Infinity;
    for(let p = min; p <= max; p++) {
        const d = crabs.reduce((s, c) => s + fuelConsumption(Math.abs(c - p)), 0);
        if (d < bestFuel) {
            best = p;
            bestFuel = d;
        }
    }

    return bestFuel;
}



function getData(): number[] {
    return readFileSync('../data/day07.txt', 'utf-8').split(',').map(Number);
}
