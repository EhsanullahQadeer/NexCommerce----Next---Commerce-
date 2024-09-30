import { cn } from "@/lib/utils";
import { selectProducts } from "@/store/slices/products/productsSlice";
import unescapeHTML from "@/utility/unescapeHTML";
import { FC, Fragment } from "react";
import { useSelector } from "react-redux";

const headingStyles =
  '"text-base text-black-75 font-light tracking-[-0.16px] leading-[17.6px] mb-[18px]';
const textStyles = "text-sm font-extralight leading-[26.04px]";

interface TabDescriptionProps {
  label?: string;
}

const TabDescription: FC<TabDescriptionProps> = ({ label }) => {
  const { quickViewProduct } = useSelector(selectProducts);
  const { additional_description, additional_info, shipping_return } =
    quickViewProduct || {};

  let content: string = "";
  const allEqual = additional_description === additional_info && additional_info === shipping_return;

console.log('Are all three the same?', allEqual);

  
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
  return <div dangerouslySetInnerHTML={{ __html: unescapeHTML(content) }} />;
};

export default TabDescription;
