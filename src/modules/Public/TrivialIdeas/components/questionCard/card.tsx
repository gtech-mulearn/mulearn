import React,{useState} from 'react';
import styles from './card.module.css';

const QuestionCard = ({text,content}:{text:string,content:string}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleContent = () => {
        setIsOpen(!isOpen);
    }
  return (
    //put this style when isopen is true border: 2px solid #2E85FE;
    <div className={`${styles.questionCard}`} style={{borderColor:`${isOpen?"#2E85FE":""}`}}>
      <div className={styles.header}>
        <span className={styles.questionText}>Is there a registration cost ?</span>
        <button className={`${styles.arrowButton} ${isOpen? styles.ani_svg:""}`} onClick={toggleContent}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className={`${styles.content} ${isOpen ? styles.show : ''}`}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default QuestionCard;
