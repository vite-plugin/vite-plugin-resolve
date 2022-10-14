import type { Plugin } from 'vite';

export default resolve;
declare const resolve: VitePluginResolve;

export interface VitePluginResolve {
  (entries: {
    [moduleId: string]:
      | ReturnType<Plugin['load']>
      | ((...args: Parameters<Plugin['load']>) => ReturnType<Plugin['load']>)
  }): Plugin[];
}

export const lib2esm: import('./presets').Lib2esm;