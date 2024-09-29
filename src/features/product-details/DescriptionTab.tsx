import { cn } from '@/lib/utils';
import { selectProducts } from '@/store/slices/products/productsSlice';
import unescapeHTML from '@/utility/unescapeHTML';
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
  const { quickViewProduct } = useSelector(selectProducts);
  const { additional_description, additional_info, shipping_return } = quickViewProduct || {};
  console.log('additional_description: ', additional_description);


  let content: string = "";

  
  switch (label) {
    case "Description":
      content = additional_description || "No content";
      break;
    case "Additional Information":
      content = additional_info || "No content";
      break;
    case "Shipping & Returns":
      content = shipping_return || "No content";
      break;
    default:
      content = "No content";
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: unescapeHTML(content) }} />
  );
};

export default TabDescription;