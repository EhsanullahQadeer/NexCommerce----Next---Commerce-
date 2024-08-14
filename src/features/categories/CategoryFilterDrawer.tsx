import { useDispatch, useSelector } from 'react-redux';
import {
  selectProductCategories,
  toggleFilters,
} from '@/store/slices/categories/categoriesSlice';
import ToggleFilters from '@/components/Filters/ToggleFilters';
import CleanAllButton from '@/components/Filters/CleanAllButton';
import Collapse from '@/components/Collapse';
import CategoryFilter from '../Product/categories/CategoryFilters';
import PriceRangeInput from '@/components/PriceRangeInput';
import {
  brandResults,
  categoryFiltersResults,
  sizeFiltersResults,
} from '@/store/slices/categories/fakeProducts';
import ColourFilters from '../Product/categories/ColourFilters';
import dynamic from 'next/dynamic';

const Drawer = dynamic(import('@/components/Drawer'), { ssr: false });

const CategoryFilterDrawer = () => {
  const { isToggleFilters } = useSelector(selectProductCategories);
  const dispatch = useDispatch();
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
          <CleanAllButton />
        </div>
        <Collapse title="Category" isOpen>
          <CategoryFilter categories={categoryFiltersResults} />
        </Collapse>
        <Collapse title="Size" isOpen>
          <CategoryFilter categories={sizeFiltersResults} />
        </Collapse>
        <Collapse title="Colour" isOpen>
          <ColourFilters isHorizontal />
        </Collapse>
        <Collapse title="Brand" isOpen>
          <CategoryFilter categories={brandResults} />
        </Collapse>
        <Collapse title="Price Range" isOpen>
          <PriceRangeInput />
        </Collapse>
      </div>
    </Drawer>
  );
};

export default CategoryFilterDrawer;
