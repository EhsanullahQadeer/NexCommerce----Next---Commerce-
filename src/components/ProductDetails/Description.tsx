import { FC } from 'react';
import { cn } from '@/lib/utils';
import Stars from '../Stars';

interface DescriptionProps {
  className?: string;
}

const Description: FC<DescriptionProps> = ({ className }) => {
  return (
    <div className={cn('mb-10', className)}>
      <h2 className="text-2xl text-black-75 font-light mb-2.5 tracking-[-0.6px] leading-[30px]">
        Dark yellow lace cut out swing dress
      </h2>
      <Stars count={5} reviewCount={2} className="mb-2.5" />
      <h3 className="text-2xl text-primary font-light mb-2.5 tracking-[-0.6px] leading-[30px]">
        $60.00
      </h3>
      <p className="mt-[17px] font-extralight text-sm text-black-100 leading-[26.04px]">
        Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae
        luctus metus libero eu augue.
      </p>
    </div>
  );
};

export default Description;
