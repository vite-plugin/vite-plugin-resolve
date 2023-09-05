import type { LibMeta, LibEsmResult } from './type';
import libEsm from 'lib-esm';

interface VueCompositionApiPreset {
  v1: string;
}

const vue_composition_api_v1: LibMeta = {
  name: 'VueCompositionAPI',
  members: [
    'EffectScope',
    'computed',
    'createApp',
    'createRef',
    'customRef',
    'default',
    'defineAsyncComponent',
    'defineComponent',
    'del',
    'effectScope',
    'getCurrentInstance',
    'getCurrentScope',
    'h',
    'inject',
    'isRaw',
    'isReactive',
    'isReadonly',
    'isRef',
    'markRaw',
    'nextTick',
    'onActivated',
    'onBeforeMount',
    'onBeforeUnmount',
    'onBeforeUpdate',
    'onDeactivated',
    'onErrorCaptured',
    'onMounted',
    'onScopeDispose',
    'onServerPrefetch',
    'onUnmounted',
    'onUpdated',
    'provide',
    'proxyRefs',
    'reactive',
    'readonly',
    'ref',
    'set',
    'shallowReactive',
    'shallowReadonly',
    'shallowRef',
    'toRaw',
    'toRef',
    'toRefs',
    'triggerRef',
    'unref',
    'useAttrs',
    'useCSSModule',
    'useCssModule',
    'useSlots',
    'version',
    'warn',
    'watch',
    'watchEffect',
    'watchPostEffect',
    'watchSyncEffect',
  ],
};

const v1_result: LibEsmResult = libEsm({
  window: vue_composition_api_v1.name,
  exports: vue_composition_api_v1.members,
});

export const vue_composition_api: VueCompositionApiPreset = {
  v1: `${v1_result.window}\n${v1_result.exports}`,
};
