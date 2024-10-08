const routes = {
    home: "/",
    auth: "/auth",
    about: "/about",
    products: "/products",
    productDetails: (slug: string) => `/products/${slug}`,
    account: "/account",
    orders: "/account/orders",
    addresses: "/account/addresses",
    accountDetails: "/account/account-details"
};
// these are the routes user can only access when he is logged in
export const protectedRoutes = [
    routes.account,
]
export default routes;
