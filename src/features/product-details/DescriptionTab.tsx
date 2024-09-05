import { cn } from '@/lib/utils';
import { selectProducts } from '@/store/slices/products/productsSlice';
import { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';

const headingStyles =
  '"text-base text-black-75 font-light tracking-[-0.16px] leading-[17.6px] mb-[18px]';
const textStyles = 'text-sm font-extralight leading-[26.04px]';

interface TabDescriptionProps {
  details: {
    heading?: string;
    text?: string;
    listItems?: string[];
    
  }[];
  label?: string;
}

const TabDescription: FC<TabDescriptionProps> = ({ details, label }) => {
  const { quickViewProduct } = useSelector(selectProducts)
  const { additional_description, additional_info, shipping_return } = quickViewProduct || {}
  console.log("quickViewProduct--> ", quickViewProduct);

  return (

    <div>
      {
        label == "Description" ? (additional_description ? additional_description : "No content") : ""
      }
      {
        label == "Additional Information" ? (additional_info ? additional_info : "No content") : ""
      }
      {
        label == "Shipping & Returns" ? (shipping_return ? shipping_return : "No content") : ""
      }

    </div>

  );
};

export default TabDescription;
