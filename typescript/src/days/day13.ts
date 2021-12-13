import { readFileSync } from "fs";

type Point = [number, number];
type Fold = {
    axis: string;
    pos: number;
};

export function day13() {
    const {points, folds} = getData();

    const answer1 = part1(points, folds);
    const answer2 = part2(points, folds);

    console.log('After one fold, there are', answer1, 'dots left');
    console.log('The final paper looks like this:\n\n' + answer2);
}

function part1(points: Point[], folds: Fold[]): number {
    const points2 = doFold(points, folds[0]);
    return countUnique(points2);
}

function part2(points: Point[], folds: Fold[]): string {
    let result = points;
    for(const fold of folds)  result = doFold(result, fold);
    return toString(result);
}

function doFold(points: Point[], fold: Fold): Point[] {
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