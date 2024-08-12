import useOutsideClick from '@/hooks/useOutSideClick';
import { cn } from '@/lib/utils';
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const baseModalStyles =
  'fixed inset-0 flex justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-[.35s] ease-in-out px-2.5';
const baseContentStyles =
  'relative max-w-[1168px] w-full max-h-full my-auto mx-2.5 bg-white transition-opacity duration-[0.6s] ease-in-out overflow-y-auto';
const iconStyles = 'absolute flex h-[30px] w-[30px] right-5 top-3 items-center justify-end cursor-pointer opacity-60 z-[99] hover:opacity-100';

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => {
    onClose();
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
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
  }, [isOpen])

  if (!isVisible) return null;

  return createPortal(
    <div
      className={cn(
        baseModalStyles,
        isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div
        className={cn(baseContentStyles, isAnimating ? 'opacity-100' : 'opacity-0')}
        ref={modalRef}
      >
        <span
          className={iconStyles}
          onClick={onClose}
        >
          <i className="las la-times cursor-pointer text-[16px] text-100"></i>
        </span>
        <div className='overflow-y-auto'>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
