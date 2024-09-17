import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import Container from '@/components/Container';
import NumberInput from '@/components/NumberInput/NumberInput';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentVarientQuantity, selectProducts } from '@/store/slices/products/productsSlice';

const StickyBarBottom: FC = () => {
  const dispatch = useDispatch()
  const {quickViewProduct, currentVarientQuantity} = useSelector(selectProducts)
  const { price } = quickViewProduct || {}

  const handleCartItemChanges = async (type: string) => {
    try {
      if (type === "decrement" && currentVarientQuantity !== 0) {
        dispatch(changeCurrentVarientQuantity(currentVarientQuantity - 1));
      }
      if (type === "increment") {
        dispatch(changeCurrentVarientQuantity(currentVarientQuantity + 1));
      }

    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  return (
    <div className="fixed bottom-0 w-full hidden bg-white lg:block py-2.5 z-[10]">
      <Container>
        <div className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-5">
            <Link href="#"> 
              <Image
                src="/product.jpg"
                alt="Product image"
                height={60}
                width={60}
              />
            </Link>
            <h4>
              <Link
                href="#"
                className="text-black-75 font-light tracking-[-0.4px] leading-[20px] mb-2 hover:text-primary"
              >
                {quickViewProduct?.name}
              </Link>
            </h4>
          </div>
          <div className="flex items-center gap-5">
            <span className='text-primary font-light'>${price}</span>
            {/* <NumberInput /> */}
            <NumberInput value={currentVarientQuantity || 0} onChange={handleCartItemChanges} />
            <Button variant="outlined" size="xs" className='group !w-[200px] h-10 justify-center items-center'>
              <i className="las la-cart-plus text-primary text-lg group-hover:text-white mr-2"></i>
              add to cart 
            </Button>
            <Link href="#" className=''>
              <i className="lar la-heart text-lg text-primary"></i>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StickyBarBottom;
