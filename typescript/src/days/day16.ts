export function day16(input: string) {
    const bitStream = new BitStream(input);
    const { versionSum, result } = parts(bitStream);

    console.log('The sum of all the versions is', versionSum);
    console.log('The value of the whole expression is', result);
}

function parts(bits: BitStream): { versionSum: any; result: number; } {
    const versions = [];

    function readComponent(): number {
        if (!bits.hasMore()) return;

        const version = bits.read(3);
        const typeId = bits.read(3);
        versions.push(version);

        if (typeId === 4) {
            // Literal
            let value = 0;
            let done = false;
            while (!done) {
                done = bits.read(1) === 0;
                value = value * 16 + bits.read(4);
            }
            return value;
        } else {
            // Op
            const lengthId = bits.read(1);
            const values = [];
            if (lengthId === 0) {
                const length = bits.read(15);
                const startPos = bits.pos;
                while(bits.pos < startPos + length) {
                    values.push(readComponent());
                }
            } else {
                const packets = bits.read(11);
                for(let i = 0; i < packets; i++) {
                    values.push(readComponent());
                }
            }
            return evalComponent(typeId, values);
        }
    }

    const result = readComponent();
    const versionSum = versions.reduce((a, b) => a+ b, 0);

    return { versionSum, result };
}

function evalComponent(typeId: number, values: number[]): number {
    switch(typeId) {
        case 0: return values.reduce((a, b) => a + b, 0);
        case 1: return values.reduce((a, b) => a * b, 1);
        case 2: return Math.min(...values);
        case 3: return Math.max(...values);
        case 5: return values[0] > values[1] ? 1 : 0;
        case 6: return values[0] < values[1] ? 1 : 0;
        case 7: return values[0] === values[1] ? 1 : 0;
    }
}



class BitStream {
    private bits: string;
    
    pos = 0;

    constructor(hex: string) {
        this.bits = [...hex]
            .map(ch => Number.parseInt(ch, 16).toString(2).padStart(4, '0'))
            .join('');
    }

    read(nrOfBits: number): number {
        const s = this.bits.slice(this.pos, this.pos + nrOfBits);
        this.pos += nrOfBits;
        return Number.parseInt(s, 2);
    }

    hasMore(): boolean {
        return this.pos < this.bits.length - 4;
    }
}