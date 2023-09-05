import type { LibMeta, LibEsmResult } from './type';
import libEsm from 'lib-esm';

interface PiniaPreset {
  v2: string;
}

const pinia_v2: LibMeta = {
  name: 'Pinia',
  members: [
    'MutationType',
    'PiniaVuePlugin',
    'acceptHMRUpdate',
    'createPinia',
    'defineStore',
    'getActivePinia',
    'mapActions',
    'mapGetters',
    'mapState',
    'mapStores',
    'mapWritableState',
    'setActivePinia',
    'setMapStoreSuffix',
    'skipHydrate',
    'storeToRefs',
  ],
};

const v2_result: LibEsmResult = libEsm({
  window: pinia_v2.name,
  exports: pinia_v2.members,
});

export const pinia: PiniaPreset = {
  v2: `${v2_result.window}\n${v2_result.exports}`,
};
