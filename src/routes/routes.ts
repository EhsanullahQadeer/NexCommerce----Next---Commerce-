const routes = {
    home: "/",
    auth: "/auth",
    about: "/about",
    cart: "/cart",
    checkout: "/checkout",
    whishlist: "/whishlist",
    categories: "/categories",
    // 
    products: "/products",
    productDetails: (slug: string) => `/products/${slug}`,
    // 
    account: "/account",
    orders: "/account/orders",
    addresses: "/account/addresses",
    accountDetails: "/account/account-details",
    supportTickets: "/account/support-tickets",
    notifications: "/account/notifications"

};
// these are the routes user can only access when he is logged in
export const protectedRoutes = [
    routes.account,
    routes.cart,
    routes.checkout,
    routes.whishlist]
export default routes;
