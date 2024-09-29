const ProductNotFound = () => {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center text-center p-6 rounded-lg">
      <h2 className="text-xl font-semibold  text-black-75 mb-2">
        No Products Found
      </h2>
      <p className="text-gray-500">
        Sorry, we couldn{`'`}t find any products. Please adjust your filters or
        check back later.
      </p>
    </div>
  );
};

export default ProductNotFound;
