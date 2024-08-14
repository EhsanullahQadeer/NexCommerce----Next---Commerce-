import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CollapseProps {
  isOpen?: boolean;
  children?: ReactNode;
  title?: string;
  className?: string;
}

const Collapse: FC<CollapseProps> = ({
  isOpen,
  children,
  title,
  className,
}) => {
  const [open, setOpen] = useState(isOpen);
  const [height, setHeight] = useState(0);
  const filtersRef = useRef<HTMLDivElement>(null);

  const handleCollase = () => {
    setHeight(filtersRef?.current?.clientHeight || 0);
  };

  useEffect(() => {
    window.addEventListener('resize', handleCollase);

    return () => {
      window.removeEventListener('resize', handleCollase);
    };
  }, []);

  useEffect(() => {
    handleCollase();
  }, [open]);

  useEffect(() => {
    if (!title) {
      setOpen(isOpen);
    }
  }, [isOpen]);

  const renderCollapseContent = (
    <div
      className={cn(
        'h-[1px] transition-all duration-[0.5s] ease-in-out opacity-0 invisible',
        open && 'opacity-100 visible'
      )}
      style={{
        height: open ? `${height}px` : '0px',
      }}
    >
      <div ref={filtersRef}>{children}</div>
    </div>
  );

  if (!title) {
    return renderCollapseContent;
  }

  return (
    <div className={cn('border-b border-black-300 pb-3', className)}>
      <div
        className="flex items-center justify-between cursor-pointer leading-[26.04px] py-3"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-lg tracking-[-0.18px]">{title}</h3>
        <i
          className={cn(
            'text-sm',
            open ? 'las la-angle-down' : 'las la-angle-up'
          )}
        ></i>
      </div>
      {renderCollapseContent}
    </div>
  );
};

export default Collapse;
