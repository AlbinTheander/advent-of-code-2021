use crate::util;

pub fn solve() {
    let data = get_diagnostics();
    let power_consumption = calculcate_power_consumption(&data);
    let _life_support_rating = calculate_life_support_rating(&data);

    println!("\n=====  Day 3  =====");
    println!("The power consumption is {}", power_consumption);
    println!("The life support rating is {}", _life_support_rating);
}

fn calculcate_power_consumption(diagnostics: &[String]) -> i32 {
    let entries = diagnostics.len() as i32;
    let bits = diagnostics[0].len();
    let mut gamma = 0;
    let mut epsilon = 0;
    for bit in 0..bits {
        let ones = count_ones(diagnostics, bit);
        if ones > entries / 2 {
            gamma = gamma * 2 + 1;
            epsilon = epsilon * 2
        } else {
            gamma = gamma * 2;
            epsilon = epsilon * 2 + 1;
        }
    }
    return gamma * epsilon;
}

fn calculate_life_support_rating(diagnostics: &[String]) -> i32 {
    let bits = diagnostics[0].len();

    let mut o2: Vec<_> = diagnostics.to_vec();
    let mut bit = 0;
    while bit < bits && o2.len() > 1 {
        let ones = count_ones(&o2, bit);
        let keep_bit = if ones * 2 >= (o2.len() as i32) { '1' } else { '0' } as u8;
        o2.retain(|s| s.bytes().nth(bit) == Some(keep_bit));
        bit += 1;
    }

    let mut co2: Vec<_> = diagnostics.to_vec();
    let mut bit = 0;
    while bit < bits && co2.len() > 1 {
        let ones = count_ones(&co2, bit);
        let keep_bit = if ones * 2 >= (co2.len() as i32) { '0' } else { '1' } as u8;
        co2.retain(|s| s.bytes().nth(bit) == Some(keep_bit));
        bit += 1;
    }
    let result = i32::from_str_radix(&o2[0], 2).unwrap() * i32::from_str_radix(&co2[0], 2).unwrap();
    return result;
}

fn count_ones(diagnostics: &[String], bit: usize) -> i32 {
    let mut count = 0;
    for s in diagnostics {
        if s.bytes().nth(bit).unwrap() == '1' as u8 {
            count += 1;
        }
    }
    return count;
}

fn get_diagnostics() -> Vec<String> {
    let data = util::read_data("day03");
    let lines: Vec<String> = data.split("\n").map(|x| x.to_string()).collect();
    return lines;
}