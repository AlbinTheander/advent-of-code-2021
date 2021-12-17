type Rules = Record<string, string>;

export function day14(input: string) {
  const { template, rules } = getData(input);

  const answer1 = part1(template, rules);
  const answer2 = part2(template, rules);

  console.log('After 10 steps, the score is', answer1);
  console.log('After 40 steps, the score is', answer2);
}

function part1(template: string, rules: Rules) {
  let counter = createCounter(template);
  for(let i = 0; i < 10; i++) {
    counter = counter.evolve(rules);
  }

  return scoreCounter(counter);
}

function part2(template: string, rules: Rules) {
  let counter = createCounter(template);
  for(let i = 0; i < 40; i++) {
    counter = counter.evolve(rules);
  }

  return scoreCounter(counter);
}

function createCounter(template: string) {
  let counter = new Counter();

  for(let i = 0; i < template.length - 1; i++) {
    const genome = template.slice(i, i+2);
    counter.add(genome, 1);
  }

  return counter;
}

function scoreCounter(counter: Counter): number {
  const counts = counter.countIt();
  const max = Math.ceil(Math.max(...counts.data.values()) / 2);
  const min = Math.ceil(Math.min(...counts.data.values()) / 2);
  return max - min;
}

function getData(input: string): { template: string; rules: Rules } {
  const lines = input.split("\n");
  const template = lines.shift();
  lines.shift(); // Empty line
  const rules = {};
  lines.forEach((line) => {
    const [from, to] = line.split(" -> ");
    rules[from] = to;
  });

  return { template, rules };
}

class Counter {
  data = new Map<string, number>();

  add(key: string, count: number) {
    const val = this.data.get(key) || 0;
    this.data.set(key, val + count);
  }

  evolve(rules: Rules) {
    const newCounter = new Counter();
    this.data.forEach((count: number, genome: string) => {
      const ch = rules[genome];
      const g1 = genome[0] + ch;
      const g2 = ch + genome[1];
      newCounter.add(g1, count);
      newCounter.add(g2, count);
    });
    return newCounter;
  }

  countIt() {
    const newCounter = new Counter();
    this.data.forEach((count: number, genome: string) => {
      newCounter.add(genome[0], count);
      newCounter.add(genome[1], count);
    })
    return newCounter;
  }
}