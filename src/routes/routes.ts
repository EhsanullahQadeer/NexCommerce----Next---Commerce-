const routes = {
    home: "/",
    about: "/about",
    products: "/products",
    productDetails: (slug: string) => `/products/${slug}`,
};

export default routes;
