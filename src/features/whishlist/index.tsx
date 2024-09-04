'use client';
import WishList from '@/components/Table/WishList';
import { wishlistTableHeader } from './data';
import SocialMobileIcons from '@/components/Navbar/elements/SocialMobileIcons';
import Link from 'next/link';
import Button from '@/components/Button';
import { useSelector } from 'react-redux';
import { selectWishlist } from '@/store/slices/wishlist/wishlistSlice';

const WhistlistComponent = () => {
  const { wishListData } = useSelector(selectWishlist)

  return (
    <div className="pt-10 pb-[50px] gap-5">
      

      {
        wishListData?.length ? <div>
        <WishList headers={wishlistTableHeader} />
      </div> : <div className="flex flex-col items-center justify-center flex-1 py-10">
          <h2 className="text-lg font-semibold mb-4">Your Wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven&apos;t added any items to your wishlist yet.</p>
          <Link href="/products">
            <Button className="uppercase !h-10 justify-center !text-black-75 !border-black-300 hover:!bg-[#f5f6f9] hover:!text-primary">
              Browse Products
              <i className="las la-arrow-right ml-2.5"></i>
            </Button>
          </Link>
        </div>
      }

      <div className='flex items-center mt-[30px] mb-5'>
        <span className="mr-2 text-sm font-light text-black-500 tracking-[0.14px] leading-[16.8px]">
          Share on:{' '}
        </span>
        <SocialMobileIcons variant="dark" className="!mt-0 !gap-[5px]" />
      </div>
    </div>
  );
};

export default WhistlistComponent;
