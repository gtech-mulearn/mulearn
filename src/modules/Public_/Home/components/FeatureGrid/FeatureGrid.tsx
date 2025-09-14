import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './FeatureGrid.module.css';

const FeatureGrid = () => {
  const [expandedIndex, setExpandedIndex] = useState(0); // Start with the first card expanded
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1320);


  const handleResize = () => {
    setIsMobile(window.innerWidth < 1320);
    if (window.innerWidth < 1320) {
      setIsHovering(false)
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const features = [
    {
      title: "Community",
      description: "Join 40,000+ learners & innovators.",
      image: "/assets/landing/College Project Concept Illustration.png",
      bgColor: "#9bc8ff",
    },
    {
      title: "Mentors",
      description: "Learn from those ahead of you, mentor those behind you.",
      image: "/assets/landing/searching.png",
      bgColor: "#ffb0a1",
    },
    {
      title: "Interest Groups",
      description: "Connect with like-minded people who share your interests",
      image: "/assets/landing/Content Team Concept Illustration.png",
      bgColor: "#5ce5c9",
    },
    {
      title: "Roadmaps",
      description: "Structured learning paths for skill mastery.",
      image: "/assets/landing/Roadmap.png",
      bgColor: "#ffe399",
    },
    {
      title: "Challenges",
      description: "Engage in real-world problem-solving.",
      image: "/assets/landing/collab.png",
      bgColor: "#b594ff",
    },
    {
      title: "Opportunities",
      description: "Discover Gigs, Jobs, and best opportunities around you",
      image: "https://www.propeers.in/images/cuate.svg",
      bgColor: "#55bfe9",
    },
  ];
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: any) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5 }
    })
  };

  // Calculate widths
  const totalCards = features.length;
  const baseWidth = `${100 / totalCards}%`;
  const expandedWidth = `calc(${baseWidth} + 200px)`;
  const shrunkWidth = `calc(${baseWidth} - (200px / ${totalCards - 1}))`;

  // Determine if a card is active (expanded)
  const isCardActive = (index: any) => {
    if(isMobile){
      return false
    }
    else { 
    return isHovering ? expandedIndex === index : index === 0;
    }
  };

  return (
    <motion.div
      className={styles.featuresGrid}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      onMouseLeave={() => setIsHovering(false)}
    >
      {features.map((feature, i) => (
        <motion.div
          className={styles.featureCard}
          key={i}
          style={{ 
            backgroundColor: isCardActive(i) ? feature.bgColor : "white",
            width: isCardActive(i) ? expandedWidth : shrunkWidth,
            transition: "all 0.3s ease"
          }}
          variants={fadeInUp}
          custom={i}
          onHoverStart={() => {
            setExpandedIndex(i);
            setIsHovering(true);
          }}
        >
          <div className={styles.content}>
            <h3 style={{ 
              fontSize: isCardActive(i) ? '1.5rem' : '1.2rem',
              transition: 'font-size 0.3s ease',
              fontWeight: 600
            }}>
              {feature.title}
            </h3>
            <p style={{ 
              fontSize: isCardActive(i) ? '1rem' : '0.85rem',
              transition: 'font-size 0.3s ease'
            }}>
              {feature.description}
            </p>
          </div>
          <img
            src={feature.image}
            style={{
              width: 
                feature.title === "Community"
                  ? "140px"
                  : feature.title === "Mentors"
                  ? "120px"
                  : feature.title === "Interest Groups"
                  ? "90px"
                  : feature.title === "Roadmaps"
                  ? "110px"
                  : feature.title === "Challenges"
                  ? "130px"
                  : "90px",
              transition: 'transform 0.3s ease',
              transform: isCardActive(i) ? 'scale(1.1)' : 'scale(1)'
            }}
            alt={feature.title}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureGrid;