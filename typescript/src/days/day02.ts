import { readFileSync } from "fs";

type Command = {
  cmd: string;
  arg: number;
};

export function day02() {
    const cmds = getData();
    const p1 = run(cmds);
    const p2 = runWithAim(cmds);
    
    console.log(`The submarine ends up at ${p1.x},${p1.y} with the product`, p1.x * p1.y);
    console.log(`With aiming it ends up at ${p2.x},${p2.y} with the product`, p2.x * p2.y);
}

function run(cmds: Command[]) {
    let x = 0;
    let y = 0;
    for (let {cmd, arg} of cmds) {
        switch(cmd) {
            case 'forward': x += arg; break;
            case 'down': y += arg; break;
            case 'up': y -= arg; break;
            default: console.log('Unknown command', cmd);
        }
    }
    return {x, y};
}

function runWithAim(cmds: Command[]) {
    let x = 0;
    let y = 0;
    let aim = 0;
    for (let {cmd, arg} of cmds) {
        switch(cmd) {
            case 'forward': x = x + arg; y += aim * arg; break;
            case 'down': aim += arg; break;
            case 'up': aim -= arg; break;
            default: console.log('Unknown command', cmd);
        }
    }
    return {x, y};
}

function getData(): Command[] {
  return readFileSync("../data/day02.txt", "utf-8")
    .split("\n")
    .map((line) => {
      const [cmd, arg] = line.split(" ");
      return { cmd, arg: +arg };
    });
}


