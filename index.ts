import type { Plugin } from 'vite';
import type { LoadResult } from 'rollup';

interface RESOLVES {
  [moduleId: string]:
    | LoadResult
    | ((id: string, opts?: { ssr?: boolean }) => LoadResult);
}

export default function resolve(resolves: RESOLVES): Plugin[] {
  const prefix = '\0plugin-resolve:';
  const resolveKeys = Object.keys(resolves);
  const resolveKeysWithPrefix = resolveKeys.map(key => prefix + key);

  return [
    {
      name: 'vite-plugin-resolve:resolveId',
      // run before the builtin 'vite:resolve' of Vite
      enforce: 'pre',
      resolveId(source) {
        if (resolveKeys.includes(source)) {
          // https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention
          return prefix + source;
        }
      },
    },
    {
      name: 'vite-plugin-resolve',
      config(config) {
        if (!config.optimizeDeps) config.optimizeDeps = {};
        if (!config.optimizeDeps.exclude) config.optimizeDeps.exclude = [];

        let keys = resolveKeys;
        if (config.optimizeDeps.include) {
          keys = resolveKeys.filter(
            // @ts-ignore
            key => !config.optimizeDeps.include.includes(key)
          );
        }

        config.optimizeDeps.exclude.push(...keys);
      },
      load(id, opts) {
        if (resolveKeysWithPrefix.includes(id)) {
          const stringOrFunction = resolves[id.replace(prefix, '')];
          return typeof stringOrFunction === 'function'
            ? stringOrFunction.apply(this, [id, opts])
            : stringOrFunction;
        }
      },
    },
  ];
}
