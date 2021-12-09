import { readFileSync } from "fs";

export function day09() {
    const depths = getData();
    part1(depths);
    part2(depths);

    // console.log('===== Day 1  =====');
    // console.log('The number of increasing depths are', result1);
    // console.log('The number of increasing windows are', result2);
}

function part1(depths: number[][]) {
    let count = 0;
    let risk = 0;
    for(let y = 0; y < depths.length; y++)
        for(let x = 0; x < depths[0].length; x++) {
            const d = depths[y][x];
            if (neighbours(depths, x, y).every(d1 => d1 > d)) {
                count++;
                risk += (d + 1);
            }
        }

    console.log('Risk', risk);
}

function part2(depths: number[][]) {
    const grid: number[][] = JSON.parse(JSON.stringify(depths));
    let i = -1;
    for(let y = 0;  y < grid.length; y++)
        for(let x = 0; x < grid[0].length; x++) {
            flood(grid, x, y, i);
            i--;
        }

    const allNums: number[] = grid.flatMap(line => line);
    const sizes: number[] = []
    for(let i1 = -1; i1 >= i; i1--) {
        const count = allNums.filter(n => n === i1).length;
        if (count > 0) sizes.push(count);
    }

    sizes.sort((a, b) => b - a);
    console.log(grid);
    console.log(sizes);
    console.log(sizes[0] * sizes[1] * sizes[2]);
}

function flood(grid: number[][], x: number, y: number, val: number) {
    const n = get(grid, x, y);
    if (n >= 0 && n < 9 && !isNaN(n)) {
        grid[y][x] = val;
        flood(grid, x-1, y, val);
        flood(grid, x+1, y, val);
        flood(grid, x, y-1, val);
        flood(grid, x, y+1, val);
    }
}

function neighbours(grid: number[][], x: number, y: number): number[] {
    const ds = [[-1, 0], [0, -1], [0, 1], [1, 0]];
    return ds.map(([dy, dx]) => get(grid, x+dx, y+dy)).filter(n => !isNaN(n));
}

function get(grid: number[][], x: number, y: number): number {
    const defaultValue = NaN;
    if (y < 0 || y >= grid.length) return defaultValue;
    if (x < 0 || x >= grid[0].length) return defaultValue;

    return grid[y][x];
}

function getData(): number[][] {
    // return readFileSync('./test.txt', 'utf-8').split('\n').map(line => line.split('').map(Number));
    return readFileSync('../data/day09.txt', 'utf-8').split('\n').map(line => line.split('').map(Number));
}

