export function day20(input: string) {
    const { grid, replacements } = parseInput(input);

    const answer1 = part1(grid, replacements);
    const answer2 = part2(grid, replacements);

    console.log('After two iterations, the number of lights is', answer1);
    console.log('After 50 iterations, the number of lights is', answer2);

}

function part1(grid: InfiniGrid, replacements: string): number {
    const g = evolve(evolve(grid, replacements), replacements);

    return [...g.data.values()].filter(ch => ch).length;
}

function part2(grid: InfiniGrid, replacements: string): number {
    let g = grid;
    for(let i = 0; i < 50; i++) {
        g = evolve(g, replacements);
    }
    return [...g.data.values()].filter(ch => ch).length;
}

function evolve(grid: InfiniGrid, replacements: string): InfiniGrid {
    const S3x3 = [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    const getBit = (g: InfiniGrid, x: number, y: number): number => g.isOn(x, y) ? 1 : 0;
    const getCode = (g: InfiniGrid, x: number, y: number): number => 
        S3x3.reduce((result, [dx, dy]) => result * 2 + getBit(g, x+dx, y+dy), 0);

    const newGrid = new InfiniGrid(!grid.defaultOn && replacements[0] === '#');

    for (let y = grid.minY - 1; y <= grid.maxY + 1; y++) {
        for (let x = grid.minX-1; x <= grid.maxX+1; x++) {
            const code = getCode(grid, x, y);
            const newCh = replacements[code];
            newGrid.set(x, y, newCh === '#');
        }
    }

    return newGrid;
}


function parseInput(input: string) {
    const lines = input.split('\n');
    const replacements = lines.shift();
    lines.shift();

    const grid = new InfiniGrid(false);
    lines.forEach((line, y) => [...line].forEach((ch, x) => {
        grid.set(x, y, ch === '#');
    }))

    return { replacements, grid }
}


class InfiniGrid {
    data = new Map<string, boolean>();
    minX = 0;
    maxX = 0;
    minY = 0;
    maxY = 0;

    constructor(public defaultOn: boolean) {};
    
    set(x: number, y: number, on: boolean = true) {
        const k = this.key(x, y);
        if (x < this.minX) this.minX = x;
        if (x > this.maxX) this.maxX = x;
        if (y < this.minY) this.minY = y;
        if (y > this.maxY) this.maxY = y;
        this.data.set(k, on); 
    }

    isOn(x: number, y: number): boolean {
        const k = this.key(x, y);
        return this.data.has(k) ? this.data.get(k) : this.defaultOn;
    }

    private key(x: number, y: number): string {
        return `${x}_${y}`;
    }

    toString() {
        const lines = [];
        for(let y = this.minY; y <= this.maxY; y++) {
            let line = [];
            for(let x = this.minX; x <= this.maxX; x++) {
                line.push(this.isOn(x, y) ? '#' : '.');
            }
            lines.push(line.join(''));
        }
        return lines.join('\n');
    }
}