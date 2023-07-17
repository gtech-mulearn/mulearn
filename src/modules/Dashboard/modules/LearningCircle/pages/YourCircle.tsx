import React from 'react'
import styles from './YourCircle.module.css'
import imageTop from '../../../assets/images/LC2.png'
import imageBottom from '../../../assets/images/LC3.png'

type circleListELement={
    name:string,
    type:string
}

const YourCircle = () => {
    
    const learningCircles:[circleListELement]|null =
    [
        {name:'UX World',type:'UI/UX'}
    ]

    return (
    <>
    <div className={styles.content}>
            <img src={imageTop} alt="image"/>
            <div className={styles.desc}>
                <h3>Learn,share,together</h3>
                <p> A fantastic way to spend a small amount of time learning about new things<br/> with a group of people with same interests!</p>
                <div className={styles.button}>
                <button className={styles.join}>Join</button>
                <button className={styles.create}>Create</button>
                </div>
            </div>
        </div>
        <div className={styles.middle}>
            
            
            <ul className={styles.accordian}>
                <h2>Your learning circles</h2>

                {(learningCircles)?
                
                <>{learningCircles.map((circle,pos)=><>
                    <li className={styles.mainlist}>
                        <input 
                            className={styles.expandBtn} 
                            type="radio" 
                            name="accordian" 
                            id={circle.name} 
                        />
                        <label htmlFor={circle.name} className={styles.level}>
                            <div>
                                <p className={styles.para}>{`${pos}.`}</p>
                                <p className={styles.para}>{circle.name}</p>
                                </div>
                            <div>
                                <p className={styles.para}>{circle.type}</p>
                                <button className={styles.btn}>
                                    <i className={[styles['fa-solid'], styles['fa-chevron-right']].join(' ')}></i>
                                </button>
                            </div>
                        </label>
                    </li>
                    </>)
                }</> 
                :
                <div className={styles.middle}>
                    <img src={imageBottom} alt="You haven't joined any circles yet"/>
                </div>
                
                }
                
            </ul>
        </div>
    </>
  )
}

export default YourCircle