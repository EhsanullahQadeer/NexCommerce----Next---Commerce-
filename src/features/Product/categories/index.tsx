import ProductFilters from "@/components/Filters/ProductFilters";
import ProductList from "@/components/ProductList";
import { products } from "./fakeProducts";

const ProductCategories = () => {
  return (
    <div className="max-w-container mx-auto px-2.5 !pt-10">
      <ProductFilters />
      <ProductList products={products} />
    </div>
  )
}

export default ProductCategories;
