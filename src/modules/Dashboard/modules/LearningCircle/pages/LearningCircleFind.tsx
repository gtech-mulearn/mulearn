import React, { useRef } from 'react'
import styles from './LearningCircle.module.css'
import imageTop from '../assets/images/LC1.png'

type circleListELement={
    name:string,
    lead:string,
    member_count:number

}

type igListElement = {
    value:string,
    name:string
}

const FindCircle = () => {
  
    const learningCircles:circleListELement[]|null = [
        {name:"UX World",lead:'me',member_count:69},
        {name:"vera UX World",lead:'njan',member_count:420}
    ]
    const igs:igListElement[]|null=[
        {name:'college',value:'123'},
        {name:'vera college',value:'124'},
    ]
    const searchBarRef=useRef<HTMLSelectElement|null>(null)
    const handleSearch = ()=>{
        console.log(searchBarRef.current!.value)
    }

    return (
        <>
            <div className={styles.learningCircleFindContent}>
                <div className={styles.learningCircleFindDesc}>
                    <h3>Find your learning circle</h3>
                    <p>Browse and join learning circle around you</p>
                    <div className={styles.learningCircleFindIgSearch}>
                        <select name="ig" ref={searchBarRef}>
                            {igs.map(ig => (
                                <>
                                    <option value={ig.value}>{ig.name}</option>
                                </>
                            ))}
                        </select>
                        <button onClick={handleSearch}></button>
                    </div>
                </div>
                <img src={imageTop} alt="image" />
            </div>

            {learningCircles ? (
                <div className={styles.learningCircleFindContainer}>
                    {learningCircles.map(circle => (
                        <>
                            <div className={styles.learningCircleFindOne}>
                                <h2>{circle.name}</h2>
                                <p>Team Lead: {circle.lead}</p>
                                <p>{circle.member_count} Members</p>
                                <div className={styles.learningCircleFindJoin}>
                                    <button>Join</button>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            ) : (
                <div className={styles.learningCircleFindErrorContainer}>
                    <h1>Found no learning circles </h1>
                </div>
            )}
        </>
    );
}

export default FindCircle