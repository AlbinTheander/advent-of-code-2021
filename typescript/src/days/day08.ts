import { readFileSync } from "fs";

type Problem = {
    digits: string[];
    target: string[];
}

export function day08() {
    const problems = getData();

    const answer1 = part1(problems);
    const answer2 = part2(problems);

    console.log('The number of occurences of 1, 4, 7, and 8 is', answer1);
    console.log('Thu sum of all the numbers are', answer2);
}

function part1(problems: Problem[]): number {
    return problems.flatMap(p => p.target).map(digit => digit.length).filter(n => [2, 3, 4, 7].includes(n)).length;
}

function part2(problems: Problem[]): number {
    return problems.map(p => solve(p.digits, p.target)).reduce((a, b) => a+b, 0);
}

/*
    Number of digits that contain each segment
    a: 8
    b: 6
    c: 8
    d: 7
    e: 4
    f: 9
    g: 7
*/
function solve(digits: string[], target: string[]): number {
    const chars = 'abcdefg'.split('');
    
    const one = digits.find(d => d.length === 2);
    const four = digits.find(d => d.length === 4);
    const seven = digits.find(d => d.length === 3);
    const eight = digits.find(d => d.length === 7);

    const sA = chars.find(ch => seven.includes(ch) && !one.includes(ch));
    const sB = chars.find(ch => digitsIncludingChar(digits, ch) === 6);
    const sC = chars.find(ch => ch !== sA && digitsIncludingChar(digits, ch) === 8);
    const sD = chars.find(ch => four.includes(ch) && digitsIncludingChar(digits, ch) === 7);
    const sE = chars.find(ch => digitsIncludingChar(digits, ch) === 4);
    const sF = chars.find(ch => digitsIncludingChar(digits, ch) === 9);
    const sG = chars.find(ch => !four.includes(ch) && digitsIncludingChar(digits, ch) === 7);

    const zero = [sA, sB, sC, sE, sF, sG].sort().join('');
    const two = [sA, sC, sD, sE, sG].sort().join('');
    const three = [sA, sC, sD, sF, sG].sort().join('');
    const five = [sA, sB, sD, sF, sG].sort().join('');
    const six = [sA, sB, sD, sE, sF, sG].sort().join('');
    const nine = [sA, sB, sC, sD, sF, sG].sort().join('');

    const digs = [zero, one, two, three, four, five, six, seven, eight, nine];

    const t = target.map(d => digs.indexOf(d)).join('');
    return +t;
}

function digitsIncludingChar(s: string[], ch: string): number {
    return s.filter(x1 => x1.includes(ch)).length;
}


function getData(): Problem[]  {
    return readFileSync('../data/day08.txt', 'utf-8').split('\n').map(line => {
        const digitData = line.match(/[a-g]+/g);
        const digits = digitData.slice(0, 10).map(s => s.split('').sort().join(''));
        const target = digitData.slice(10).map(s => s.split('').sort().join(''));
        return { digits, target };
    })
}
