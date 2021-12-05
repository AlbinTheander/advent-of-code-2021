import { readFileSync } from "fs";

type Point = [number, number];

type Line = {
    from: Point,
    to: Point
};

export function day05() {
    const lines = getData();
    const axisAlignedDuplications = part1(lines);
    const allDuplicates = part2(lines);

    console.log('===== Day 5  =====');
    console.log('The number of duplicate points from the axis aligned lines is', axisAlignedDuplications);
    console.log('The total number of duplicate points is', allDuplicates);
}

function part1(lines: Line[]): number {
    const aaLines = lines.filter(({from, to }) => from[0] === to[0] || from[1] === to[1]);
    return countIntersections(aaLines);
}

function part2(lines: Line[]): number {
    return countIntersections(lines);
}

function countIntersections(lines: Line[]): number {
    const points = new Map<string, number>();
    lines.forEach(l => {
        expand(l).forEach(p => {
            const key = p.toString();
            points.set(key, (points.get(key) || 0) + 1);
        })
    });
    let count = 0;
    points.forEach(c => { if (c > 1) count++ });
    return count;
}

function expand({from: [x1, y1], to: [x2, y2]}: Line): Point[] {
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
