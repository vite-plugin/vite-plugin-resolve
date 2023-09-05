import type { LibMeta, LibEsmResult } from './type';
import libEsm from 'lib-esm';

interface ReactDomPreset {
  v17: string;
  v18: string;
}

const react_dom_v17: LibMeta = {
  name: 'ReactDOM',
  members: [
    '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
    'createPortal',
    'findDOMNode',
    'flushSync',
    'hydrate',
    'render',
    'unmountComponentAtNode',
    'unstable_batchedUpdates',
    'unstable_createPortal',
    'unstable_renderSubtreeIntoContainer',
    'version',
  ],
};
const react_dom_v18: LibMeta = {
  name: 'ReactDOM',
  members: [
    '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
    'createPortal',
    'createRoot',
    'findDOMNode',
    'flushSync',
    'hydrate',
    'hydrateRoot',
    'render',
    'unmountComponentAtNode',
    'unstable_batchedUpdates',
    'unstable_renderSubtreeIntoContainer',
    'version',
  ],
};

const v17_result: LibEsmResult = libEsm({
  window: react_dom_v17.name,
  exports: react_dom_v17.members,
});
const v18_result: LibEsmResult = libEsm({
  window: react_dom_v18.name,
  exports: react_dom_v18.members,
});

export const react_dom: ReactDomPreset = {
  v17: `${v17_result.window}\n${v17_result.exports}`,
  v18: `${v18_result.window}\n${v18_result.exports}`,
};
