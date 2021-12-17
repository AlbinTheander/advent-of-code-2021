type Target = { minX: number; maxX: number; minY: number; maxY: number; }
export function day17(input: string) {
    const target = parseInput(input);
    const { bestY, count } = parts(target);

    console.log('The highest point we can reach is', bestY);
    console.log('There are', count, 'different directions that would hit the target');
}

function parts(target: Target) {
    let count = 0;
    let bestY = 0;
    for(let dx = 1; dx <= target.maxX; dx++) {
        // 200 seems to work for me, maybe less would be ok
        for(let dy = target.minY; dy < 200; dy++) {
            const maxY = getMaxY(dx, dy, target);
            if (maxY >= 0) {
                count++;
                bestY = Math.max(bestY, maxY);
            }
        }
    }
    return { bestY, count };
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
function parseInput(input: string): Target {
    const [minX, maxX, minY, maxY] = input.match(/-?\d+/g).map(Number);
    return {minX, maxX, minY, maxY}
}