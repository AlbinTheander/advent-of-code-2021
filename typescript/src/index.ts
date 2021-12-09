import { readdirSync } from "fs";

main()

async function main() {
    let dayFiles = readdirSync('./src/days', 'utf-8')
        .filter(file => file.startsWith('day'))
        .sort();
    
    const requestedDay = process.argv[2];
    if (requestedDay) {
        const day = requestedDay.length === 1 ? `day0${requestedDay}.ts` :
                    requestedDay.length === 2 ? `day${requestedDay}.ts`  :
                    requestedDay
        dayFiles = [day];
    }

    for (const dayFile of dayFiles) {
        const name = dayFile.split('.')[0];
        const module = await import(`./days/${dayFile}`);
        console.log('\n=====', prettyName(name), '=====');
        module[name]();

    }
}

function prettyName(name: string): string {
    const num = +name.replace(/day0?/, '');
    return 'Day ' + num + (num < 10 ? ' ': '');
}