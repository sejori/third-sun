extern crate image;

use wasm_bindgen::prelude::*;
use js_sys::{WebAssembly, Uint8Array};
use std::io;
use image::io::{Reader};
use image::{guess_format};
use image::imageops::FilterType;

// https://wasmbyexample.dev/examples/webassembly-linear-memory/webassembly-linear-memory.rust.en-us.html

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);

  #[wasm_bindgen(js_namespace = console, js_name = log)]
  fn log_u32(a: u32);
}

#[wasm_bindgen]
pub unsafe fn resize(memory: *mut WebAssembly::Memory, width: u32, height: u32) -> usize {
  // create a Vec<u8> from the pointer to the
  // linear memory and the length
  let js_buf = memory.as_ref().unwrap().buffer();
  let array = Uint8Array::new(&js_buf);
  let mut buffer: Vec<u8> = array.to_vec();

  // guess data format
  let format = guess_format(&buffer).unwrap_or(image::ImageFormat::Png);

  // decode data into DynamicImage
  let image = Reader::new(io::Cursor::new(&buffer))
    .with_guessed_format()
    .unwrap()
    .decode()
    .unwrap();

    log("here");

  // log_u32(width);
  // log_u32(height);

  // // resize DynamicImage
  let resized = image.resize(width, height, FilterType::Triangle);

  // // write to data
  resized.write_to(&mut io::Cursor::new(&mut buffer), format).expect("REASON");

  return buffer.len();
}
