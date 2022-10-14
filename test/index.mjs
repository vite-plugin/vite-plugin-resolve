import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lib2esm } from '../index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const destpath = path.join(__dirname, '__snapshots__');
fs.rmSync(destpath, { recursive: true, force: true });

const maps = [
  {
    name: 'iife',
    members: [
      'default',
      'delete',
      'foo',
      'bar',
    ],
  },
  {
    name: './cjs',
    members: [
      'default',
      'delete',
      'foo',
      'bar',
    ],
    format: 'cjs',
  },
];

for (const map of maps) {
  const code = lib2esm(map.name, map.members, { format: map.format });
  fs.mkdirSync(destpath, { recursive: true });
  fs.writeFileSync(path.join(destpath, `${map.name}.mjs`), code);
}
