import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useOutsideClick from '@/hooks/useOutSideClick';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  fullWidth?: boolean;
  id?: string;
  className?: string;
}

const baseModalStyles =
  'fixed inset-0 flex justify-center bg-black bg-opacity-50 z-[999] transition-opacity duration-[.35s] ease-in-out';
const baseContentStyles =
  'relative w-full max-h-full my-auto bg-white transition-opacity duration-[0.6s] ease-in-out overflow-y-auto';
const iconStyles =
  'absolute flex h-[20px] w-[20px] right-5 top-[15px] items-center justify-end cursor-pointer opacity-60 z-[99] hover:opacity-100';

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  fullWidth,
  id,
  className,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => {
    onClose?.();
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsAnimating(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);

      const timer = setTimeout(() => setIsVisible(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return createPortal(
    <div
      className={cn(
        baseModalStyles,
        isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none',
        !fullWidth && 'px-2.5'
      )}
    >
      <div
        className={cn(
          baseContentStyles,
          isAnimating ? 'opacity-100' : 'opacity-0',
          !fullWidth && 'max-w-[1168px] mx-2.5',
          className,
        )}
        ref={modalRef}
      >
        <span className={iconStyles} onClick={onClose}>
          <i className="las la-times cursor-pointer text-[16px] text-100"></i>
        </span>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
    id
  );
};

export default Modal;
