import { readFileSync } from "fs";

export function day11() {
    const answer1 = part1(getData());
    const answer2 = part2(getData());

    console.log('The first step will result in', answer1, 'flashes');
    console.log('All the octupii will flash in round ', answer2);
}

function part1(grid: number[][]): number {
    let count = 0;
    for (let i = 0; i < 100; i++) 
        count += evolve(grid);

    return count;
}

function part2(grid: number[][]): number {
    let round = 0;
    while(true) {
        round++;
        const es = evolve(grid);
        if (es === 100) {
            return round;
        }
    }
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
        .split('\n')
        .map(line => line.split('').map(Number));
}