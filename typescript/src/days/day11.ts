import { readFileSync } from "fs";

export function day11() {
    const grid = getData();
    let exp = 0;
    for(let i = 0; i <100; i++) {
        exp += evolve(grid);
    }
    console.log(toS(grid));
    console.log(exp);

    const grid2 = getData();
    let round = 0;
    while(true) {
        round++;
        const es = evolve(grid2);
        if (es === 100) {
            console.log('Round', round);
            return;
        }
    }
}

function toS(grid: number[][]): string {
    return grid.map(line => line.join(',')).join('\n');
}

function evolve(grid: number[][]): number {
    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[0].length; x++) {
            grid[y][x]++;
        }
    }
    let explosions = 0;

    const explode = (x: number, y: number) => {
        if (!contains(grid, x, y) || grid[y][x] === 0) return;
        grid[y][x]++;
        if (grid[y][x] >= 10) {
            explosions++;
            grid[y][x] = 0;
            explode(x-1, y-1);
            explode(x,   y-1);
            explode(x+1, y-1);
            explode(x-1, y);
            explode(x+1, y);
            explode(x-1, y+1);
            explode(x,   y+1);
            explode(x+1, y+1);
        }
    }

    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] >= 10) explode(x, y);
        }
    }
    return explosions;
}

function contains(grid: number[][], x: number, y: number): boolean {
    return (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length);
}

function getData(): number[][] {
    return readFileSync('../data/day11.txt', 'utf-8')
    // return readFileSync('./test.txt', 'utf-8')
        .split('\n')
        .map(line => line.split('').map(Number));
}