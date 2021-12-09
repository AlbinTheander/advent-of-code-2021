import { readFileSync } from "fs";

export function day09() {
    const depths = getData();
    const risk = part1(depths);
    const sizeInfo = part2(depths);

    console.log('The total risk of the sinks is', risk);
    console.log('The product of the 3 biggest areas is', sizeInfo);
}

function part1(depths: number[][]): number {
    let risk = 0;
    // Probably should abstract "looping over the grid"
    for(let y = 0; y < depths.length; y++)
        for(let x = 0; x < depths[0].length; x++) {
            const d = depths[y][x];
            if (neighbours(depths, x, y).every(d1 => d1 > d)) {
                risk += (d + 1);
            }
        }

    return risk;
}

function part2(depths: number[][]) {
    // Deep copy
    const grid: number[][] = JSON.parse(JSON.stringify(depths));

    // Flood fill each area with an area code.
    let areaCode = -1;
    for(let y = 0;  y < grid.length; y++)
        for(let x = 0; x < grid[0].length; x++) {
            flood(grid, x, y, areaCode);
            areaCode--;
        }

    // Flatten out all numbers and count the number of each area code.
    const allNums: number[] = grid.flatMap(line => line);
    const sizes: number[] = []
    for(let i1 = -1; i1 >= areaCode; i1--) {
        const count = allNums.filter(n => n === i1).length;
        if (count > 0) sizes.push(count);
    }

    // Sort descending
    sizes.sort((a, b) => b - a);
    return sizes[0] * sizes[1] * sizes[2];
}

/**
 * floods the grid with the specified color. The flood area is
 * restricted by the grid's borders and the number 9.
 * 
 * Colors need to be negative.
 */
function flood(grid: number[][], x: number, y: number, color: number) {
    const n = get(grid, x, y);
    if (n >= 0 && n < 9 && !isNaN(n)) {
        grid[y][x] = color;
        flood(grid, x-1, y, color);
        flood(grid, x+1, y, color);
        flood(grid, x, y-1, color);
        flood(grid, x, y+1, color);
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
    return readFileSync('../data/day09.txt', 'utf-8').split('\n').map(line => line.split('').map(Number));
}

