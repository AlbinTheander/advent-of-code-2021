type Grid = number[][];

export function day15(input: string) {
    const grid: Grid = input.split('\n').map(line => line.split('').map(Number));

    part1(grid);
    part2(grid);
}

function part1(grid: Grid) {
    const risks: Grid = JSON.parse(JSON.stringify(grid).replace(/\d/g, '1000000000'));
    risks[0][0] = 0;
    const toCheck = [[0, 0]];

    const checkOut = (x: number, y: number, dx: number, dy: number) => {
        const [x1, y1] = [x+dx, y+dy];
        if (!inside(grid, x1, y1)) return;
        const newRisk = risks[y][x] + grid[y1][x1];
        if (newRisk < risks[y1][x1]) {
            risks[y1][x1] = newRisk;
            toCheck.push([x1, y1]);
        }
    }
    while(toCheck.length > 0) {
        const [x, y] = toCheck.shift();
        const risk = risks[y][x];
        checkOut(x, y, 0, -1);
        checkOut(x, y, -1, 0);
        checkOut(x, y,  1, 0);
        checkOut(x, y,  0, 1);
    }

    console.log(risks[risks.length-1][risks[0].length-1]);
}

function part2(grid: Grid) {
    const longLines: Grid = grid.map(line => {
        const result = line.slice();
        for (let i = 0; i < 4; i++) {
            const extension = line.map(n => (n + i) % 9 + 1)
            result.push(...extension);
        }
        return result;
    });

    const newGrid: Grid = JSON.parse(JSON.stringify(longLines));

    for (let i = 0; i < 4; i++) {
        const newLines = longLines.map(line => line.map(n => (n + i) % 9 + 1));
        newGrid.push(...newLines);
    }

    part1(newGrid);

}

function inside(grid: Grid, x: number, y: number) {
    return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
}