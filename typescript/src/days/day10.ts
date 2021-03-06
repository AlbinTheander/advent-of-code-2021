import { readFileSync } from "fs";

export function day10() {
    const lines = getData();

    const answer1 = part1(lines);
    const answer2 = part2(lines);

    console.log('The total syntax error score is', answer1);
    console.log('The middle completion score is ', answer2);
}

function part1(lines: string[]): number {
    return lines
        .map(corruptionScore)
        .reduce((a, b) => a + b, 0);
}

function part2(lines: string[]): number {
    const nonCorruptedLines = lines.filter(line => corruptionScore(line) === 0);

    const scores = nonCorruptedLines
        .map(completionScore)
        .sort((a, b) => a - b)

    return scores[scores.length >> 1];
}

function corruptionScore(line: string): number {
    let s = line;
    let oldLength = 0;
    while (oldLength !== s.length) {
        oldLength = s.length;
        s = s.replace('<>', '').replace('[]', '').replace('()', '').replace('{}', '');
    }

    const wrong = [...s].find(ch => ')]}>'.includes(ch));

    return { ')': 3, ']': 57, '}': 1197, '>': 25137 }[wrong] || 0;
}

function completionScore(line: string): number {
    let s = line;
    let oldLength = 0;
    while (oldLength !== s.length) {
        oldLength = s.length;
        s = s.replace('<>', '').replace('[]', '').replace('()', '').replace('{}', '');
    }

    return [...s].reverse().map(ch => '([{<'.indexOf(ch) + 1).reduce((total, score) => total * 5 + score, 0);
}


function getData(): string[] {
    return readFileSync('../data/day10.txt', 'utf-8').split('\n');
}