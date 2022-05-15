# vite-plugin-resolve

Custom resolve module content

[![NPM version](https://img.shields.io/npm/v/vite-plugin-resolve.svg)](https://npmjs.org/package/vite-plugin-resolve)
[![NPM Downloads](https://img.shields.io/npm/dm/vite-plugin-resolve.svg?style=flat)](https://npmjs.org/package/vite-plugin-resolve)
[![awesome-vite](https://awesome.re/badge.svg)](https://github.com/vitejs/awesome-vite)

**English | [简体中文](https://github.com/vite-plugin/vite-plugin-resolve/blob/main/README.zh-CN.md)**

🤔 You can think of this as the implementation of the official tutorial 👉 [Virtual Modules Convention](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention)  
📦 **Out of the box**, builtin Vue, React, Antd, Element and others  
🌱 Support custom code snippets  
✅ Browser, Node.js, Electron  

## Install

```bash
npm i vite-plugin-resolve -D
```

## Usage

You can load any code snippet you want

```ts
import resolve from 'vite-plugin-resolve'

export default {
  plugins: [
    resolve({
      // Browser
      vue: `
        const vue = window.Vue; 
        export { vue as default };
        export const version = vue.version;
      `,
      // Node.js, Electron
      electron: `
        const { ipcRenderer, shell } = require('electron');
        export {
          ipcRenderer,
          shell,
        }
        // ...others
      `,
    }),
  ]
}
```

In you App

```ts
import Vue, { version } from 'vue'
import { ipcRenderer, shell } from 'electron'
```

**Load a file**

Support nested module id, support return Promise

```ts
import fs from 'fs'

resolve({
  'path/filename': () => fs.promise.readFile('path', 'utf-8'),
})
```

## API

`resolve(entries)`

**entries**

```ts
{
  [moduleId: string]:
    | ReturnType<Plugin['load']>
    | ((...args: Parameters<Plugin['load']>) => ReturnType<Plugin['load']>)
}
```

You can see the return value type definition here [rollup/types.d.ts#L272](https://github.com/rollup/rollup/blob/b8315e03f9790d610a413316fbf6d565f9340cab/src/rollup/types.d.ts#L272)

## Use builtin modules

This like Vite external plugin

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
      // external-name: lib-name.version
      vue: vue.v3,
      react: react.v18,
    }),
  ]
}

// Use in your app
import { h, ref, reactive, watch } from 'vue'
```

**Advance**, you can use `lib2esm()` to customize some things

```js
import resolve from 'vite-plugin-resolve'
import { lib2esm } from 'vite-plugin-resolve/presets'
export default {
  plugins: [
    resolve({
      // Let's use lodash as an example
      lodash: lib2esm(
        // lodash iife name
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

// Use in your app
import { chunk, curry, debounce, throttle } from 'lodash'
```

**Use in Electron** 👉 [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue/blob/main/packages/renderer/vite.config.ts)

## What's different from the official Demo?

There are two main differences

1. Bypass the builtin `vite:resolve` plugin
2. Reasonably avoid [Pre-Bundling](https://vitejs.dev/guide/dep-pre-bundling.html)
