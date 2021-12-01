import { readFileSync } from "fs";

function getData(): number[] {
    return readFileSync('../data/day01.txt', 'utf-8').split('\n').map(Number);
}

function countIncreasing(ns: number[]): number {
    return ns.filter((n, i) => i !== 0 && ns[i] > ns[i-1]).length;
}


export function day01() {
    const depths = getData();
    const result1 = countIncreasing(depths);
    const windows = depths.slice(2).map((_, i) => depths[i] + depths[i+1] + depths[i+2]);
    const result2 = countIncreasing(windows);

    console.log('===== Day 1  =====');
    console.log('The number of increasing depths are', result1);
    console.log('The number of increasing windows are', result2);
}