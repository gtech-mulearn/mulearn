import styles from './Hackathon.module.css'
import React, { FC, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    prevImgUrl:string;
}

const HackathonImagePreview: FC<ModalProps> = ({ isOpen, onClose,prevImgUrl }) => {

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.modal')) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <img src={`${import.meta.env.VITE_BACKEND_URL}/${prevImgUrl}`} alt="" />
            </div>
        </div>
    );
};

export default HackathonImagePreview;
