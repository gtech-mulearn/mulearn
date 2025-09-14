import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./HomeNav.module.css";
import MulearnBrand from "../../../modules/Dashboard/assets/MulearnBrand";
import { interestGroups } from "../../Dashboard/modules/InterestGroups/data/interestGroups";

interface NavItem {
  label: string;
  onClick: () => void;
  submenu: {
    [key: string]: Array<{
      label: string;
      onClick: () => void;
    }>;
  } | null;
}

const HomeNav: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1024);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<number | null>(null);
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobileView(mobile);
      
      // Close mobile menu when switching to desktop
      if (!mobile && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Close menu when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && isMobileView) {
        const mobileMenu = document.querySelector(`.${styles.mobileMenu}`);
        const hamburger = document.querySelector(`.${styles.hamburger}`);

        if (mobileMenu && !mobileMenu.contains(event.target as Node) &&
            hamburger && !hamburger.contains(event.target as Node)) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isMobileView]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileView && isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isMobileView]);

  const navItems: NavItem[] = [
    
    { 
      label: "About", 
      onClick: () => navigate("/about"),
      submenu: {
        "KEY PAGES": [
          { label: "MANIFESTO", onClick: () => navigate("/manifesto") },
          { label: "Team", onClick: () => navigate("/team") },
          { label: "Enablers", onClick: () => navigate("/enablers") },

        ],
        "Partners": [
          { label: "COMMUNITY PARTNERS", onClick: () => navigate("/community-partners") },
          { label: "COMPANY PARTNERS", onClick: () => navigate("/company-partners") }
        ],
        // "MEDIA": [
        //   { label: "GALLERY", onClick: () => navigate("/gallery") },
        //   { label: "NEWS", onClick: () => navigate("/news") },
        //   { label: "BLOGS", onClick: () => navigate("/blogs") }
        // ],
        "EVENTS": [
          { label: "GLOBAL CALENDAR", onClick: () => navigate("/events/calendar") },
          { label: "ANNOUNCEMENTS", onClick: () => navigate("/events/announcements") },
          { label: "WEEKLY EVENTS", onClick: () => navigate("/events/weekly") }
        ],
        "Programs": [
          { label: "LAUNCHPAD", onClick: () => navigate("/launchpad") },
          // { label: "MUTATE", onClick: () => navigate("/mutate") },
          { label: "PERMUTE", onClick: () => open("https://permute.mulearn.org/") },
          { label: "TOP100SERIES", onClick: () => open("https://top100coders.com/") },
          { label: "Art of Teaching", onClick: () => navigate("/artofteaching") },
          { label: "IN50HOURS", onClick: () => navigate("/in50hours") },
        ],
        "OTHERS": [
          // { label: "MAGAZINE", onClick: () => open("https://online.fliphtml5.com/slydm/hrgi/") },
          { label: "NEWSLETTER", onClick: () => open("https://online.fliphtml5.com/slydm/yljq/") }
        ]
      }
    },
    { 
      label: "Why μLearn?", 
      onClick: () => open("https://youtu.be/ehdSEL_s050"),
      submenu: null
    },
    // { 
    //   label: "Programs", 
    //   onClick: () => navigate("dashboard/search?activetab=mentors"),
    //   submenu: {
    //      "FLAGSHIP": [
    //       
    //     ],
    //     "OTHERS": [
    //       { label: "WIKISYLLABUS", onClick: () => navigate("/wikisyllabus") },
    //     ]
    //   },
    // },
    { 
      label: "Mentorship", 
      onClick: () => navigate("dashboard/search?activetab=mentors"),
      submenu: null
    },
    // { 
    //   label: "Leader Board", 
    //   onClick: () => navigate("dashboard/leaderboard"),
    //   submenu: null
    // },
    { 
      label: "Interest Group", 
      onClick: () => navigate("/interest"),
      submenu: {
        Subjects: interestGroups.map((group: { id: string; title: string }) => ({
          label: group.title,
          onClick: () => navigate(`/dashboard/interestgroups/${group.id}`)
        }))
      }
    },
    { 
      label: "Learning Circles", 
      onClick: () => navigate("/dashboard/learningcircle"),
      submenu: null
    },
    { 
      label: "Learning Paths", 
      onClick: () => window.open("/dashboard/mujourney"),
      submenu: null
    },
    { 
      label: "Donate", 
      onClick: () => window.open("/donation"),
      submenu: null
    },
  ];

  const handleNavClick = (onClick: () => void, hasSubmenu: boolean = false) => {
    if (isMobileView) {
      setIsMenuOpen(false);
    }
    if (!hasSubmenu) {
      onClick();
    }
  };

  const handleAuthClick = () => {
    if (isMobileView) {
      setIsMenuOpen(false);
    }
    navigate(refreshToken ? "/dashboard/home" : "/login");
  };

  const handleMouseEnter = (index: number, hasSubmenu: boolean) => {
    if (!isMobileView && hasSubmenu) {
      setActiveSubmenu(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobileView) {
      setActiveSubmenu(null);
    }
  };

  return (
    <div className={styles.navWrapper}>
      {/* DESKTOP NAVIGATION */}
      {!isMobileView && (
        <motion.div
          className={styles.desktopNav}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <a className={styles.logo} onClick={() => navigate("/")}>
            <MulearnBrand />
          </a>

          <ul className={styles.navLinks}>
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                className={`${styles.navItem}`}
                onClick={() => handleNavClick(item.onClick, item.submenu !== null)}
                onMouseEnter={() => handleMouseEnter(index, item.submenu !== null)}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {/* Submenu */}
                <AnimatePresence>
                  {activeSubmenu === index && item.submenu && (
                    <motion.div
                      className={styles.submenu}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={styles.submenuContent}>
                        {Object.entries(item.submenu).map(([category, items]) => (
                          <div key={category} className={styles.submenuSection}>
                            <h4 className={styles.submenuCategory}>{category}</h4>
                            <ul className={styles.submenuList}>
                              {items.map((subItem, subIndex) => (
                                <li
                                  key={subIndex}
                                  className={styles.submenuItem}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    subItem.onClick();
                                    setActiveSubmenu(null);
                                  }}
                                >
                                  {subItem.label}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </ul>

          <div className={styles.navButtons}>
            <motion.button
              className={styles.loginBtn}
              onClick={handleAuthClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {refreshToken ? "Dashboard" : "Login"}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* HAMBURGER MENU BUTTON */}
      {isMobileView && (
        <div className={styles.mobileHeader}>
          <a className={styles.logo} onClick={() => navigate("/")}>
            <MulearnBrand />
          </a>
          <motion.button
            className={styles.hamburger}
            onClick={() => setIsMenuOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </motion.button>
        </div>
      )}

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileView && isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                duration: 0.4, 
                ease: [0.4, 0, 0.2, 1] 
              }}
            >
              <button 
                className={styles.closeBtn} 
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>

              <ul className={styles.mobileNavLinks}>
                {activeMobileSubmenu === null ? (
                  navItems.map((item, index) => (
                    <motion.li
                      key={index}
                      onClick={() => {
                        if (item.submenu) {
                          setActiveMobileSubmenu(index);
                        } else {
                          handleNavClick(item.onClick);
                        }
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.1,
                        duration: 0.3 
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                      {item.submenu && <span className={styles.arrow}>{'>'}</span>}
                    </motion.li>
                  ))
                ) : (
                  <>
                    <li 
                      className={styles.backButton} 
                      onClick={() => setActiveMobileSubmenu(null)}
                    >
                      {'< Back'}
                    </li>
                    {Object.entries(navItems[activeMobileSubmenu].submenu!).map(([category, items]) => (
                      <div key={category} className={styles.mobileSubmenuSection}>
                        <div className={styles.mobileSubmenuCategory}>{category}</div>
                        <ul>
                          {items.map((subItem, subIndex) => (
                            <li
                              key={subIndex}
                              onClick={() => {
                                subItem.onClick();
                                setIsMenuOpen(false);
                                setActiveMobileSubmenu(null);
                              }}
                            >
                              {subItem.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </>
                )}
              </ul>

              <motion.button
                className={styles.loginBtn}
                onClick={handleAuthClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                whileTap={{ scale: 0.95 }}
              >
                {refreshToken ? "Dashboard" : "Login"}
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeNav;