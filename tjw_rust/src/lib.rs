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

/// Allocate memory into the module's linear memory
/// and return the offset to the start of the block.
#[wasm_bindgen]
pub fn alloc(len: usize) -> *mut u8 {
    // create a new mutable buffer with capacity `len`
    let mut buf = Vec::with_capacity(len);
    // take a mutable pointer to the buffer
    let ptr = buf.as_mut_ptr();
    // take ownership of the memory block and
    // ensure that its destructor is not
    // called when the object goes out of scope
    // at the end of the function
    std::mem::forget(buf);
    // return the pointer so the runtime
    // can write data at this offset
    return ptr;
}

/// Given a pointer to the start of a byte array and
/// its length, return the sum of its elements.
#[wasm_bindgen]
pub unsafe fn resize(ptr: *mut u8, len: usize, width: u32, height: u32) -> usize {
  // create a Vec<u8> from the pointer to the
  // linear memory and the length
  let mut buffer = Vec::from_raw_parts(ptr, len, len);

  // guess data format
  let format = guess_format(&buffer).unwrap_or(image::ImageFormat::Png);

  // decode data into DynamicImage
  let full = Reader::new(io::Cursor::new(&buffer))
    .with_guessed_format()
    .unwrap()
    .decode()
    .unwrap();

  // log_u32(width);
  // log_u32(height);

  // resize DynamicImage
  let resized = full.resize(width, height, FilterType::Triangle);

  // write to data
  resized.write_to(&mut io::Cursor::new(&mut buffer), format).expect("REASON");

  return buffer.len();
}

// #[wasm_bindgen] 
// struct ResizableImage{ buffer: Vec<u8> }
// #[wasm_bindgen] 
// impl ResizableImage {
//   #[wasm_bindgen(constructor)] 
//   pub fn new(self) -> ResizableImage {
//     self.buffer = Vec::new();
//     return self;
//   }
  
//   fn get_buffer(&mut self) -> &Vec<u8> {
//     return &mut self.buffer;
//   }

//   fn resize_buffer(&mut self, width: u32, height: u32) -> &Vec<u8> {
//     // guess data format
//     let format = guess_format(&self.buffer).unwrap_or(image::ImageFormat::Png);

//     // decode data into DynamicImage
//     let full = Reader::new(io::Cursor::new(&self.buffer))
//       .with_guessed_format()
//       .unwrap()
//       .decode()
//       .unwrap();

//     // log_u32(width);
//     // log_u32(height);

//     // resize DynamicImage
//     let resized = full.resize(width, height, FilterType::Triangle);

//     // write to data
//     resized.write_to(&mut io::Cursor::new(&mut self.buffer), format).expect("REASON");

//     return &self.buffer;
//   }
// }

// #[wasm_bindgen] 
// pub fn resize_image_buffer(buffer: &JsValue, width: u32, height: u32) -> Vec<u8> {
//   // guess data format
//   let format = guess_format(&buffer).unwrap_or(image::ImageFormat::Png);

//   // decode data into DynamicImage
//   let full = Reader::new(io::Cursor::new(&buffer))
//     .with_guessed_format()
//     .unwrap()
//     .decode()
//     .unwrap();

//   // log_u32(width);
//   // log_u32(height);

//   // resize DynamicImage
//   let resized = full.resize(width, height, FilterType::Triangle);

//   // write to data
//   resized.write_to(&mut io::Cursor::new(buffer), format).expect("REASON");

//   return buffer;
// }

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
