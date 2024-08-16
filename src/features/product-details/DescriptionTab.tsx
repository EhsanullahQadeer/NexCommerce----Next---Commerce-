import { cn } from '@/lib/utils';
import { FC, Fragment } from 'react';

const headingStyles =
  '"text-base text-black-75 font-light tracking-[-0.16px] leading-[17.6px] mb-[18px]';
const textStyles = 'text-sm font-extralight leading-[26.04px]';

interface TabDescriptionProps {
  details: {
    heading?: string;
    text?: string;
    listItems?: string[];
  }[];
}

const TabDescription: FC<TabDescriptionProps> = ({ details}) => {
  return (
    <div>
      {details?.map((item, index) => (
        <Fragment key={index}>
          {item.heading && <h3 className={headingStyles}>{item.heading}</h3>}
          {item.text && (
            <p className={cn(textStyles, 'text-black-500 mb-5')}>
              {item.text}
            </p>
          )}
          {item?.listItems && (
            <ul className="mb-[15px]">
              {item.listItems.map((item, index) => (
                <li key={index} className={cn(textStyles, 'relative text-black-75 pl-[13px] before:content-["•"] before:absolute before:left-0')}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default TabDescription;
