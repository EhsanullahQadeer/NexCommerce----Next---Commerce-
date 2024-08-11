import dynamic from 'next/dynamic';
import ProductFilters from "@/components/Filters/ProductFilters";
 
const GridLayout = dynamic(() => import('@/components/GridLayout'), { ssr: false })

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
