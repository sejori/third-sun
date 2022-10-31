/**
 source: https://github.com/BrunoBernardino/deno-boilerplate-simple-website/blob/ab99bfb993485b796028af49006acb31f6a6e162/lib/utils.ts
*/
 import { emit } from "emit"

// declare global {
//   interface Window {
//     app: App;
//   }
// }

// export interface App {
//   showLoading: () => void;
//   hideLoading: () => void;
// }
// ^ Extend window to help global component logic & data

/* This allows us to have nice html syntax highlighting in template literals */
export const html = String.raw;

export async function transpileTs(content: string, specifier: URL) {
  const urlStr = specifier.toString();
  const result = await emit(specifier, {
    load(specifier: string) {
      if (specifier !== urlStr) {
        return Promise.resolve({ kind: 'module', specifier, content: '' });
      }
      return Promise.resolve({ kind: 'module', specifier, content });
    },
  });
  return result[urlStr];
}