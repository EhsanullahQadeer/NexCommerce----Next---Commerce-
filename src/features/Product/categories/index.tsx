import ProductFilters from "@/components/Filters/ProductFilters";
import GridLayout from "@/components/GridLayout";

const ProductCategories = () => {
  return (
    <div>
      <div className="max-w-container mx-auto px-2.5 !pt-10">
        <ProductFilters />
      </div>
      <div className="max-w-[1188px] mx-auto">
        <GridLayout />
      </div>
    </div>
  )
}

export default ProductCategories;
