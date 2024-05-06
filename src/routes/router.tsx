import {Favorites, Home, Playing, Popular, Rated} from '../pages';
import {RouteObject, createBrowserRouter} from "react-router-dom";

import PrivateRouter from './privateRouter';
import PublicRouter from './publicRouter';
import {ROUTES} from './constants';
import Show from "../pages/Show/Show";

const routes: RouteObject[] = [
    {
        path: '/', element: <PrivateRouter/>,
        children: [
            {path: ROUTES.HOME, element: <Home/>},
            {path: ROUTES.POPULAR, element: <Popular/>},
            {path: `${ROUTES.SHOW}:id`, element: <Show/>},
            {path: ROUTES.RATED, element: <Rated/>},
            {path: ROUTES.PLAYING, element: <Playing/>},
            {path: ROUTES.FAVORITES, element: <Favorites/>}
        ]
    },
    {
        path: '/login', element: <PublicRouter/>,
        children: [
            {path: '/login', element: <div>Login</div>}
        ]
    }
]

export const router = createBrowserRouter(routes);