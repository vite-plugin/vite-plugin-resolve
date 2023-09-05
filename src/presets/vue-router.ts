import type { LibMeta, LibEsmResult } from './type';
import libEsm from 'lib-esm';

interface VueRouterPreset {
  v4: string;
}

const vue_router_v4: LibMeta = {
  name: 'VueRouter',
  members: [
    'NavigationFailureType',
    'RouterLink',
    'RouterView',
    'START_LOCATION',
    'createMemoryHistory',
    'createRouter',
    'createRouterMatcher',
    'createWebHashHistory',
    'createWebHistory',
    'isNavigationFailure',
    'matchedRouteKey',
    'onBeforeRouteLeave',
    'onBeforeRouteUpdate',
    'parseQuery',
    'routeLocationKey',
    'routerKey',
    'routerViewLocationKey',
    'stringifyQuery',
    'useLink',
    'useRoute',
    'useRouter',
    'viewDepthKey',
  ],
};

const v4_result: LibEsmResult = libEsm({
  window: vue_router_v4.name,
  exports: vue_router_v4.members,
});

export const vue_router: VueRouterPreset = {
  v4: `${v4_result.window}\n${v4_result.exports}`,
};
