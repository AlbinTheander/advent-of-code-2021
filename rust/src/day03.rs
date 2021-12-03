use crate::util;

pub fn solve() {
    let data = get_diagnostics();
    let power_consumption = calulcate_power_consumption(&data);

    println!("=====  Day 3  =====");
    println!("The power consumption is {}", power_consumption);
}

fn calulcate_power_consumption(diagnostics: &[String]) -> i32 {
    let entries = diagnostics.len() as i32;
    let bits = diagnostics[0].len();
    let mut gamma = 0;
    let mut epsilon = 0;
    println!("Bits {}", bits);
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