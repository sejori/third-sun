extern crate image;

use wasm_bindgen::prelude::*;
use std::io;
use image::io::{Reader};
use image::{guess_format};
use image::imageops::FilterType;

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);

  #[wasm_bindgen(js_namespace = console, js_name = log)]
  fn log_u32(a: u32);
}

#[wasm_bindgen] 
pub fn resize_image(mut data: Vec<u8>, width: u32, height: u32) -> Vec<u8> {
  // guess data format
  let format = guess_format(&data).unwrap_or(image::ImageFormat::Png);

  // decode data into DynamicImage
  let full = Reader::new(io::Cursor::new(&data))
    .with_guessed_format()
    .unwrap()
    .decode()
    .unwrap();

  // log_u32(width);
  // log_u32(height);

  // resize DynamicImage
  let resized = full.resize(width, height, FilterType::Triangle);

  // write to data
  resized.write_to(&mut io::Cursor::new(&mut data), format).expect("REASON");

  return data;
}

// let image = catch_unwind(|| {
//   Reader::new(io::Cursor::new(&data))
//     .with_guessed_format()
//     .expect("REASON")
//     .decode()
//     .expect("REASON");
// });

// #[cfg(test)]
// mod tests {
//   use super::*;

//   #[test]
//   fn it_works() {
//     let result = add(1, 2);
//     assert_eq!(result, 3);
//   }
// }
