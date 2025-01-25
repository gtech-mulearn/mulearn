import { useState, useEffect } from 'react';

const SlideTransition = ({ children, isOpen, onClose, data }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => setMounted(false), 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 p-4 transform transition-transform duration-300 ease-in-out max-h-screen ${
        isOpen ? 'translate-x-0 duration-300' : 'translate-x-full'
      }`}
    >
      <div className="h-full w-full bg-white overflow-y-auto">
        <button
          onClick={onClose}
          className="fixed top-14 right-14 z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {typeof children === 'function' ? children(data) : children}
      </div>
    </div>
  );
};

export default SlideTransition;