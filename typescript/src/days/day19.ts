
type P3 = [number, number, number];
type Scanner = {
    id: string;
    pos: P3;
    beacons: P3[]
}

const AIMS = [
    'XYZ', 'YxZ', 'xyZ', 'yXZ', // Looking at +Z
    'xYz', 'YXz', 'XyZ', 'yxz', // Looking at -Z
    'zYX', 'YZX', 'ZYX', 'yzX', // Looking at +X
    'ZYx', 'Yzx', 'zyx', 'yZx', // Looking at -X
    'XzY', 'zxY', 'xZy', 'ZXY', // Looking at +Y
    'XZy', 'Zxy', 'xzy', 'zXy'  // Looking at -Y
];


export function day19(input: string) {
    const scanners: Scanner[] = parseInput(input);
    let left = scanners;
    while(left.length > 1) {
        const next = left.shift();
        let i = 0;
        let m = null;
        while (i < left.length && (m = match(next, left[i])) === null) i++;
        if (m !== null) {
            console.log('joining', next.id, m.id);
            left.splice(i, 1);
            left.unshift(join(next, m));
        } else {
            left.push(next);
        }
    }
    console.log(left[0]);
    console.log(left[0].beacons.length);
}

function join(s1: Scanner, s2: Scanner): Scanner {
    console.log('JOIN', s1.id, s2.id);
    const allBeacons = s1.beacons.map(b => JSON.stringify(b))
        .concat(s2.beacons.map(b => JSON.stringify(b)))
        .filter((b, n, a) => n === a.indexOf(b))
        .map(b => JSON.parse(b));

    return {
        id: s1.id + '_' + s2.id,
        pos: s1.pos,
        beacons: allBeacons
    }
}

function match(s1: Scanner, s2: Scanner): Scanner | null {
    for(let aim of AIMS) {
        const s2aim = reAim(s2, aim);
        for(let b1 of s1.beacons) {
            for(let b2 of s2aim.beacons) {
                const move = sub(b1, b2);
                const s2Candidate = transform(s2aim, move);
                const matching = countMatching(s1, s2Candidate);
                if (matching >= 12) return s2Candidate;
            }
        }
    }
    return null;
}

function countMatching(s1: Scanner, s2: Scanner): number {
    const s1Keys = JSON.stringify(s1.beacons);
    const matching = s2.beacons.filter(b => s1Keys.includes(b.toString())).length;
    return matching;
}

function transform(scanner: Scanner, p3: P3): Scanner {
    return {
        ...scanner,
        pos: p3,
        beacons: scanner.beacons.map(b => add(b, p3))
    }
}

function add(p1: P3, p2: P3): P3 {
    return p1.map((_, n) => p1[n] + p2[n]) as P3;
}

function sub(p1: P3, p2: P3): P3 {
    return p1.map((_, n) => p1[n] - p2[n]) as P3;
}

function reAim(scanner: Scanner, aim: string): Scanner {
    return {
        ...scanner,
        beacons: scanner.beacons.map(b => reAimP3(b, aim))
    }
}

function reAimP3(p: P3, direction: string): P3 {
    return p.map((_, n) => getCoord(p, direction[n])) as P3;
}

function getCoord(p: P3, axis: string) {
    const axisIndex = 'xyz'.indexOf(axis.toLowerCase());
    const value = p[axisIndex];
    return 'xyz'.includes(axis) ? -value : value;
}

function parseInput(input: string) {
    const scanners = [];
    const lines = input.split('\n');
    while (lines.length > 0) {
        const scanner: Scanner = { id: lines.shift().match(/\d+/g)[0], pos: [0, 0, 0], beacons: [] };
        while(lines[0]) {
            scanner.beacons.push(lines.shift().match(/-?\d+/g).map(Number) as P3);
        }
        scanners.push(scanner);
        lines.shift();
    }
    return scanners;
}

