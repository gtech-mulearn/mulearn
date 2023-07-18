import React, { useRef } from 'react'
import styles from './FindCircle.module.css'
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
            <div className={styles.content}>
                <div className={styles.desc}>
                    <h3>Find your learning circle</h3>
                    <p>Browse and join learning circle around you</p>
                    <div className={styles.ig_search}>
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
                <div className={styles.container}>
                    {learningCircles.map(circle => (
                        <>
                            <div className={styles.one}>
                                <h2>{circle.name}</h2>
                                <p>Team Lead: {circle.lead}</p>
                                <p>{circle.member_count} Members</p>
                                <div className={styles.join}>
                                    <button>Join</button>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            ) : (
                <div className={styles.error_container}>
                    <h1>Found no learning circles </h1>
                </div>
            )}
        </>
    );
}

export default FindCircle