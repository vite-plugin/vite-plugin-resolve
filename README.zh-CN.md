# vite-plugin-resolve

自定义加载模块内容

[![NPM version](https://img.shields.io/npm/v/vite-plugin-resolve.svg)](https://npmjs.org/package/vite-plugin-resolve)
[![NPM Downloads](https://img.shields.io/npm/dm/vite-plugin-resolve.svg?style=flat)](https://npmjs.org/package/vite-plugin-resolve)
[![awesome-vite](https://awesome.re/badge.svg)](https://github.com/vitejs/awesome-vite)

**[English](https://github.com/vite-plugin/vite-plugin-resolve#readme) | 简体中文**

🤔 你可以认为它是官方教程的一个实现 👉 [Virtual Modules Convention](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention)  
📦 **开箱即用**, 内置 Vue, React, Antd, Element 等等  
🌱 支持自定义 external 代码段  
✅ Browser, Node.js, Electron  

## 安装

```bash
npm i vite-plugin-resolve -D
```

## 使用

你可以加载任何你想要的代码段 **（ESM 格式）**

```ts
import resolve from 'vite-plugin-resolve'

export default {
  plugins: [
    resolve({
      // Browser
      vue: `
        const vue = window.Vue;
        const version = vue.version;
        export {
          vue as default,
          version,
        }
      `,
      // Node.js, Electron
      electron: `
        const { ipcRenderer, shell } = require('electron');
        export {
          ipcRenderer,
          shell,
        }
      `,
    }),
  ]
}

// 使用
import Vue, { version } from 'vue'
import { ipcRenderer, shell } from 'electron'
```

你可以很容易地使用 `lib2esm()` 来定制一些内容

```js
import resolve, { lib2esm } from 'vite-plugin-resolve'

export default {
  plugins: [
    resolve({
      // 用 lodash 举个 🌰
      lodash: lib2esm(
        // lodash 全局名称
        '_',
        // export memebers
        [
          'chunk',
          'curry',
          'debounce',
          'throttle',
        ],
      ),
    }),
  ]
}

// 使用
import _, { chunk, curry, debounce, throttle } from 'lodash'
```

**在 Electron 中使用** 👉 [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue/blob/main/packages/renderer/vite.config.ts)

## 内置模块

这个场景就是 Vite external plugin

```js
import resolve from 'vite-plugin-resolve'
import {
  antd_vue,
  antd,
  element_plus,
  element_ui,
  pinia,
  react_dom,
  react_router_dom,
  react_router,
  react,
  redux,
  vue_composition_api,
  vue_router,
  vue,
  vuex,
} from 'vite-plugin-resolve/presets'

export default {
  plugins: [
    resolve({
      // e.g.
      // external-lib: lib-name.version
      vue: vue.v3,
      react: react.v18,
    }),
  ]
}

// 使用
import Vue, { ref, reactive, computed, watch } from 'vue'
import React, { useState, useEffect } from 'react'
```

## API <sub><sup>(Define)</sup></sub>

`resolve(entries)`

```ts
import type { Plugin } from 'vite';

export interface VitePluginResolve {
  (entries: {
    [moduleId: string]:
      | ReturnType<Plugin['load']>
      | ((...args: Parameters<Plugin['load']>) => ReturnType<Plugin['load']>)
  }): Plugin[];
}
```

*你可以在此处看到返回值类型定义 [rollup/types.d.ts#L272](https://github.com/rollup/rollup/blob/b8315e03f9790d610a413316fbf6d565f9340cab/src/rollup/types.d.ts#L272)*

`lib2esm(name[,members[,options]])`

```ts
export interface Lib2esmOptions {
  /**
   * 生成代码段格式
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
```


## 这与官方的 Demo 有何异同？

主要有两点不一样

1. 绕过内置的 `vite:resolve` 插件
2. 合理的避开 [Pre-Bundling](https://vitejs.dev/guide/dep-pre-bundling.html)
