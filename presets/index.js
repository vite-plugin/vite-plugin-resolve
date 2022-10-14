/**
 * @type {import('.').Lib2esm} 
 */
exports.lib2esm = function (name, ...args) {
  if (!args.length) {
    return exports.lib2esm(name, [], {});
  }
  if (args.length === 1) {
    return Object.prototype.toString.call(args[0]) === '[object Object]'
      // lib2esm(name, options)
      ? exports.lib2esm(name, [], args[0])
      // lib2esm(name, members)
      : exports.lib2esm(name, args[0], {})
  }
  const [members, options] = args;
  const { format = 'iife' } = options;

  const keywords = [
    'await',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'enum',
    'export',
    'extends',
    'false',
    'finally',
    'for',
    'function',
    'if',
    'implements',
    'import',
    'in',
    'instanceof',
    'interface',
    'let',
    'new',
    'null',
    'package',
    'private',
    'protected',
    'public',
    'return',
    'super',
    'switch',
    'static',
    'this',
    'throw',
    'try',
    'true',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'yield',
  ];

  const exportMembers = members
    .filter(e => !keywords.includes(e))
    .map(e => `export const ${e} = _M_.${e};`)
    .join('\n');

  const importTpl = format === 'cjs'
    ? `const _M_ = require('${name}');`
    : `const _M_ = window['${name}'];`

  const snippet = `
${importTpl}
const _D_ = _M_.default || _M_;
export { _D_ as default };
${exportMembers}
`.trim();

  return snippet;
};

for (const [name, versions] of Object.entries(require('./libs.json'))) {
  const record = {};
  for (const [version, file] of Object.entries(versions)) {
    /** @type {import('.').LibMeta} */
    const lib = require(`./${file}`);
    record[version] = this.lib2esm(lib.name, lib.members);
  }
  exports[name.replaceAll('-', '_')] = record;
}
