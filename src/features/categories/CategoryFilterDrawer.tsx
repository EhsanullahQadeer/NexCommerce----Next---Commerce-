import { useDispatch, useSelector } from "react-redux";
import {
  selectProductCategories,
  toggleFilters,
} from "@/store/slices/categories/categoriesSlice";
import ToggleFilters from "@/components/Filters/ToggleFilters";
import CleanAllButton from "@/components/Filters/CleanAllButton";
import Collapse from "@/components/Collapse";
import CategoryFilter from "../elements/CategoryFilters";
import PriceRangeInput from "@/components/PriceRangeInput";
import ColourFilters from "../elements/ColourFilters";
import { lazy, useEffect } from "react";
import {
  _clearFilter,
  selectProducts,
  Torigin,
} from "@/store/slices/products/productsSlice";

const Drawer = lazy(() => import("@/components/Drawer"));
const origin: Torigin = "productPage";
const CategoryFilterDrawer = () => {
  const { productCategories } = useSelector(selectProducts);
  const { isToggleFilters } = useSelector(selectProductCategories);
  const dispatch = useDispatch();
  const sizeFiltersResults = [
    { key: "Small", label: "Small" },
    { key: "Medium", label: "Medium" },
    { key: "Large", label: "Large" },
  ];

  const cleanFilters = () => {
    dispatch(_clearFilter({ payload: null, origin: "productPage" }));
  };
  
  // useEffect(() => {
  //     cleanFilters();
  // }, []);
  return (
    <Drawer
      isOpen={isToggleFilters}
      onClose={() => dispatch(toggleFilters(false))}
      id="product-filters-drawer"
      title="Filters"
      hideCloseIcon
    >
      <div className="px-[27px] pt-[35px] pb-[15px]">
        <div className="flex items-center justify-between pb-6 border-b border-black-300">
          <ToggleFilters
            isToggle={isToggleFilters}
            handleToggle={() => dispatch(toggleFilters(false))}
          />
          <CleanAllButton onClick={cleanFilters} />
        </div>
        <Collapse title="Category" isOpen>
          <CategoryFilter categories={productCategories} origin={origin} />
        </Collapse>
        {/* <Collapse title="Size" isOpen>
          <CategoryFilter categories={sizeFiltersResults} />
        </Collapse> */}
        <Collapse title="Colour" isOpen>
          <ColourFilters origin={origin} isHorizontal />
        </Collapse>
        <Collapse title="Price Range" isOpen>
          <PriceRangeInput origin={origin} />
        </Collapse>
      </div>
    </Drawer>
  );
};

export default CategoryFilterDrawer;
