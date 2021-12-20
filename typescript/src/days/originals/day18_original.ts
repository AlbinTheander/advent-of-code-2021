
type Num = {
    value: [number | Num, number | Num];
    parent: Num | null;
}


export function day18(input: string) {
    const numbers = parseInput(input);
    const n = numbers.reduce(add);
    console.log(toS(n));
    split(n);
    console.log(toS(n));
    console.log(magnitude(n));
    part2(input);
}

function part2(input: string) {
    const numbers = parseInput(input);
    let max = -Infinity;
    for(let n1 of numbers)
        for (let n2 of numbers)
            if (n1 !== n2) {
                const na = readNum(toS(n1).split(''), null);
                const nb = readNum(toS(n2).split(''), null);
                const sum = add(na, nb);
                const mag = magnitude(sum);
                max = Math.max(mag, max);
            }
    console.log(max);
}

function magnitude(num: Num): number {
    const [left, right] = num.value;
    const l = 3 * (isNum(left) ? left : magnitude(left));
    const r = 2 * (isNum(right) ? right : magnitude(right));
    return l + r;
}

function add(n1: Num, n2: Num): Num {
    console.log(' ', toS(n1));
    console.log('+', toS(n2));
    const result: Num = {
        value: [n1, n2],
        parent: null
    };
    n1.parent = result;
    n2.parent = result;
    reduce(result);
    console.log('=', toS(result));
    console.log();
    return result;
}

function reduce(num: Num) {
    console.log('Reducing', toS(num));
    let didExplode;
    let didSplit;
    do {
        didExplode = explode(num);
        didSplit = didExplode ? false : split(num);
        if (didExplode) console.log('Exploded', toS(num));
        if (didSplit) console.log('Split', toS(num));

    } while(didExplode || didSplit);
}

function explode(num: Num): boolean {
    function findExplodee(n: Num, depth = 0): Num | null {
        const [left, right] = n.value;
        if (depth > 3) return n;
        const leftResult = isNum(left) ? null : findExplodee(left, depth + 1);
        if (leftResult) return leftResult;
        return isNum(right) ? null : findExplodee(right, depth + 1);
    }

    function findClosestLeft(num: Num, from: Num): Num {
        if (num === null) return null;
        if (from === num.parent) {
            return isNum(num.value[1]) ? num : findClosestLeft(num.value[1], num);
        }
        if (from === num.value[0]) {
            return findClosestLeft(num.parent, num);
        }
        return isNum(num.value[0]) ? num : findClosestLeft(num.value[0], num);
    }

    function findClosestRight(num: Num, from: Num): Num {
        if (num === null) return null;
        if (from === num.parent) {
            return isNum(num.value[0]) ? num : findClosestRight(num.value[0], num);
        }
        if (from === num.value[1]) {
            return findClosestRight(num.parent, num);
        }
        return isNum(num.value[1]) ? num : findClosestRight(num.value[1], num);
    }

    const explodee = findExplodee(num);
    if (!explodee) return false;
    const closestLeft = findClosestLeft(explodee.parent, explodee);
    const closestRight = findClosestRight(explodee.parent, explodee);
    if (closestLeft) {
        if (isNum(closestLeft.value[1])) {
            closestLeft.value[1] += (explodee.value[0] as number);
        } else if (isNum(closestLeft.value[0])) {
            closestLeft.value[0] += (explodee.value[0] as number);
        }
    }

    if (closestRight) {
        if (isNum(closestRight.value[0])) {
            closestRight.value[0] += (explodee.value[1] as number);
        } else if (isNum(closestRight.value[1])) {
            closestRight.value[1] += (explodee.value[1] as number);
        }
    }
    if (explodee.parent.value[0] === explodee) {
        explodee.parent.value[0] = 0;
    } else {
        explodee.parent.value[1] = 0;
    }

    return true;
}

function split(num: Num): boolean {
    const [left, right] = num.value;
    if (isNum(left) && left >= 10) {
        console.log('Foound left splitting point', toS(left));
        num.value[0] = {
            value: [Math.floor(left / 2), Math.ceil(left / 2)],
            parent: num,
        };
        return true;
    }
    if(!isNum(left) && split(left)) return true;
    
    if (isNum(right) && right >= 10) {
        console.log('Foound right splitting point', toS(right));
        num.value[1] = {
            value: [Math.floor(right / 2), Math.ceil(right / 2)],
            parent: num,
        };
        return true;
    }
    return (!isNum(left) && split(left)) || (!isNum(right) && split(right));
}

function toS(num: Num | number): string {
    if (isNum(num)) return num.toString();
    const [left, right] = num.value;
    return `[${toS(left)},${toS(right)}]`;
}

function isNum(num: Num | number): num is number {
    return typeof num === 'number';
}

function parseInput(input: string): Num[] {
    return input.split('\n').map(parseNum);
}

function parseNum(s: string): Num {
    return readNum(s.split(''), null);
}


const readInt = (chs: string[]): number => {
    let result = 0;
    while(!isNaN(+chs[0])) result = result * 10 + +chs.shift();
    return result;
}
const readNum = (chs: string[], parent: Num): Num => {
    let ch = chs.shift(); // parse away "["
    let result: Num = { parent, value: [0, 0] };
    const left = chs[0] === '[' ? readNum(chs, result) : readInt(chs);
    chs.shift(); // parse away ","
    const right = chs[0] === '[' ? readNum(chs, result) : readInt(chs);
    chs.shift(); // parse away "]"
    result.value = [left, right];
    return result;
}
