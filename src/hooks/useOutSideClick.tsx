import { useEffect, RefObject } from 'react';

/**
 * @param {RefObject<HTMLElement>} ref - Ref of your parent div
 * @param {() => void} callback - Callback which can be used to change your maintained state in your component
 */

const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
