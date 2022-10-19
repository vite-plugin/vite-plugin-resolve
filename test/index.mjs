import path from 'node:path';
import cp from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { strict as assert } from 'node:assert';
import { build } from 'vite';
import resolve from '../index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await build({
  root: __dirname,
  build: {
    minify: false,
    outDir: '',
    emptyOutDir: false,
    lib: {
      entry: '-.js',
      formats: ['es'],
      fileName: format => format === 'cjs' ? '[name].cjs' : '[name].mjs',
    },
  },
  plugins: [
    resolve({
      foo: `
const message = 'foo';
export {
  message,
};
`,
    }),
  ],
});

cp.spawn('node', ['./-.mjs'], { cwd: __dirname })
  .stdout.on('data', chunk => {
    const str = chunk.toString().trim();
    assert.equal(str, 'foo');
    console.log('test success');
  });

