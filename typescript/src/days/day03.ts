import { readFileSync } from "fs";

export function day03() {
    const numbers = getData();
    const { gamma, epsilon } = part1(numbers);
    const { o2, co2 } = part2(numbers);

    const a = part2(numbers);

    console.log('===== Day 3  =====');
    console.log('The power consumption is ', gamma * epsilon);
    console.log('The life support rating is', o2 * co2);
}

function getData(): string[] {
    return readFileSync('../data/day03.txt', 'utf-8').split('\n');
}

function part1(numbers: string[]) {
    let gamma = 0;
    let epsilon = 0;
    let len = numbers[0].length;

    for (let i = 0; i < len; i++) {
        const [ones, zeroes] = split(numbers, s => s[i] === '1');
        gamma *= 2;
        epsilon *= 2;
        gamma += (ones.length > zeroes.length) ? 1 : 0;
        epsilon += (ones.length < zeroes.length) ? 1 : 0;
    }

    return { gamma, epsilon }
}

function part2(numbers: string[]) {
    let o2s = numbers;
    let i = 0;
    while(i < numbers[0].length && o2s.length > 1) {
        const [ones, zeroes] = split(o2s, s => s[i] === '1');
        o2s = ones.length >= zeroes.length ? ones : zeroes;
        i++;
    }

    let co2s = numbers;
    i = 0;
    while(i < numbers[0].length && co2s.length > 1) {
        const [ones, zeroes] = split(co2s, s => s[i] === '1');
        co2s = ones.length < zeroes.length ? ones : zeroes;
        i++;
    }

    const o2 = Number.parseInt(o2s[0], 2);
    const co2 = Number.parseInt(co2s[0], 2);
    return { o2, co2 };
}

function split<T>(xs: T[], pred: (x: T) => boolean): [T[], T[]] {
    const pos = xs.filter(x => pred(x));
    const neg = xs.filter(x => !pred(x));
    return [pos, neg];    
}