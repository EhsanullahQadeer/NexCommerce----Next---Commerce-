import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  overlayLinkStyles,
  overlayStyles,
  shopBtnStyles,
  titleStyles,
  transition,
} from './cardComponentStyles';

interface CardComponentProps {
  src: string;
  title: string;
  subTitle: string;
  className?: string;
}

const CardComponent: FC<CardComponentProps> = ({
  src,
  title,
  subTitle,
  className,
}) => {
  return (
    <div className={cn('group relative', className)}>
      <Link href="#">
        <Image
          fill
          src={src}
          alt="product card"
          className="!relative !w-full !h-auto"
        />
        <div className={cn(overlayStyles, transition)} />
      </Link>
      <Link href="#" className={cn(overlayLinkStyles, transition)}>
        <h3
          className={cn(
            titleStyles,
            transition,
            'group-hover/link:opacity-0 group-hover/link:invisible group-hover/link:translate-y-full'
          )}
        >
          {title}
        </h3>
        <h4
          className={cn(
            'text-black-500 text-sm font-light leading-[16.8px]',
            transition,
            'group-hover/link:opacity-0 group-hover/link:invisible group-hover/link:translate-y-full'
          )}
        >
          {subTitle}
        </h4>
        <span
          className={cn(
            shopBtnStyles,
            transition,
            'group-hover/link:opacity-100 group-hover/link:visible group-hover/link:translate-y-0'
          )}
        >
          Shop now
        </span>
      </Link>
    </div>
  );
};

export default CardComponent;
