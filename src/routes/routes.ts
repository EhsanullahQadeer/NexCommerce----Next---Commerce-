const routes = {
    home: "/",
    about: "/about",
    products: "/products",
    productDetails: (slug: string) => `/products/${slug}`,
    account: "/account",
    orders: "/account/orders",
    addresses: "/account/addresses",
    accountDetails: "/account/account-details"
};

export default routes;
