import React from 'react';
import styles from './YearTab.module.css';

function YearTab(props) {
  const { selectedOption, selectedYear, setSelectedYear } = props;
  return (
    selectedOption === "execom" && (
      <div style={{
        textAlign:"center",
        padding: '0.5rem 0rem',
        margin:'0rem 0.5rem'
      }} className={`${styles.submenu_wrapper} submenu submenu:hover`}
      >
        <button 
          style={{
            border: '2px solid white', 
            padding:'0rem 0.3rem',
            marginRight:'0.1rem',
            borderRadius:'5px'
          }}
          className={selectedYear === '2022' ? `${styles.submenu} ${styles.active_submenu}` : styles.submenu}
          onClick={() => setSelectedYear('2022')}
        >
          2022
        </button>
        <button 
          style={{
            border: '2px solid white', 
            padding:'0rem 0.3rem',
            marginLeft:'0.1rem',
            borderRadius:'5px' 
          }}
          className={selectedYear === '2023' ? `${styles.submenu} ${styles.active_submenu}` : styles.submenu}
          onClick={() => setSelectedYear('2023')}
        >
          2023
        </button>
      </div>
    )
  );
}

export default YearTab;
