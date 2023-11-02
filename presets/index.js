const libEsm = require('lib-esm').default;

for (const [name, versions] of Object.entries(require('./libs.json'))) {
  const record = {};
  for (const [version, file] of Object.entries(versions)) {
    /** @type {import('.').LibMeta} */
    const lib = require(`./${file}`);
    const snippets = libEsm({ window: lib.name, exports: lib.members });
    record[version] = `${snippets.window}\n${snippets.exports}`;
  }
  exports[name.replaceAll('-', '_')] = record;
}
