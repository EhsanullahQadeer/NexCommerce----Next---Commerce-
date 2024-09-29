import { useEffect, RefObject } from "react";

/**
 * Detects clicks outside of a specified element and invokes a callback function.
 * @param {RefObject<HTMLElement>} ref - Reference to the HTMLElement that should detect outside clicks.
 * @param {() => void} callback - Callback function to be invoked when an outside click is detected.
 */
const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  modalId?: string
) => {
  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        const clickedModalId = (evt.target as HTMLElement).dataset.modalid;
        
        if (!modalId || (clickedModalId && clickedModalId === modalId)) {
          callback();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback,modalId]);
};

export default useOutsideClick;
