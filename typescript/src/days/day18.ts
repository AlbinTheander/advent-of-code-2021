type Num = (string | number)[];

export function day18(input: string) {
    const numbers = parseInput(input);
    const answer1 = part1(numbers);
    const answer2 = part2(numbers);

    console.log('The magnitude of all numbers added together is', answer1);
    console.log('The maximum magnitude of adding two squid numbers is', answer2);
}

function part1(numbers: Num[]): number {
    const total = numbers.reduce((n1, n2) => {
        const n = add(n1, n2);
        reduce(n);
        return n;
    });
    return magnitude(total);
}

function part2(numbers: Num[]): number {
    let max = 0;
    for(let n1 of numbers)
        for(let n2 of numbers) {
            const sum = add(n1, n2);
            reduce(sum);
            const mag = magnitude(sum);
            max = Math.max(max, mag);
        }
    return max;
}

function add(n1: Num, n2: Num): Num {
    return ['[', ...n1, ',', ...n2, ']'];
}
function magnitude(n: Num): number {
    const n1 = n.slice();
    function walkIt(): number {
        const ch = n1.shift();
        if (ch === '[') {
            const left = walkIt();
            n1.shift();
            const right = walkIt();
            n1.shift();
            return left * 3 + right * 2;
        }
        return +ch;
    }

    return walkIt();
}

function reduce(n: Num) {
    let kaboom = false;
    let kachuck = false;
    do {
        kaboom = explode(n);
        kachuck = kaboom ? false : split(n);
    } while(kaboom || kachuck);
}

function explode(n: Num): boolean {
    let i = 0;
    let depth = 0;
    while(i < n.length && depth <= 4) {
        if (n[i] === '[') depth++;
        if (n[i] === ']') depth--;
        i++;
    }
    if (i < n.length) {
        const left = +n[i];
        const right = +n[i+2];
        let p = i-1;
        while(p > 0 && isNaN(+n[p])) p--;
        if (p>0) n[p] = (+n[p] + left);
        p = i+3;
        while(p < n.length && isNaN(+n[p])) p++;
        if (p < n.length) n[p] = +n[p] + right;
        n.splice(i-1, 5, 0);
        return true;
    }
    return false;
}

function split(n: Num): boolean {
    let i = 0;
    while(i < n.length && !(+n[i] >= 10)) i++;
    if (i < n.length) {
        const val = +n[i];
        n.splice(i, 1, '[',Math.floor(val / 2), ',',Math.ceil(val/2), ']');
        return true;
    }
    return false;
}

function parseInput(input: string): Num[] {
    return input.split('\n').map(line => line.match(/\d+|./g));
}