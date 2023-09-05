import type { LibMeta, LibEsmResult } from './type';
import libEsm from 'lib-esm';

interface VuexPreset {
  v3: string;
  v4: string;
}

const vuex_v3: LibMeta = {
  name: 'Vuex',
  members: [
    'version',
    'Store',
    'install',
    'mapState',
    'mapMutations',
    'mapGetters',
    'mapActions',
    'createNamespacedHelpers',
    'createLogger',
  ],
};
const vuex_v4: LibMeta = {
  name: 'Vuex',
  members: [
    'version',
    'Store',
    'storeKey',
    'createStore',
    'useStore',
    'mapState',
    'mapMutations',
    'mapGetters',
    'mapActions',
    'createNamespacedHelpers',
    'createLogger',
  ],
};

const v3_result: LibEsmResult = libEsm({
  window: vuex_v3.name,
  exports: vuex_v3.members,
});
const v4_result: LibEsmResult = libEsm({
  window: vuex_v4.name,
  exports: vuex_v4.members,
});

export const vuex: VuexPreset = {
  v3: `${v3_result.window}\n${v3_result.exports}`,
  v4: `${v4_result.window}\n${v4_result.exports}`,
};
