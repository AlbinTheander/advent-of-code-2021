import { readFileSync } from "fs";

type Line = {
    from: [number, number],
    to: [number, number]
};

export function day05() {
    const lines = getData();
    part1(lines);
    part2(lines);
}

function part1(lines: Line[]) {
    const aaLines = lines.filter(({from, to }) => from[0] === to[0] || from[1] === to[1]);
    const points = new Map<string, number>();
    aaLines.forEach(l => {
        expand(l).forEach(p => {
            const key = p.toString();
            points.set(key, (points.get(key) || 0) + 1);
        })
    });
    let count = 0;
    points.forEach(c => { if (c > 1) count++ });
    console.log(count);
}

function part2(lines: Line[]) {
    const points = new Map<string, number>();
    lines.forEach(l => {
        expand(l).forEach(p => {
            const key = p.toString();
            points.set(key, (points.get(key) || 0) + 1);
        })
    });
    let count = 0;
    points.forEach(c => { if (c > 1) count++ });
    console.log(count);
}

function expand({from: [x1, y1], to: [x2, y2]}: Line): [number, number][] {
    const dx = Math.sign(x2 - x1);
    const dy = Math.sign(y2 - y1);
    const length = Math.abs(x1 === x2 ? (y2 - y1) : (x2 - x1)) + 1;
    return Array.from({ length}, (_, n) => [x1 + dx*n, y1 + dy*n])
}


function getData(): Line[] {
    const lines = readFileSync('../data/day05.txt', 'utf-8').split('\n');
    // const lines = readFileSync('./test.txt', 'utf-8').split('\n');
    const result: Line[] = []
    lines.forEach(l => {
        const ns = l.match(/\d+/g).map(Number);
        // @ts-ignore
        result.push({ from: ns.slice(0, 2), to: ns.slice(2) });
    });
    return result;
}
