import type { LibMeta, LibEsmResult } from './type';
import libEsm from 'lib-esm';

interface ReactPreset {
  v17: string;
  v18: string;
}

const react_v17: LibMeta = {
  name: 'React',
  members: [
    'Fragment',
    'StrictMode',
    'Profiler',
    'Suspense',
    'Children',
    'Component',
    'PureComponent',
    '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
    'cloneElement',
    'createContext',
    'createElement',
    'createFactory',
    'createRef',
    'forwardRef',
    'isValidElement',
    'lazy',
    'memo',
    'useCallback',
    'useContext',
    'useDebugValue',
    'useEffect',
    'useImperativeHandle',
    'useLayoutEffect',
    'useMemo',
    'useReducer',
    'useRef',
    'useState',
    'version',
  ],
};

const react_v18: LibMeta = {
  name: 'React',
  members: [
    'Children',
    'Component',
    'Fragment',
    'Profiler',
    'PureComponent',
    'StrictMode',
    'Suspense',
    '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
    'cloneElement',
    'createContext',
    'createElement',
    'createFactory',
    'createRef',
    'forwardRef',
    'isValidElement',
    'lazy',
    'memo',
    'startTransition',
    'unstable_act',
    'useCallback',
    'useContext',
    'useDebugValue',
    'useDeferredValue',
    'useEffect',
    'useId',
    'useImperativeHandle',
    'useInsertionEffect',
    'useLayoutEffect',
    'useMemo',
    'useReducer',
    'useRef',
    'useState',
    'useSyncExternalStore',
    'useTransition',
    'version',
  ],
};

const v17_result: LibEsmResult = libEsm({
  window: react_v17.name,
  exports: react_v17.members,
});
const v18_result: LibEsmResult = libEsm({
  window: react_v18.name,
  exports: react_v18.members,
});

export const react: ReactPreset = {
  v17: `${v17_result.window}\n${v17_result.exports}`,
  v18: `${v18_result.window}\n${v18_result.exports}`,
};
