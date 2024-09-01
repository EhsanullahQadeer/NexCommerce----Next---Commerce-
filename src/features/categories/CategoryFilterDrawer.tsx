import { useDispatch, useSelector } from 'react-redux';
import {
  selectProductCategories,
  toggleFilters,
} from '@/store/slices/categories/categoriesSlice';
import ToggleFilters from '@/components/Filters/ToggleFilters';
import CleanAllButton from '@/components/Filters/CleanAllButton';
import Collapse from '@/components/Collapse';
import CategoryFilter from '../elements/CategoryFilters';
import PriceRangeInput from '@/components/PriceRangeInput';
import ColourFilters from '../elements/ColourFilters';
import { lazy } from 'react';
import { clearFilter, selectProducts } from '@/store/slices/products/productsSlice';

const Drawer = lazy(() => import('@/components/Drawer'));

const CategoryFilterDrawer = () => {
  const { productCategories } = useSelector(selectProducts);
  const { isToggleFilters } = useSelector(selectProductCategories);
  const dispatch = useDispatch();
  const sizeFiltersResults = [
    { key: 'Small', label: 'Small' },
    { key: 'Medium', label: 'Medium' },
    { key: 'Large', label: 'Large' }
  ]


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
          <CleanAllButton onClick={() => dispatch(clearFilter())} />
        </div>
        <Collapse title="Category" isOpen>
          <CategoryFilter categories={productCategories} />
        </Collapse>
        {/* <Collapse title="Size" isOpen>
          <CategoryFilter categories={sizeFiltersResults} />
        </Collapse> */}
        <Collapse title="Colour" isOpen>
          <ColourFilters isHorizontal />
        </Collapse>
        <Collapse title="Price Range" isOpen>
          <PriceRangeInput />
        </Collapse>
      </div>
    </Drawer>
  );
};

export default CategoryFilterDrawer;
