import useOutsideClick from '@/hooks/useOutSideClick';
import { cn } from '@/lib/utils';
import React, { FC, ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const baseModalStyles =
  'fixed inset-0 flex justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-[.35s] ease-in-out px-2.5';
const baseContentStyles =
  'relative max-w-[1168px] w-full max-h-full my-auto mx-2.5 bg-white ransition-opacity duration-[0.6s] ease-in-out overflow-y-auto';
const iconStyles = 'absolute flex h-[30px] w-[30px] right-5 top-3 items-center justify-end cursor-pointer opacity-60 z-[99] hover:opacity-100';

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => {
    onClose();
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen])

  return (
    <div
      className={cn(
        baseModalStyles,
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div
        className={cn(baseContentStyles, isOpen ? 'opacity-100' : 'opacity-0')}
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
    </div>
  );
};

export default Modal;
