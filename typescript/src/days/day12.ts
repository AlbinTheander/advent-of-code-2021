import { readFileSync } from "fs";

export function day12() {
    const edges = getData();
    const answer1 = part1(edges);
    const answer2 = part2(edges);

    console.log('The number of possible paths without double visits is', answer1);
    console.log('The number of possible paths with double visits is', answer2);
}

function part1(edges: [string, string][]): number {
    const possiblePaths = getPossiblePaths(edges, false);
    return possiblePaths.length;
}

function part2(edges: [string, string][]): number {
    const possiblePaths = getPossiblePaths(edges, true);
    return possiblePaths.length;
}

function getPossiblePaths(edges: [string, string][], allowDoubleVisits: boolean): string[] {
    const possiblePaths: string[] = [];

    function search(current: string, currentPath: string[], visited: string[], allowDouble: boolean) {
        if (visited.includes(current) && !allowDouble) return;
        if (visited.includes(current) && current === 'start') return;
    
        const newPath = [...currentPath, current];
        if (current === 'end') {
            possiblePaths.push(newPath.join(','));
            return
        }
        const newVisited = isSmall(current) ? [...visited, current] : visited;
        const possibleEdges = edges.filter(p => p[0] === current);
        const newAllowDouble = allowDouble && !visited.includes(current);

        possibleEdges.forEach(([_, target]) => {
            search(target, newPath, newVisited, newAllowDouble);
        });
    }

    search('start', [], [], allowDoubleVisits);
    return possiblePaths;
}

function isSmall(s: string): boolean {
    return s.toLowerCase() === s;
} 

function getData(): [string, string][] {
    return readFileSync('../data/day12.txt', 'utf-8')
        .split('\n')
        .map(line => line.split('-'))
        .flatMap(([to, from]) => [[to, from], [from, to]]);
}