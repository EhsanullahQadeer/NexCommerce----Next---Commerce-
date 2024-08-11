import { FC } from "react";
import ProductCard from "../Cards/ProductCard";
import { Product } from "@/features/Product/categories/fakeProducts";
import Button from "../Button";

interface ProductListProps {
  products: Product[];
}

const ProductList: FC<ProductListProps> = ({ products = [] }) => {
  return (
    <div className="mb-[70px]">
      <div className="grid grid-cols-4 gap-5 mt-5">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
      <Button variant="outlined" className="mx-auto uppercase">more products <i className="las la-sync-alt ml-2.5"></i></Button>
    </div>
  )
}

export default ProductList;
