const libEsm = require('lib-esm').default;

for (const [name, versions] of Object.entries(require('./libs.json'))) {
  const record = {};
  for (const [version, file] of Object.entries(versions)) {
    /** @type {import('.').LibMeta} */
    const lib = require(`./${file}`);
    const result = libEsm({ window: lib.name, exports: lib.members });
    record[version] = `${result.window}\n${result.exports}`;
  }
  exports[name.replaceAll('-', '_')] = record;
}
