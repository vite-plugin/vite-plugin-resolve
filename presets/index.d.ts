export * from './libs'

export interface LibMeta {
  name: string
  members: string[]
}

export interface Lib2esmOptions {
  /**
   * Generate code snippet format
   * 
   * 🌰 e.g.
   * ```js
   * const _M_ = require('lib') // cjs
   * const _M_ = window['lib'] // iife
   * ```
   * 
   * @default "iife"
   */
  format?: "cjs" | "iife",
}
export interface Lib2esm {
  (name: string, options?: Lib2esmOptions): string
  (name: string, members: string[], options?: Lib2esmOptions): string
}
export declare const lib2esm: Lib2esm
