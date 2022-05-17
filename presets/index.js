const antd_vue_v1 = require('./ant-design-vue-v1');
const antd_vue_v3 = require('./ant-design-vue-v3');
const antd_v4 = require('./antd-v4');
const element_plus_v2 = require('./element-plus-v2');
const element_ui_v2 = require('./element-ui-v2');
const pinia_v2 = require('./pinia-v2');
const react_dom_v17 = require('./react-dom-v17');
const react_dom_v18 = require('./react-dom-v18');
const react_router_dom_v5 = require('./react-router-dom-v5');
const react_router_dom_v6 = require('./react-router-dom-v6');
const react_router_v5 = require('./react-router-v5');
const react_router_v6 = require('./react-router-v6');
const react_v17 = require('./react-v17');
const react_v18 = require('./react-v18');
const redux_v5 = require('./redux-v5');
const vue_composition_api_v1 = require('./vue-composition-api-v1');
const vue_router_v4 = require('./vue-router-v4');
const vue_v2 = require('./vue-v2');
const vue_v3 = require('./vue-v3');
const vuex_v3 = require('./vuex-v3');
const vuex_v4 = require('./vuex-v4');

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

  const externalTpl = `
${importTpl}
const _D_ = _M_.default || _M_;
export { _D_ as default }
${exportMembers}
  `.trim();

  return () => externalTpl;
};

exports.antd_vue = {
  v1: this.lib2esm(antd_vue_v1.name, antd_vue_v1.members),
  v3: this.lib2esm(antd_vue_v3.name, antd_vue_v3.members),
}

exports.antd = {
  v4: this.lib2esm(antd_v4.name, antd_v4.members),
};

exports.element_plus = {
  v2: this.lib2esm(element_plus_v2.name, element_plus_v2.members),
};

exports.element_ui = {
  v2: this.lib2esm(element_ui_v2.name, element_ui_v2.members),
};

exports.pinia = {
  v2: this.lib2esm(pinia_v2.name, pinia_v2.members),
};

exports.react_dom = {
  v17: this.lib2esm(react_dom_v17.name, react_dom_v17.members),
  v18: this.lib2esm(react_dom_v18.name, react_dom_v18.members),
};

exports.react_router_dom = {
  v5: this.lib2esm(react_router_dom_v5.name, react_router_dom_v5.members),
  v6: this.lib2esm(react_router_dom_v6.name, react_router_dom_v6.members),
};

exports.react_router = {
  v5: this.lib2esm(react_router_v5.name, react_router_v5.members),
  v6: this.lib2esm(react_router_v6.name, react_router_v6.members),
};

exports.react = {
  v17: this.lib2esm(react_v17.name, react_v17.members),
  v18: this.lib2esm(react_v18.name, react_v18.members),
};

exports.redux = {
  v5: this.lib2esm(redux_v5.name, redux_v5.members),
};

exports.vue_composition_api = {
  v1: this.lib2esm(vue_composition_api_v1.name, vue_composition_api_v1.members),
};

exports.vue_router = {
  v4: this.lib2esm(vue_router_v4.name, vue_router_v4.members),
};

exports.vue = {
  v2: this.lib2esm(vue_v2.name, vue_v2.members),
  v3: this.lib2esm(vue_v3.name, vue_v3.members),
};

exports.vuex = {
  v3: this.lib2esm(vuex_v3.name, vuex_v3.members),
  v4: this.lib2esm(vuex_v4.name, vuex_v4.members),
};