use crate::util;

pub fn solve() {
    let depths = get_depths();
    let increasing_depths = count_increasing(&depths);
    let windows = sliding_window3(&depths);
    let increasing_windows = count_increasing(&windows);

    println!("=====  Day 1  =====");
    println!("The number of increasing depths is {}", increasing_depths);
    println!("The number of increasing windows is {}", increasing_windows);
}

fn sliding_window3(ns: &[u16]) -> Vec<u16> {
    let mut result = Vec::new();
    for i in 0..(ns.len()-2) {
        result.push(ns[i] + ns[i+1] + ns[i+2])
    }
    return result;
}

fn count_increasing(ns: &[u16]) -> u16 {
    let mut count = 0;
    let mut last = ns[0];
    for &n in ns {
        if n > last {count = count + 1; };
        last = n;
    }
    return count;
}

fn get_depths() -> Vec<u16> {
    let data = util::read_data("day01");
    let lines: Vec<u16> = data.split("\n").map(|x| x.parse::<u16>().unwrap()).collect();
    return lines;
}