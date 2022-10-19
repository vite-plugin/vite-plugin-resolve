declare module 'vite-plugin-resolve' {
  function resolve(entries: {
    [moduleId: string]:
    | import('rollup').LoadResult
    | import('vite').Plugin['load'];
  }): import('vite').Plugin[];

  // https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html#default-exports
  export = resolve;
}
