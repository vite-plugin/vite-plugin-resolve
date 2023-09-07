import { spawn } from 'node:child_process';
import { builtinModules } from 'node:module';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  build: {
    minify: false,
    emptyOutDir: true,
    target: 'node14',
    lib: {
      entry: {
        index: './index.ts'
      },
      formats: ['cjs', 'es'],
      fileName: format => (format === 'es' ? '[name].mjs' : '[name].js'),
    },
    rollupOptions: {
      external: [
        'vite',
        ...builtinModules,
        ...builtinModules.map(m => `node:${m}`),
        ...Object.keys(
          'dependencies' in pkg ? (pkg.dependencies as object) : {}
        ),
      ],
      output: {
        exports: 'named',
      },
    },
  },
  plugins: [
    {
      name: 'generate-types',
      async closeBundle() {
        if (process.env.NODE_ENV === 'test') return;
        await generateTypes();
      },
    },
  ],
});

function generateTypes() {
  return new Promise(resolve => {
    const cp = spawn(
      process.platform === 'win32' ? 'npm.cmd' : 'npm',
      ['run', 'types'],
      { stdio: 'inherit' }
    );
    cp.on('exit', code => {
      !code && console.log('[types]', 'declaration generated');
      resolve(code);
    });
    cp.on('error', process.exit);
  });
}
