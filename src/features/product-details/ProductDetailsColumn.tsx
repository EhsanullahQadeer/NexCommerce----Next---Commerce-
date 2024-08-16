import { FC } from 'react';
import ColourImageBox from '@/components/ColourImageBox';
import NumberInput from '@/components/NumberInput/NumberInput';
import Description from '@/components/ProductDetails/Description';
import Select from '@/components/Select';
import { Label } from './Items';
import CategoryWithIcons from './CategoryWithIcons';
import { sizes } from './data';
import Actions from './Actions';

interface ProductDetailsColumnProps {
  isModal?: boolean;
}

const ProductDetailsColumn: FC<ProductDetailsColumnProps> = ({ isModal }) => {
  return (
    <div>
      <Description className='!mb-2.5' />
      
      <div className="flex items-center mb-5">
        <Label text="Color" />
        <ColourImageBox />
      </div>
      
      <div className="flex items-center mb-5">
        <Label text="Size" />
        <Select options={sizes} label="Select a size" />
      </div>
      
      <div className="flex items-center">
        <Label text="Qty" />
        <NumberInput />
      </div>
      <Actions isModal={isModal} />
      <CategoryWithIcons isModal={isModal} />
    </div>
  );
};

export default ProductDetailsColumn;
