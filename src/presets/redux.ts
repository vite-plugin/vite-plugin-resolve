import type { LibMeta, LibEsmResult } from './type';
import libEsm from 'lib-esm';

interface ReduxPreset {
  v5: string;
}

const redux_v5: LibMeta = {
  name: 'Redux',
  members: [
    '__DO_NOT_USE__ActionTypes',
    'applyMiddleware',
    'bindActionCreators',
    'combineReducers',
    'compose',
    'createStore',
  ],
};

const v5_result: LibEsmResult = libEsm({
  window: redux_v5.name,
  exports: redux_v5.members,
});

export const redux: ReduxPreset = {
  v5: `${v5_result.window}\n${v5_result.exports}`,
};
