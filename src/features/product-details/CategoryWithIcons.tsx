import SocialMobileIcons from '@/components/Navbar/elements/SocialMobileIcons';
import { cn } from '@/lib/utils';
import { addQuickViewProduct, clearFilter, selectCategoryFilter, selectProducts, toggleGalleryModal, togglePreviewModal } from '@/store/slices/products/productsSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface CategoryWithIconsProps {
  isModal?: boolean;
}

const CategoryWithIcons: FC<CategoryWithIconsProps> = ({ isModal }) => {
  const dispatch = useDispatch()
  const { quickViewProduct } = useSelector(selectProducts);

  const { product_categories } = quickViewProduct || {}

  const filterCategoryhandler = (id: number) => {
    dispatch(clearFilter())
    id && dispatch(selectCategoryFilter(id))
    dispatch(addQuickViewProduct(null));
      dispatch(togglePreviewModal(false));
      dispatch(toggleGalleryModal(false));
  }
  

  return (
    <div
      className={cn(
        'border-t border-black-300 pt-5',
        !isModal &&
        'flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5'
      )}
    >
      {
        !!product_categories?.length && <div
        className={cn(
          'flex items-center text-sm font-light text-black-500 tracking-[0.14px] leading-[16.8px]',
          isModal && 'mb-[45px]'
        )}
      >
        <span className="mr-1">Category: </span>
        {
          product_categories.map(el => {
            return <button key={el.id} className="mx-1" onClick={() => filterCategoryhandler(el.category_id)}>
            {el.category?.name}
          </button>
          })
        }
      </div>
      }
      

      <div className={cn('flex items-center', isModal && 'mt-[45px]')}>
        <span className="mr-2 text-sm font-light text-black-500 tracking-[0.14px] leading-[16.8px]">
          Share:{' '}
        </span>
        <SocialMobileIcons variant="dark" className="!mt-0 !gap-[5px]" />
      </div>
    </div>
  );
};

export default CategoryWithIcons;
