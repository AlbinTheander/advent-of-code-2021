import { readFileSync } from "fs";

export function day10() {
    const lines = getData();
    const total = lines.reduce((sum, line) => sum + score(line), 0);
    console.log('Total', total);

    const inclompeteScores = lines.filter(line => score(line) === 0).map(completionScore).sort((a, b) => a-b);
    console.log(inclompeteScores);
    console.log('Middle score', inclompeteScores[inclompeteScores.length >> 1]);

}

function score(line: string): number {
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
    // return readFileSync('./test.txt', 'utf-8').split('\n');
    return readFileSync('../data/day10.txt', 'utf-8').split('\n');
}