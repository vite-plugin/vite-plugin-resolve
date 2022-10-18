import type { Plugin } from 'vite';

export const lib2esm: import('./presets').Lib2esm;

declare module 'vite-plugin-resolve' {
  function resolve(entries: {
    [moduleId: string]:
    | import('rollup').LoadResult
    | Plugin['load'];
  }): Plugin[];

  // https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html#default-exports
  export = resolve;
}
