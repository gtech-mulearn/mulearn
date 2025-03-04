import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './CardCarousel.module.css';

interface CardCarouselProps {
  children: React.ReactNode;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrows = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    updateArrows();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollAmount = clientWidth; // Scroll one container width at a time
      const newScrollLeft = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
      // Update arrow visibility after scroll completes
      setTimeout(updateArrows, 300);
    }
  };

  return (
    <div className={styles.carouselWrapper}>
      {showLeft && (
        <button className={styles.leftArrow} onClick={() => scroll('left')}>
          <ChevronLeft />
        </button>
      )}
      <div className={styles.carouselContainer} ref={containerRef} onScroll={updateArrows}>
        {children}
      </div>
      {showRight && (
        <button className={styles.rightArrow} onClick={() => scroll('right')}>
          <ChevronRight />
        </button>
      )}
    </div>
  );
};

export default CardCarousel;
