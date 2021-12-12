import { readFileSync } from "fs";

export function day12() {
    const paths = getData();
    console.log(paths);
    const allPaths = [];
    const isSmall = (s: string) => s.toLowerCase() === s;

    function search(current: string, path: string[], visited: string[], isDoubled: boolean) {
        if (visited.includes(current) && isDoubled) return;
        if (visited.includes(current) && current === 'start') return;

        const newPath = [...path, current];
        if (current === 'end') {
            allPaths.push(newPath.join(','));
            return
        }
        const newVisited = isSmall(current) ? [...visited, current] : visited;
        const possiblePaths = paths.filter(p => p[0] === current);
        const newIsDoubled = isDoubled || visited.includes(current);
        possiblePaths.forEach(([_, target]) => {
            search(target, newPath, newVisited, newIsDoubled);
        });
    }

    search('start', [], [], true);
    allPaths.sort();
    // console.log(allPaths);
    const first = allPaths.length;

    allPaths.splice(0, allPaths.length);
    search('start', [], [], false);
    allPaths.sort();
    console.log(allPaths);
    const second = allPaths.length;
    console.log(first, second);
}

function getData(): [string, string][] {
    // return readFileSync('./test.txt', 'utf-8')
    return readFileSync('../data/day12.txt', 'utf-8')
        .split('\n')
        .map(line => line.split('-'))
        .flatMap(([to, from]) => [[to, from], [from, to]]);
}