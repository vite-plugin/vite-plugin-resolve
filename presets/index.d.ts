export interface LibMeta {
  name: string
  members: string[]
}

export interface Lib2esmOptions {
  /**
   * Generate code snippet format
   * 
   * e.g.
   * ```js
   * const _M_ = require('lib') // cjs
   * const _M_ = window['lib'] // iife
   * ```
   * 
   * @default "iife"
   */
  format?: 'cjs' | 'iife',
}
export interface Lib2esm {
  (name: string): string
  (name: string, options: Lib2esmOptions): string
  (name: string, members: string[]): string
  (name: string, members: string[], options: Lib2esmOptions): string
}
export declare const lib2esm: Lib2esm

export declare const antd_vue: {
  v1: string
  v3: string
}

export declare const antd: {
  v4: string
}

export declare const element_plus: {
  v2: string
}

export declare const element_ui: {
  v2: string
}

export declare const pinia: {
  v2: string
}

export declare const react_dom: {
  v17: string
  v18: string
}

export declare const react_router_dom: {
  v5: string
  v6: string
}

export declare const react_router: {
  v5: string
  v6: string
}

export declare const react: {
  v17: string
  v18: string
}

export declare const redux: {
  v5: string
}

export declare const vue_composition_api: {
  v1: string
}

export declare const vue_router: {
  v4: string
}

export declare const vue: {
  v2: string
  v3: string
}

export declare const vuex: {
  v3: string
  v4: string
}