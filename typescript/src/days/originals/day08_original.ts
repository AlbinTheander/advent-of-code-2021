import { readFileSync } from "fs";

export function day08() {
    const data = getData();
    console.log(data[0]);

    const answer1 = data.flatMap(d => d.target).map(s => s.length)
        .filter(l => [2,3,4,7].includes(l)).length;
    console.log(answer1);

    const answer2 = data.map(({digits, target}) => solve(digits, target)).reduce((a, b) => a + b, 0);
    console.log(answer2);
}

/*
a: 8
b: 6
c: 8
d: 7
e: 4
f: 9
g: 7
*/

function solve(digits: string[], target: string[]) {
    const ag = 'abcdefg'.split('');

    const one = digits.find(d => d.length === 2);
    const four = digits.find(d => d.length === 4);
    const seven = digits.find(d => d.length === 3);
    const eight = digits.find(d => d.length === 7);

    const sA = ag.find(d => seven.includes(d) && !one.includes(d));
    const sB = ag.find(ch => digits.filter(d => d.includes(ch)).length === 6);
    const sC = ag.find(ch => ch !== sA && digits.filter(d => d.includes(ch)).length === 8);
    const sD = ag.find(ch => four.includes(ch) && digits.filter(d => d.includes(ch)).length === 7);
    const sE = ag.find(ch => digits.filter(d => d.includes(ch)).length === 4);
    const sF = ag.find(ch => digits.filter(d => d.includes(ch)).length === 9);
    const sG = ag.find(ch => !four.includes(ch) && digits.filter(d => d.includes(ch)).length === 7);

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


function getData()  {
    return readFileSync('../data/day08.txt', 'utf-8').split('\n').map(line => {
    // return readFileSync('./test.txt', 'utf-8').split('\n').map(line => {
        const digitData = line.match(/[a-g]+/g);
        const digits = digitData.slice(0, 10).map(s => s.split('').sort().join(''));
        const target = digitData.slice(10).map(s => s.split('').sort().join(''));
        return { digits, target };
    })
    // return readFileSync('./test.txt', 'utf-8').split(',').map(Number);
}
