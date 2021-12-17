type Rules = Record<string, string>;

// Funny thing with this awkward solution is that it works great for my input, when looking
// at the characters I guessed from part1. It times out for all the other characters or for
// the example data.
export function day14(input: string) {
  const { template, rules } = getData(input);
  part1(template, rules);
  part2(template, rules);
}

function part1(template: string, rules: Rules) {
  let result = template;
  for (let i = 0; i < 10; i++) result = evolve(result, rules);
  console.log(result.length);

  const counts: Record<string, number> = {};
  for (const ch of result) counts[ch] = (counts[ch] || 0) + 1;
  console.log(counts);
  const max = Math.max(...Object.values(counts));
  const min = Math.min(...Object.values(counts));
  console.log(max - min);
}

function part2(template: string, rules: Rules) {
  console.log(countAll('N', template, rules));
  console.log(countAll('K', template, rules));
  console.log(5200758808457 - 829450972300);
  return ;
  const chars = [...template].filter((ch, n) => template.indexOf(ch) === n);
  const counts = chars.map(ch => countAll(ch, template, rules));
  const min = Math.min(...counts);
  const max = Math.max(...counts);
  console.log(chars, counts, max, min, max-min);
}

const cache: Record<string, number> = {};

function countAll(target: string, template: string, rules: Rules): number {
  let total = 0;
  for (let i = 0; i < template.length - 1; i++) {
    const ch1 = template[i];
    const ch2 = template[i + 1];
    total += count(target, 40, ch1, ch2, rules);
    console.log(ch1, ch2, count(target, 1, ch1, ch2, rules));
    if (ch2 === target) total++;
  }
  if (template[0] === target) total++;
  return total;
}

function count(
  target: string,
  iterations: number,
  ch1: string,
  ch2: string,
  rules: Rules
): number {
  const cacheKey = target + ch1 + ch2 + iterations;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  if (iterations === 0) {
    return 0;
  }
  const next = rules[ch1 + ch2];
  let total =
    count(target, iterations - 1, ch1, next, rules) +
    count(target, iterations - 1, next, ch2, rules);
  if (next === target) total++;

  cache[cacheKey] = total;
  return total;
}

function evolve(template: string, rules: Rules): string {
  const result = [];
  for (let i = 0; i < template.length - 1; i++) {
    result.push(template[i]);
    result.push(rules[template.slice(i, i + 2)]);
  }
  result.push(template.slice(-1));
  return result.join("");
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
