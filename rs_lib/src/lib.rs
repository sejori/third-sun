extern crate image;

use wasm_bindgen::prelude::*;
use web_sys::console;
use std::io;

use image::io::Reader;
use image::DynamicImage;
use image::imageops::resize;
use image::imageops::FilterType;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b;
}

#[wasm_bindgen]
pub fn resizeImage(data: Vec<u8>, width: u32, height: u32) -> Vec<u8> {

  // decode data
  let image: DynamicImage = Reader::new(io::Cursor::new(data))
    .with_guessed_format()
    .expect("REASON")
    .decode()
    .expect("REASON")
    .resize(width, height, FilterType::Nearest);
  
  image.write_to();

  return data;

  // // calc corrrect resize dimensions from aspect ratio
  // // unneeded I think - image.resize preserves aspect ratio
  // const aspect_ratio = image.dimen
  // let width = 100

  // // return encoded resize result
  // image.resize()
  //   .write_to()
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn it_works() {
    let result = add(1, 2);
    assert_eq!(result, 3);
  }
}
