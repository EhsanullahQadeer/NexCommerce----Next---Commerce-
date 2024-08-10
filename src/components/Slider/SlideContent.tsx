import { FC, ReactNode } from 'react';
import Button from '../Button';
import { cn } from '@/lib/utils';

interface SlideContentProps {
  title: string;
  heading: ReactNode;
  headingClass?: string;
  btnText: string;
}

const SlideContent: FC<SlideContentProps> = ({
  title,
  heading,
  headingClass,
  btnText,
}) => {
  return (
    <div className="flex items-center h-full max-w-container mx-auto px-2.5">
      <div>
        <h3 className="text-primary font-extralight text-sm lg:text-base uppercase mb-[15px]">
          {title}
        </h3>
        <h1
          className={cn(
            'font-light text-black-75 text-[2.875rem] lg:text-[3.125rem] leading-[60px] mb-[17px]',
            headingClass
          )}
        >
          {heading}
        </h1>
        <Button className="uppercase leading-[1.5] !py-[11.5px]">
          {btnText} <i className="las la-arrow-right ml-2.5"></i>
        </Button>
      </div>
    </div>
  );
};

export default SlideContent;
