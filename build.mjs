import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import libEsm from 'lib-esm';

// const iswatch = process.argv.slice(2).includes('--watch');
const CJS = {
  __filename: fileURLToPath(import.meta.url),
  __dirname: path.dirname(fileURLToPath(import.meta.url)),
  require: createRequire(import.meta.url),
};

/**
 * @see https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
 */
const colours = {
  $_$: c => str => `\x1b[${c}m` + str + '\x1b[0m',
  gary: str => colours.$_$(90)(str),
  cyan: str => colours.$_$(36)(str),
  yellow: str => colours.$_$(33)(str),
  green: str => colours.$_$(32)(str),
  red: str => colours.$_$(31)(str),
};

const presetsDir = path.join(CJS.__dirname, 'presets');
const presetRE = /(.+)-(v[\d.]+)\.js$/;
const files = fs.readdirSync(presetsDir).filter(file => presetRE.test(file));

/** @type {Record<string, Record<string, string>>} */
const records = {};
for (const file of files) {
  const [, name, version] = presetRE.exec(file);
  const dot2_ = str => str.replace('.', '_'); // . -> _
  const record = { [dot2_(version)]: file };

  if (records[name]) {
    Object.assign(records[name], record);
  } else {
    records[name] = record;
  }
}

// generate lib.json
const libfile = path.join(presetsDir, 'libs.json');
fs.writeFileSync(libfile, JSON.stringify(records, null, 2));
console.log(
  colours.cyan('[write]'),
  colours.gary(new Date().toLocaleTimeString()),
  libfile,
);

// generate lib.d.ts
const types = [];
for (const [name, versions] of Object.entries(records)) {
  const vs = Object.keys(versions);
  types.push(`export declare const ${name.replaceAll('-', '_')}: {
${vs.map(v => `  ${v}: string`).join('\n')}
}`);
}
const typesfile = path.join(presetsDir, 'libs.d.ts');
fs.writeFileSync(typesfile, types.join('\n'));
console.log(
  colours.cyan('[write]'),
  colours.gary(new Date().toLocaleTimeString()),
  typesfile,
);

// generate index.mjs
const cjsFiles = [
  'presets/index.js'
];
for (const file of cjsFiles) {
  const filename = path.join(CJS.__dirname, file);
  const basename = path.basename(filename);
  const destname = filename.replace('.js', '.mjs');
  const members = Object.keys(CJS.require(filename));
  const result = libEsm({
    require: `./${basename}`,
    exports: members,
  });

  fs.writeFileSync(destname, `${result.require}\n${result.exports}`);
  console.log(
    colours.cyan('[write]'),
    colours.gary(new Date().toLocaleTimeString()),
    destname,
  );
}

console.log(colours.green('build success'));
