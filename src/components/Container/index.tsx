import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn('max-w-container mx-auto px-2.5', className)}>
      {children}
    </div>
  );
};

export default Container;
