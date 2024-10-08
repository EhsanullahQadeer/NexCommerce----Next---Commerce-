import routesObj from "@/routes/routes";

interface Route {
  name: string;
  url: string;
  childRoutes?: boolean
}

export const routes: Route[] = [
  { name: 'Home', url: routesObj.home },
  { name: 'Account', url: routesObj.account, childRoutes: true },
  { name: 'Categories', url: routesObj.categories },
  { name: 'Products', url: routesObj.products },
];
