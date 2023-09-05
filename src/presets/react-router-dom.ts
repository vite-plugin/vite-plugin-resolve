import type { LibMeta, LibEsmResult } from './type';
import libEsm from 'lib-esm';

interface ReactRouterDomPreset {
  v5: string;
  v6: string;
}

const react_router_dom_v5: LibMeta = {
  name: 'ReactRouterDOM',
  members: [
    'BrowserRouter',
    'HashRouter',
    'Link',
    'MemoryRouter',
    'NavLink',
    'Prompt',
    'Redirect',
    'Route',
    'Router',
    'StaticRouter',
    'Switch',
    'generatePath',
    'matchPath',
    'useHistory',
    'useLocation',
    'useParams',
    'useRouteMatch',
    'withRouter',
  ],
};
const react_router_dom_v6: LibMeta = {
  name: 'ReactRouterDOM',
  members: [
    'MemoryRouter',
    'Navigate',
    'NavigationType',
    'Outlet',
    'Route',
    'Router',
    'Routes',
    'UNSAFE_LocationContext',
    'UNSAFE_NavigationContext',
    'UNSAFE_RouteContext',
    'createPath',
    'createRoutesFromChildren',
    'generatePath',
    'matchPath',
    'matchRoutes',
    'parsePath',
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
    'BrowserRouter',
    'HashRouter',
    'Link',
    'NavLink',
    'createSearchParams',
    'unstable_HistoryRouter',
    'useLinkClickHandler',
    'useSearchParams',
  ],
};

const v5_result: LibEsmResult = libEsm({
  window: react_router_dom_v5.name,
  exports: react_router_dom_v5.members,
});
const v6_result: LibEsmResult = libEsm({
  window: react_router_dom_v6.name,
  exports: react_router_dom_v6.members,
});

export const react_router_dom: ReactRouterDomPreset = {
  v5: `${v5_result.window}\n${v5_result.exports}`,
  v6: `${v6_result.window}\n${v6_result.exports}`,
};
