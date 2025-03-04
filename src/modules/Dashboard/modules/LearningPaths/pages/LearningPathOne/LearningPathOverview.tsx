import { SingleLearningPath } from "../../services/LearningPathInterfaces";
import { BsCheckCircle } from 'react-icons/bs';
import styles from "./LearningPathOne.module.css";
import { getDateDifference } from "/src/modules/Dashboard/utils/utils";
import { Avatar } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getMeetups } from "../../../LearningCircleV2/services/LearningCircleAPIs";
import { CircleMeetupInfo } from "../../../LearningCircleV2/services/LearningCircleInterface";

const LearningPathOverview = ({learningPathData, setActiveSection}: {learningPathData: SingleLearningPath, setActiveSection: React.Dispatch<React.SetStateAction<string>>}) => {

    const [learningCirclesData, setLearningCirclesData] = useState<CircleMeetupInfo[]>([]);

    useEffect(() => {
        getMeetups().then(res => {
            setLearningCirclesData(res.slice(0, 3));
        });
    }, [])    

    return (

        <div className={styles.overViewContainer}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>About {learningPathData.title}</h1>
                    <button className={styles.continueButton}
                        onClick={() => setActiveSection('Topics')}
                    >
                        Continue
                        <span className={styles.arrow}>→</span>
                    </button>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionIcon}></div>
                    <h2 className={styles.sectionTitle}>Overview</h2>
                    <p className={styles.overview}>
                        {learningPathData.desc}
                    </p>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionIcon}></div>
                    <h2 className={styles.sectionTitle}>What You'll Learn</h2>
                    <div className={styles.learningGrid}>
                        {learningPathData.learnings.map((item, index) => (
                            <div key={index} className={styles.learningItem}>
                                <BsCheckCircle className={styles.checkIcon} />
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionIcon}></div>
                    <h2 className={styles.sectionTitle}>Skills You'll Gain</h2>
                    <div className={styles.skillsContainer}>
                        {learningPathData.skills.map((skill) => (
                            <span key={skill} className={styles.skillPill}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionIcon}></div>
                    <h2 className={styles.sectionTitle}>Projects</h2>
                    <div className={styles.skillsContainer}>
                        {learningPathData.projects.map((project) => (
                            <span key={project} className={styles.projectPill}>
                                {project}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.overviewRightContainer}>
                <div className={styles.overviewCard}>
                    <div>
                        <span>Join the {learningPathData.title}'s Community</span>
                        <p>
                            Join the chat, connect with peers and make progress on this roadmap!
                        </p>
                        <button><a href="https://discord.com/invite/gtech-mulearn-771670169691881483" target="_blank" rel="noreferrer">Join the Community</a></button>
                    </div>
                    <img src='/assets/dashboard/illustrations/students_learning.jpg' alt="students learning" width="80px" height="40px" />
                </div>
                <div className={styles.overviewCard}>
                    <div>
                        <span>Find Learners Near You</span>
                        <p>
                            Create private learning groups, invite friends, and collaborate on challenges and share your learning to learn and grow together.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span></span>
                            {/* <button><a href="https://discord.com/invite/gtech-mulearn-771670169691881483" target="_blank" rel="noreferrer" style={{ fontSize: '0.7rem', alignSelf: 'flex-end' }}>Create</a></button> */}
                        </div>
                        <div>
                            {
                                learningCirclesData.map((lc, index) => (
                                    <div key={index} className={styles.lcCards}>
                                        <div className={styles.lcCardData}>
                                            <div style={{display:'flex'}}>
                                                <Avatar size="xs" name="Sage" style={{ marginBottom: '0', marginRight: '5px' }} src="https://bit.ly/sage-adebayo" />
                                                <p className={styles.lcCardTitle} style={{ fontWeight: '700', marginTop: '2px' }}>{lc.title}</p>
                                            </div>
                                            <FaChevronRight style={{ marginBottom: '0', marginTop: '6px' }} />
                                        </div>
                                        <div className={styles.lcCardInfo}>
                                            <span style={{ fontSize: '0.7rem', marginBottom: '0', fontWeight: '400' }}>4 Peers Are joining</span>
                                            <p className={styles.lcCardDate} style={{ fontSize: '0.75rem', marginTop: '0', fontWeight: '600' }}>{getDateDifference(lc.meet_time)}</p>
                                            {/* <p className={styles.lcCardTitle}>{lc.learners} Learners Are joining</p> */}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.cardFooter}>
                            <button onClick={()=> setActiveSection('Learning Circles')}>Explore More</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default LearningPathOverview;