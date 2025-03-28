import React, { useEffect, useState } from "react";
import styles from "./ModeSwitchModal.module.css";

const modes = [
  {
    id: "creative",
    label: "Creative",
    subdomains: ["Animation", "Graphic Design", "Illustration", "Photography"],
  },
  {
    id: "coder",
    label: "Coder",
    subdomains: ["Web Development", "Mobile Apps", "Data Science", "Machine Learning"],
  },
  {
    id: "maker",
    label: "Maker",
    subdomains: ["Industrial", "Hardware", "IoT", "Robotics", "Civil"],
  },
  {
    id: "manager",
    label: "Manager",
    subdomains: ["Project Management", "Operations", "Product Management", "HR"],
  },
];

const imageMap: { [key: string]: { src: string; alt: string } } = {
  coder: { src: "/assets/landing/coder2.webp", alt: "Coding illustration" },
  maker: { src: "/assets/landing/maker.webp", alt: "Maker illustration" },
  creative: { src: "/assets/landing/creative.webp", alt: "Designer illustration" },
  manager: { src: "/assets/landing/manager.webp", alt: "Manager illustration" },
};

interface ModeSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedMode: string) => void;
}

const ModeSwitchModal: React.FC<ModeSwitchModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const storedUserInfo = localStorage.getItem("userInfo");
  const currentMode = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  const [selectedMode, setSelectedMode] = useState<string | null>(
    currentMode?.user_domains?.[0] || null
  );

  const [animate, setAnimate] = useState(false);

  function onCloseAnimate() {
    setAnimate(true);
    onClose()
  }

  const handleCardClick = (modeId: string) => {
    setSelectedMode(modeId);
  };

  const handleSubmit = () => {
    if (selectedMode) {
      onSubmit(selectedMode);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onCloseAnimate}>
      <div className={`${styles.modalContent} ${animate ? styles.modalContentClose : ""}`} onClick={(e) => e.stopPropagation()}>
        {/* Close Button (X) */}
       

        <h2 className={styles.modalTitle}>Choose Your Path</h2>
        <button className={styles.closeButton} onClick={onCloseAnimate}>
          ✕
        </button>

        <div className={styles.cardsGrid}>
          {modes.map((mode) => (
            <div
              key={mode.id}
              className={`${styles.card} ${
                selectedMode === mode.id ? styles.selected : ""
              }`}
              onClick={() => handleCardClick(mode.id)}
            >
              <img
                src={imageMap[mode.id].src}
                alt={imageMap[mode.id].alt}
                className={styles.cardImage}
              />
              <div className={`${styles.cardLabel} ${selectedMode === mode.id ? styles.cardLabelActive : ''}`}>{mode.label}</div>
                <ul className={`${styles.subdomainsList} ${selectedMode === mode.id ? styles.subdomainsListActive : ''}`}>
                  {mode.subdomains.map((sub) => (
                    <li key={sub} className={styles.subdomainItem}>
                      {sub}
                    </li>
                  ))}
                </ul>
            </div>
          ))}
        </div>

        {selectedMode && (
          <button className={styles.submitButton} onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default ModeSwitchModal;
