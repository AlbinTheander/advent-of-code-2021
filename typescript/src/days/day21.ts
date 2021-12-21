export function day21(input: string) {
    const [p1, p2] = parseInput(input);
    const answer1 = part1(p1, p2);
    const answer2 = part2(p1, p2);

    console.log('The rolls * losing score is', answer1);
    console.log('The maximum number of winning universes is', answer2);
}

function part1(p1: number, p2: number) {
    let players = [p1, p2];
    let scores = [0, 0];
    let rolls = 0;
    const die = new Die();
    let player = 0;
    while(scores[0] < 1000 && scores[1] < 1000) {
        rolls += 3;
        players[player] = (players[player] - 1 + die.roll() + die.roll() + die.roll()) % 10 + 1;
        scores[player] += players[player];
        player = (player + 1) % 2;
    }

    return Math.min(...scores) * rolls;
}

function part2(p1: number, p2: number) {
    const [winsP1, winsP2] = count(p1, p2, 0, 0);
    return Math.max(winsP1, winsP2);
}

/*
 * There are 
 * - 1 way of rolling 3
 * - 3 ways of rolling 4
 * - etc.
 */
const COEFFS = [0,0,0,1,3,6,7,6,3,1];

function count(p1: number, p2: number, s1: number, s2: number) {
    if (s1 >= 21) return [1, 0];
    if (s2 >= 21) return [0, 1];

    let wins = 0, losses = 0;
    for (let i = 3; i <= 9; i++) {
        const nextP1 = (p1 - 1 + i) % 10 + 1;
        const [l, w] = count(p2, nextP1, s2, s1 + nextP1);
        wins += w * COEFFS[i];
        losses += l * COEFFS[i];
    }
    return [wins, losses];
}

function parseInput(input: string): [number, number] {
    const nums = input.match(/\d+/g);
    return [+nums[1], +nums[3]];
}

class Die {
    next = 1;

    roll(): number {
        if (this.next > 100) this.next = 1;
        return this.next++;
    }
}