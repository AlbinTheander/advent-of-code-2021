use crate::util;

struct Command {
    operation: String,
    arg: i64
}

pub fn solve() {
    let commands = get_commands();
    let p1 = navigate_simple(&commands);
    let p2 = navigate_with_aim(&commands);

    println!("=====  Day 2  =====");
    println!("The final position is {:?} with the product {}", p1, p1.0 * p1.1);
    println!("The final position with aim is {:?} with the product {}", p2, p2.0 * p2.1);
}

fn navigate_simple(commands: &[Command]) -> (i64, i64) {
    let mut x = 0;
    let mut y = 0;
    for cmd in commands {
         match cmd.operation.as_str() {
            "forward" => x += cmd.arg,
            "down" => y += cmd.arg,
            "up" => y -= cmd.arg,
            anything => panic!("Unknown command {}", anything)
         }
    }
    return (x, y);
}

fn navigate_with_aim(commands: &[Command]) -> (i64, i64) {
    let mut x = 0;
    let mut y = 0;
    let mut aim = 0;
    for cmd in commands {
         match cmd.operation.as_str() {
            "forward" => {x += cmd.arg; y += aim * cmd.arg},
            "down" => aim += cmd.arg,
            "up" => aim -= cmd.arg,
            anything => panic!("Unknown command {}", anything)
         }
    }
    return (x, y);
}

fn get_commands() -> Vec<Command> {
    let data = util::read_data("day02");
    let mut commands = Vec::new();

    let lines: Vec<&str> = data.split("\n").collect();
    for line in lines {
        let parts: Vec<&str> = line.split(" ").collect();
        let cmd = Command { operation: parts[0].to_string(), arg: parts[1].parse().unwrap() };
        commands.push(cmd);
    }

    return commands;
}