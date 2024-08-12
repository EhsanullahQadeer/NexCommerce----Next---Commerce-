import { cn } from '@/lib/utils';
import { ColorVariant } from '@/store/slices/products/fakeProducts';
import { FC, useEffect, useState } from 'react';

interface ColorVariantProps {
  variants?: ColorVariant[];
}

const ColorVariants: FC<ColorVariantProps> = ({ variants }) => {
  const [isActive, setIsActive] = useState<string | null>(null);

  useEffect(() => {
    setIsActive(variants?.[0]?.color || null);
  }, []);

  if (!variants) return;

  return (
    <div className="flex items-center gap-[5px]">
      {variants.map((variant) => (
        <div
          key={variant.id}
          className={cn(
            'h-[17px] w-[17px] cursor-pointer rounded-full mt-[5px] border-2 border-white transition-shadow duration-[0.35s] ease hover:shadow-variant',
            isActive === variant.color && 'shadow-variant'
          )}
          style={{ background: variant.color }}
          onClick={() => setIsActive(variant.color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorVariants;
