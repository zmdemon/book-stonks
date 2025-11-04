import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import MainPage from './pages/MainPage.tsx';
import HomePage from '@/pages/HomePage/HomePage.tsx';

export const rootRoute = createRootRoute({
  component: MainPage,
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <HomePage />
    );
  },
});

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
