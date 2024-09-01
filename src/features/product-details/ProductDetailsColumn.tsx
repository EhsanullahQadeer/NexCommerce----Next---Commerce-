import { FC } from 'react';
import NumberInput from '@/components/NumberInput/NumberInput';
import Description from '@/components/ProductDetails/Description';
import Select from '@/components/Select';
import { Label } from './Items';
import CategoryWithIcons from './CategoryWithIcons';
import { sizes } from './data';
import Actions from './Actions';
import { ColorVariant, ProductVariant, SizeVariant } from '@/types/product';
import ColorVariants from '@/components/ColorVariants';
import { useSelector } from 'react-redux';
import { selectProducts } from '@/store/slices/products/productsSlice';

interface ProductDetailsColumnProps {
  isModal?: boolean;
}

const ProductDetailsColumn: FC<ProductDetailsColumnProps> = ({ isModal }) => {
  const { quickViewProduct } = useSelector(selectProducts);
  const { product_variants } = quickViewProduct || {}

  const colorVarientFilter = (varients: ProductVariant[]) => {
    let colorsvarients: ColorVariant[] = []

    varients.map((el) => {
      el?.attribute_values?.map((item) => {
        if (item?.variant_attribute?.attribute_name == "Color" || item?.variant_attribute?.attribute_name == "Colour") {
          const checkColor = colorsvarients.find(el => el.color == item.value.toLowerCase())
          !checkColor && colorsvarients.push({ id: item.id, color: item.value.toLowerCase() })
        }
      })
    })

    return colorsvarients
  }

  const sizeVarientFilter = (varients: ProductVariant[]) => {
    let sizeVarients: SizeVariant[] = []

    varients.map((el) => {
      el?.attribute_values?.map((item) => {
        if (item?.variant_attribute?.attribute_name == "Size") {
          const checkSize = sizeVarients.find(el => el.label == item.value.toLowerCase())
          !checkSize && sizeVarients.push({ id: item.id, label: item.value.toLowerCase(), value: item.value.toLowerCase() })
        }
      })
    })

    return sizeVarients
  }

  return (
    <div>
      <Description className='!mb-2.5' />


      {
        product_variants &&
        <>
          <div className="flex items-center mb-5">
            <Label text="Color" />
            <ColorVariants variants={colorVarientFilter(product_variants)} />
          </div>
          <div className="flex items-center mb-5">
            <Label text="Size" />
            <Select options={sizeVarientFilter(product_variants)} label="Select a size" />
          </div>
        </>
      }



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
