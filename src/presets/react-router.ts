import type { LibMeta, LibEsmResult } from './type';
import libEsm from 'lib-esm';

interface ReactRouterPreset {
  v5: string;
  v6: string;
}

const react_router_v5: LibMeta = {
  name: 'ReactRouter',
  members: [
    'MemoryRouter',
    'Prompt',
    'Redirect',
    'Route',
    'Router',
    'StaticRouter',
    'Switch',
    '__HistoryContext',
    '__RouterContext',
    'generatePath',
    'matchPath',
    'useHistory',
    'useLocation',
    'useParams',
    'useRouteMatch',
    'withRouter',
  ],
};

const react_router_v6: LibMeta = {
  name: 'ReactRouter',
  members: [
    'NavigationType',
    'createPath',
    'parsePath',
    'MemoryRouter',
    'Navigate',
    'Outlet',
    'Route',
    'Router',
    'Routes',
    'UNSAFE_LocationContext',
    'UNSAFE_NavigationContext',
    'UNSAFE_RouteContext',
    'createRoutesFromChildren',
    'generatePath',
    'matchPath',
    'matchRoutes',
    'renderMatches',
    'resolvePath',
    'useHref',
    'useInRouterContext',
    'useLocation',
    'useMatch',
    'useNavigate',
    'useNavigationType',
    'useOutlet',
    'useOutletContext',
    'useParams',
    'useResolvedPath',
    'useRoutes',
  ],
};

const v5_result: LibEsmResult = libEsm({
  window: react_router_v5.name,
  exports: react_router_v5.members,
});
const v6_result: LibEsmResult = libEsm({
  window: react_router_v6.name,
  exports: react_router_v6.members,
});

export const react_router: ReactRouterPreset = {
  v5: `${v5_result.window}\n${v5_result.exports}`,
  v6: `${v6_result.window}\n${v6_result.exports}`,
};
