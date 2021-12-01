use std::fs::{File};
use std::io::Read;
use std::path::Path;

pub fn read_data(name: &str) -> String {
    // Create a path to data file for the day
    let full_name = format!("../data/{}.txt", name);
    let path = Path::new(&full_name);
    let display = path.display();

    // Open the path in read-only mode, returns `io::Result<File>`
    let mut file = match File::open(&path) {
        Err(why) => panic!("couldn't open {}: {}", display, why),
        Ok(file) => file,
    };

    // Read the file contents into a string, returns `io::Result<usize>`
    let mut s = String::new();
    match file.read_to_string(&mut s) {
        Err(why) => panic!("couldn't read {}: {}", display, why),
        Ok(_) => return s
    }
}