import { readFileSync } from "fs";

export function day04() {
    const {calls, boards } = getData();
    const winningScore = part1(boards, calls);
    boards.forEach(b => b.reset());
    const losingScore = part2(boards, calls);

    console.log('The winning score is', winningScore);
    console.log('The losing score is', losingScore);
}

function part1(boards: Board[], calls: number[]): number {
    for(let a of calls) {
        for(let board of boards) {
            board.mark(a);
            if (board.hasWon()) {
                return board.remainingSum() * a;
            }
        }
    }
}

function part2(boards: Board[], calls: number[]): number {
    let boardsLeft = boards.length;
    for(let a of calls) {
        for(let board of boards) {
            if (!board.hasWon()) {
                board.mark(a);
                if (board.hasWon()) {
                    boardsLeft--;
                    if (boardsLeft === 0) {
                        return board.remainingSum() * a;
                    }
                }
            }
        }
    }
}




function getData(): { calls: number[], boards: Board[] } {
    const lines = readFileSync('../data/day04.txt', 'utf-8').split('\n');
    const calls = lines.shift().split(',').map(Number);
    const boards = [];
    while (lines.length > 5) {
        lines.shift(); // Shift away empty line.
        const board = Array(5).fill(null).map(() => lines.shift().match(/\d+/g).map(Number));
        boards.push(new Board(board));
    }
    return { calls, boards };
}

class Board {
    private lines: number[][] = [];

    constructor(private ns: number[][]) {
        this.reset();
    }

    reset() {
        this.lines = [...this.ns];
        this.lines.push(...this.ns.map((_, i) => this.ns.map(line => line[i])));
    }

    mark(n: number) {
        this.lines = this.lines.map(line => line.map(x => x === n ? -1 : x));
    }

    hasWon(): boolean {
        return this.lines.some(line => line.every(x => x === -1));
    }

    remainingSum(): number {
        return this.lines
            .slice(0, 5)
            .map(line => line.filter(x => x !== -1).reduce((a, b) => a + b, 0))
            .reduce((a, b) => a + b);
    }
}

