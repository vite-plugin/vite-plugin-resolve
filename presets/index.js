const libEsmSnippet = require('lib-esm-snippet');

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

  const { snippet } = libEsmSnippet({
    lib: name,
    members,
    format,
  });

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
