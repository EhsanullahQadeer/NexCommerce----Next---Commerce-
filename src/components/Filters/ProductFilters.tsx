"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import FilterCollapse from "../../features/elements/FilterCollase";
import { useDispatch, useSelector } from "react-redux";
import {
  _clearFilter,
  _handleFilterKeyChange,
  _handleOtherFilter,
  clearFilter,
  handleFilterKeyChange,
  selectHomePageProducts,
  selectProducts,
} from "@/store/slices/products/productsSlice";
import ProductCategoriesList from "./ProductCategoriesList";
import ToggleFilters from "./ToggleFilters";
import CleanAllButton from "./CleanAllButton";

const ProductFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("isOpen: ", isOpen);
  const dispatch = useDispatch();
  const { productCategories } = useSelector(selectProducts);
  const { filterKey } = useSelector(selectHomePageProducts);
  const handleCleanFilters = () => {
    dispatch(_clearFilter({ origin: "homePage", payload: null }));
  };
  

  useEffect(() => {
    // reset value to all when more filter options opened
    if (isOpen) {
      dispatch(
        _handleFilterKeyChange({
          payload: "*",
          origin: "homePage",
        })
      );
    }
  }, [isOpen]);

  return (
    <div>
      <div
        className={cn(
          "relative flex  items-start justify-start sm:items-center sm:justify-between gap-2.5 md:gap-[30px]",
          !isOpen ? "flex-col sm:flex-row" : "flex-row"
        )}
      >
        <ToggleFilters
          isToggle={isOpen}
          handleToggle={() => setIsOpen(!isOpen)}
        />
        <ProductCategoriesList
          productCategories={productCategories}
          isOpen={isOpen}
          filterKey={filterKey}
          onCategorySelect={(category: string) =>
            dispatch(
              _handleFilterKeyChange({
                payload: category,
                origin: "homePage",
              })
            )
          }
        />
        <CleanAllButton
          className={cn(
            "!invisible !opacity-0",
            isOpen ? "!visible !opacity-100" : "hidden"
          )}
          onClick={handleCleanFilters}
        />
      </div>
      <FilterCollapse isOpen={isOpen} />
    </div>
  );
};

export default ProductFilters;
