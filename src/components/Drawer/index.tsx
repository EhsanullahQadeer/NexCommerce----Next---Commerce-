'use client';

import useOutsideClick from '@/hooks/useOutSideClick';
import { cn } from '@/lib/utils';
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { baseContentStyles, iconStyles } from './styles';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  id?: string;
  title?: string;
  hideCloseIcon?: boolean;
}

const Drawer: FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  id,
  hideCloseIcon,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => {
    onClose();
  });

  useEffect(() => {
    console.log(isOpen);
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsAnimating(true), 100); // Small delay to trigger animation
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);

      // Delay the close action to allow the animation to play
      const timer = setTimeout(() => setIsVisible(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return createPortal(
    <>
      <div
        className={cn(
          'fixed h-full w-full left-0 top-0 z-[998] bg-[rgba(25,25,25,0.25)]'
        )}
        style={{ transition: 'all 0.4s ease' }}
      ></div>
      <div
        className={cn(
          baseContentStyles,
          isAnimating ? 'translate-x-0' : 'translate-x-[-350px]'
        )}
        ref={modalRef}
      >
        {!hideCloseIcon && (
          <span className={iconStyles} onClick={onClose}>
            <i className="las la-times cursor-pointer text-[16px] text-100"></i>
          </span>
        )}
        <div className="overflow-y-auto">{children}</div>
      </div>
    </>,
    document.body,
    id
  );
};

export default Drawer;
