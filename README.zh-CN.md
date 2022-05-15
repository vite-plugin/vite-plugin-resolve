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

你可以加载任何你想要的代码段

```ts
import resolve from 'vite-plugin-resolve'

export default {
  plugins: [
    resolve({
      // Browser
      vue: `
        const vue = window.Vue;
        export { vue as default }
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

你的逻辑代码

```ts
import Vue, { version } from 'vue'
import { ipcRenderer, shell } from 'electron'
```

**加载文件**

支持嵌套模块命名，支持返回 Promise

```ts
import fs from 'fs'

resolve({
  'path/filename': () => fs.promise.readFile('path', 'utf-8'),
})
```

## API

#### resolve(entries)

**entries**

```ts
{
  [moduleId: string]:
    | ReturnType<Plugin['load']>
    | ((...args: Parameters<Plugin['load']>) => ReturnType<Plugin['load']>)
}
```

详细的返回值类型看这里 [rollup/types.d.ts#L272](https://github.com/rollup/rollup/blob/b8315e03f9790d610a413316fbf6d565f9340cab/src/rollup/types.d.ts#L272)

## 使用内置模块

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
      vue: vue.v3,
    }),
  ]
}
// 使用
import { h, ref, reactive, watch } from 'vue'
```

**Advance**, you can use `lib2esm()` to customize some things

```js
import resolve from 'vite-plugin-resolve'
import { lib2esm } from 'vite-plugin-resolve/presets'
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
import { chunk, curry, debounce, throttle } from 'lodash'
```

**在 Electron 中使用** 👉 [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue/blob/main/packages/renderer/vite.config.ts)


## 这与官方的 Demo 有何异同？

主要有两点不一样

1. 绕过内置的 `vite:resolve` 插件
2. 合理的避开 [Pre-Bundling](https://vitejs.dev/guide/dep-pre-bundling.html)
