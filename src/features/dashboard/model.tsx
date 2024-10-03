import { useEffect } from 'react';

const Modal = ({ onClose, children }:any) => {
  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleEsc = (event :any) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-md shadow-lg max-w-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Address</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            &times;
          </button>
        </div>
        {/* Modal content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
