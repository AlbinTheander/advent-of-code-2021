// This may be the most unnecessary complex solution I ever did in AoC. :-)
type Target = { minX: number; maxX: number; minY: number; maxY: number; }
export function day17(input: string) {
    const target = parseInput(input);
    // part1(target);
    part2(target);
}

function part1(target: Target) {
    let allTime = -Infinity;
    for(let dy = target.minY; dy < 10000; dy++) {
        const maxY = doY(dy, target);
        console.log('Max Y for', dy, ':', maxY);
        allTime = Math.max(allTime, maxY);
    }
    console.log('Best', allTime);
}

function part2(target: Target) {
    let count = 0;
    for(let dx = 1; dx <= target.maxX; dx++) {
        for(let dy = target.minY; dy < 200; dy++) {
            const maxY = getMaxY(dx, dy, target);
            // console.log(dx, dy, maxY);
            if (maxY >= 0) {
                console.log(dx, ',', dy);
                count++;
            }
        }
    }
    console.log(count);
}

function getMaxY(dx0: number, dy0: number, target: Target): number {
    let x = 0;
    let y = 0;
    let dx = dx0;
    let dy = dy0;
    let maxY = 0;
    while(y > target.minY) {
        x += dx;
        y += dy;
        dx = Math.max(0, dx - 1);
        dy--;
        maxY = Math.max(maxY, y);
        if (x >= target.minX && x <= target.maxX &&
            y >= target.minY && y <= target.maxY) {
            return maxY;
        }
    }
    return -Infinity;
}

function doY(dy: number, target: Target): number {
    let currentDy = dy;
    let y = 0;
    let maxY = -Infinity;
    while(y > target.minY) {
        y += currentDy;
        maxY = Math.max(maxY, y);
        if (y >= target.minY && y <= target.maxY) {
            return maxY;
        }
        currentDy--;
    }
    return -Infinity;
}


function parseInput(input: string): Target {
    const [minX, maxX, minY, maxY] = input.match(/-?\d+/g).map(Number);
    return {minX, maxX, minY, maxY}
}