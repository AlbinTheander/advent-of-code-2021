import { readFileSync } from "fs";

type Point = [number, number];
type Fold = {
    axis: string;
    pos: number;
};

export function day13() {
    const {points, folds} = getData();

    console.log(toString(points));
    console.log();

    const once = doFold(points, folds[0]);
    const count = countUnique(once);
    console.log(toString(once));
    console.log(count);

    let result = points;
    for(const fold of folds)  result = doFold(result, fold);
    console.log(toString(result));
}

function doFold(points: Point[], fold: Fold): Point[] {
    console.log('folding', fold);
    if (fold.axis === 'y') {
        const pos = fold.pos;
        const newPoints = points
            .map((p: Point): Point => p[1] > pos ? [p[0], pos*2 - p[1]] : p);
        return newPoints;
    } else {
        const pos = fold.pos;
        const newPoints = points
            .map((p: Point): Point => p[0] < pos ? p : [2* pos - p[0], p[1]]);
        return newPoints;
    }
}

function countUnique(points: Point[]): number {
    const unique = points.map(p => p.toString()).filter((s, i, ss) => ss.indexOf(s) === i);
    console.log(points.map(p => p.toString()));
    console.log(unique);
    return unique.length;
}

function toString(points: Point[]): string {
    const minX = Math.min(...points.map(p => p[0]));
    const maxX = Math.max(...points.map(p => p[0]));
    const minY = Math.min(...points.map(p => p[1]));
    const maxY = Math.max(...points.map(p => p[1]));

    const grid = Array(maxY - minY + 1).fill(0)
        .map(_ => Array(maxX - minX + 1).fill('.'));

    points.forEach(([x, y]) => grid[y-minY][x-minX] = '#');

    return grid.map(line => line.join('')).join('\n');
}

function getData(): { points: Point[], folds: Fold[] } {
    // const [pointData, foldData] = readFileSync('./test.txt', 'utf-8').split('\n\n');
    const [pointData, foldData] = readFileSync('../data/day13.txt', 'utf-8').split('\n\n');
    const points: Point[] = pointData.split('\n').map(line => line.split(',')).map(([a, b]) => [+a, +b]);
    const folds = foldData.split('\n').map(line => {
        const parts = line.split('=');
        return {
            axis: parts[0][parts[0].length -1],
            pos: +parts[1]
        };
    });

    return { points, folds };
}