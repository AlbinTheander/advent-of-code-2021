
type P3 = [number, number, number];
type Scanner = {
    id: string;
    pos: P3;
    scanners: P3[],
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

// [14,25,28,29,16,33,22,0,2,18,7,23,10,15,1,24,26,27,32,3,6,9,13,17,19,11,20,21,34,35,36,31,4,12,8,30,5]

const orders = [
    ['0', '2'],
    ['0_2', '18'],
    ['0_2_18', '7'],
    ['0_2_18_7', '23'],
    ['0_2_18_7_23', '10'],
    ['0_2_18_7_23_10', '15'],
    ['0_2_18_7_23_10_15', '1'],
    ['0_2_18_7_23_10_15_1', '24'],
    ['0_2_18_7_23_10_15_1_24', '26'],
    ['0_2_18_7_23_10_15_1_24_26', '27'],
    ['0_2_18_7_23_10_15_1_24_26_27', '32'],
    ['0_2_18_7_23_10_15_1_24_26_27_32', '3'],
    ['0_2_18_7_23_10_15_1_24_26_27_32_3', '6'],
    ['0_2_18_7_23_10_15_1_24_26_27_32_3_6', '9'],
    ['0_2_18_7_23_10_15_1_24_26_27_32_3_6_9', '13'],
    ['0_2_18_7_23_10_15_1_24_26_27_32_3_6_9_13', '17'],
    ['0_2_18_7_23_10_15_1_24_26_27_32_3_6_9_13_17', '19'],
    ['0_2_18_7_23_10_15_1_24_26_27_32_3_6_9_13_17_19', '11'],
    ['0_2_18_7_23_10_15_1_24_26_27_32_3_6_9_13_17_19_11', '20'],
    ['0_2_18_7_23_10_15_1_24_26_27_32_3_6_9_13_17_19_11_20', '21'],
    ['0_2_18_7_23_10_15_1_24_26_27_32_3_6_9_13_17_19_11_20_21', '34'],
    ['0_2_18_7_23_10_15_1_24_26_27_32_3_6_9_13_17_19_11_20_21_34', '35'],
    ['0_2_18_7_23_10_15_1_24_26_27_32_3_6_9_13_17_19_11_20_21_34_35', '36'],
    ['4', '12'],
    ['4_12', '8'],
    ['4_12_8', '30'],
    ['14', '25'],
    ['14_25', '28'],
    ['14_25_28', '29'],
    ['14_25_28_29', '16'],
    ['14_25_28_29_16', '33'],
    ['14_25_28_29_16_33', '22'],
    ['14_25_28_29_16_33_22', '0_2_18_7_23_10_15_1_24_26_27_32_3_6_9_13_17_19_11_20_21_34_35_36'],
    ['14_25_28_29_16_33_22_0_2_18_7_23_10_15_1_24_26_27_32_3_6_9_13_17_19_11_20_21_34_35_36', '31'],
    ['14_25_28_29_16_33_22_0_2_18_7_23_10_15_1_24_26_27_32_3_6_9_13_17_19_11_20_21_34_35_36_31', '4_12_8_30'],
    ['14_25_28_29_16_33_22_0_2_18_7_23_10_15_1_24_26_27_32_3_6_9_13_17_19_11_20_21_34_35_36_31_4_12_8_30', '5']
    ]
export function day19(input: string) {
    part2();
    return;
    const scanners: Scanner[] = parseInput(input);
    let works = new Map<string, Scanner>();
    scanners.forEach(s => works.set(s.id, s));
    for (let [n1, n2] of orders) {
        let s1 = works.get(n1);
        let s2 = works.get(n2);
        let m = match(s1, s2);
        let r = join(s1, m);
        works.set(r.id, r);
    }
    const finalKey = '14_25_28_29_16_33_22_0_2_18_7_23_10_15_1_24_26_27_32_3_6_9_13_17_19_11_20_21_34_35_36_31_4_12_8_30_5';
    console.log(works.get(finalKey).beacons.length);
    console.log(works.get(finalKey).scanners);
    
}

function part2() {
    const scanners = [
        [ 0, 0, 0 ],             [ 70, 1172, 148 ],
        [ -1113, -28, 34 ],      [ -1047, 1162, 100 ],
        [ -2411, 1193, 101 ],    [ -2427, 2482, -28 ],
        [ -2255, 2376, 1193 ],   [ -2245, -3560, 131 ],
        [ -2406, -3532, -1114 ], [ -3525, -3542, -1224 ],
        [ -3563, -3548, -2269 ], [ -3630, -2485, -1059 ],
        [ -3483, -1111, -1146 ], [ -3558, -1212, -42 ],
        [ -2258, -1180, 116 ],   [ -2415, -4723, 105 ],
        [ -3481, -2455, 103 ],   [ -2403, -2306, 41 ],
        [ -2271, -1110, 1155 ],  [ -2386, -1270, 2397 ],
        [ -2340, -1291, 3687 ],  [ -1128, -1175, 3588 ],
        [ 149, -1221, 3619 ],    [ -1228, -1226, 4815 ],
        [ -2417, -2429, 2409 ],  [ -1101, -2327, 1342 ],
        [ -1048, -1223, 2542 ],  [ -25, -2304, 3626 ],
        [ -2267, -1191, 4942 ],  [ -2334, -2416, 3746 ],
        [ -2324, -13, 131 ],     [ -2273, -4706, 1324 ],
        [ -1235, -2482, 68 ],    [ -1120, -2468, -1157 ],
        [ -1184, -2336, -2442 ], [ -1176, -1132, -1118 ],
        [ 116, -88, 3720 ]
      ];
      let max = 0;
      for (let s1 of scanners)
        for (let s2 of scanners) {
            const dist = s1.map((_, n) => Math.abs(s1[n] - s2[n])).reduce((a, b) => a+ b);
            max = Math.max(dist, max);
        }
    console.log(max);
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
        scanners: [...s1.scanners, ...s2.scanners],
        beacons: allBeacons.sort((a, b) => a[0] - b[0])
    }
}

function match(s1: Scanner, s2: Scanner): Scanner | null {
    console.log('Matching', s1.id, s2.id);
    const s1Keys = s1.beacons.reduce((s, b) => s.add(b.toString()), new Set<string>());
    for(let aim of AIMS) {
        const s2aim = reAim(s2, aim);
        for(let b1 of s1.beacons) {
            for(let b2 of s2aim.beacons) {
                const move = sub(b1, b2);
                const s2Candidate = transform(s2aim, move);
                const matching = s2Candidate.beacons.filter(b => s1Keys.has(b.toString())).length;
                if (matching >= 12) return s2Candidate;
            }
        }
    }
    return null;
}

function countMatching(s1: Scanner, s2: Scanner): number {
    const b1 = s1.beacons.reduce((s, b) => s.add(b.toString()), new Set<string>());
    const matching = s2.beacons.filter(b => b1.has(b.toString())).length;
    return matching;
}

function transform(scanner: Scanner, p3: P3): Scanner {
    return {
        ...scanner,
        pos: p3,
        scanners: scanner.scanners.map(s => add(s, p3)),
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
        scanners: scanner.scanners.map(s => reAimP3(s, aim)),
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
        const scanner: Scanner = { id: lines.shift().match(/\d+/g)[0], pos: [0, 0, 0], scanners: [[0,0,0]], beacons: [] };
        while(lines[0]) {
            scanner.beacons.push(lines.shift().match(/-?\d+/g).map(Number) as P3);
            scanner.beacons.sort((a, b) => a[0] - b[0]);
        }
        scanners.push(scanner);
        lines.shift();
    }
    return scanners;
}

