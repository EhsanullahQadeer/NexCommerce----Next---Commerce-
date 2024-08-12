import { FC, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const images = ['/products/thumb/1.jpg', '/products/thumb/2.jpg'];

const ColourImageBox = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(0);
  return (
    <div className="flex items-center gap-1">
      {images.map((item, index) => (
        <SmallImageCard
          key={item}
          src={item}
          onClick={() => setSelectedImage(index)}
          isActive={selectedImage === index}
        />
      ))}
    </div>
  );
};

interface SmallImageCardProps {
  src: string;
  onClick?: () => void;
  isActive?: boolean;
}

export const SmallImageCard: FC<SmallImageCardProps> = ({
  src,
  onClick,
  isActive,
}) => (
  <div
    className={cn(
      'border-2 border-white hover:shadow-variant transition-all duration-[0.35s] ease cursor-pointer rounded-sm',
      isActive && 'shadow-variant'
    )}
    onClick={onClick}
  >
    <Image
      src={src}
      fill
      className="!relative !h-[50px] !w-10 rounded-sm"
      alt="product image small"
    />
  </div>
);

export default ColourImageBox;
