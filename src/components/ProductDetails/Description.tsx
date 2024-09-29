import { FC } from 'react';
import { cn } from '@/lib/utils';
import Stars from '../Stars';
import { selectProducts } from '@/store/slices/products/productsSlice';
import { useSelector } from 'react-redux';
import useCurrency from '@/hooks/useCurrency';

interface DescriptionProps {
  className?: string;
}

const Description: FC<DescriptionProps> = ({ className }) => {
  const { quickViewProduct, currentVarient } = useSelector(selectProducts);
  const {price:variantPrice ,currency_id} = currentVarient  ||{};
  
  const {formatPrice}=useCurrency()
  const {name, price, description} = quickViewProduct || {}
  return (
    <div className={cn('mb-10', className)}>
      <h2 className="text-2xl text-black-75 font-light mb-2.5 tracking-[-0.6px] leading-[30px]">
        {name}
      </h2>
      <Stars count={5} reviewCount={2} className="mb-2.5" />
      <h3 className="text-2xl text-primary font-light mb-2.5 tracking-[-0.6px] leading-[30px]">
        {variantPrice&&formatPrice(Number(variantPrice) ,currency_id)}
      </h3>
      <p className="mt-[17px] font-extralight text-sm text-black-100 leading-[26.04px]">
       {description}
      </p>
    </div>
  );
};

export default Description;
