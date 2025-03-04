// AsideDetails.tsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './AsideDetails.module.css';

interface AsideDetailsProps {
  children: React.ReactNode;
  handleClose: () => void;
  isOpen?: boolean;
}

const AsideDetails = ({ children, handleClose, isOpen = false }: AsideDetailsProps) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, handleClose]);

  return (
    <>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={handleClose}
        />
      )}
      
      <div
        className={`${styles.asidePanel} ${isOpen ? styles.open : ''}`}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <button
              onClick={handleClose}
              className={styles.closeButton}
              aria-label="Close panel"
            >
              <X className={styles.closeIcon} />
            </button>
          </div>
          
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AsideDetails;