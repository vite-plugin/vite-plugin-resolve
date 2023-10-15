# vite-plugin-resolve

Custom resolve module content

[![NPM version](https://img.shields.io/npm/v/vite-plugin-resolve.svg)](https://npmjs.org/package/vite-plugin-resolve)
[![NPM Downloads](https://img.shields.io/npm/dm/vite-plugin-resolve.svg?style=flat)](https://npmjs.org/package/vite-plugin-resolve)
[![awesome-vite](https://awesome.re/badge.svg)](https://github.com/vitejs/awesome-vite)

**English | [简体中文](https://github.com/vite-plugin/vite-plugin-resolve/blob/main/README.zh-CN.md)**

- 🤔 You can think of this as the implementation of the official tutorial 👉 [Virtual Modules Convention](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention)
- 🌱 What you see is what you get
- 📦 Out of the box <sub><sup>(builtin Vue, React, Antd, Element and others)</sup></sub>
- 🚀 Browser, Node.js, Electron

## Install

```bash
npm i vite-plugin-resolve -D
```

## Usage

You can load any code snippets you want **(ESM format)**

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

// Use in your app
import Vue, { version } from 'vue'
import { ipcRenderer, shell } from 'electron'

// Make sure that index.html has introduced the CDN file.
// e.g.
// <script src="https://unpkg.com/vue@3.2.45/dist/vue.global.js"></script>
```

Use with [lib-esm](https://www.npmjs.com/package/lib-esm)

```sh
npm i lib-esm
```

```js
import resolve from 'vite-plugin-resolve'
import libEsm from 'lib-esm'

export default {
  plugins: [
    resolve({
      // Let's use lodash as an example
      lodash: () => {
        const result = libEsm({
          // lodash iife name
          window: '_',
          // export memebers
          exports: [
            'chunk',
            'curry',
            'debounce',
            'throttle',
          ],
        })
        return `${result.window}\n${result.exports}`
      },
    }),
  ],
}

// Use in your app
import _, { chunk, curry, debounce, throttle } from 'lodash'
```

**Use in Electron** 👉 [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue/blob/main/packages/renderer/vite.config.ts)

## Builtin modules

This like Vite external plugin

```js
import resolve from 'vite-plugin-resolve'
import {
  ant_design_vue,
  antd,
  axios,
  element_plus,
  element_ui,
  pinia,
  react_dom,
  react_router_dom,
  react_router,
  react,
  redux,
  vue_composition_api,
  vue_demi,
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

// Use in your app
import Vue, { ref, reactive, computed, watch } from 'vue'
import React, { useState, useEffect } from 'react'
```

## API <sub><sup>(Define)</sup></sub>

`resolve(entries)`

```ts
function resolve(entries: {
  [moduleId: string]:
  | import('rollup').LoadResult
  | import('vite').Plugin['load'];
}): import('vite').Plugin[];
```

*You can see the return value type definition here [rollup/types.d.ts#L272](https://github.com/rollup/rollup/blob/b8315e03f9790d610a413316fbf6d565f9340cab/src/rollup/types.d.ts#L272)*

## What's different from the official Demo?

There are two main differences

1. Bypass the builtin `vite:resolve` plugin
2. Reasonably avoid [Pre-Bundling](https://vitejs.dev/guide/dep-pre-bundling.html)
