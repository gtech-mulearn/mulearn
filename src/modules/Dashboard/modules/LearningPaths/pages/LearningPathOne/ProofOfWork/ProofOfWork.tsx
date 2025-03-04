import { useEffect, useState } from "react";
import LearningPathTable from "../LearningPathTable";
import styles from "../LearningPathOne.module.css";
import { useParams } from "react-router-dom";
import { SingleLearningPathTasks } from "../../../services/LearningPathInterfaces";
import { getLearningPathTasks } from "../../../services/LearningPathApis";
import ProofOfWorkOuterTable from "./ProofOfWorkOuterTable";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ProofOfWork = () => {
    const [activeLevel, setActiveLevel] = useState(1);
    const { id = '' } = useParams();
    const [learningPathData, setLearningPathData] = useState<SingleLearningPathTasks>({
        id: "",
        problems: [],
    });

    useEffect(()=> {
        getLearningPathTasks(id, setLearningPathData)
    }, [id]);

    return (
        <div>
            <div className={styles.topicsNav}>
                {learningPathData.problems?.map(({ level }, index) => (
                    <button
                        key={index}
                        className={`${styles.topicButton} ${activeLevel === level ? styles.active : ''}`}
                        onClick={() => setActiveLevel(level)}
                    >
                        Level {level}
                    </button>
                ))}
            </div>
            <TransitionGroup>
                <CSSTransition
                    key={activeLevel}
                    timeout={300}
                    classNames={{
                        enter: styles.slideEnter,
                        enterActive: styles.slideEnterActive,
                        exit: styles.slideExit,
                        exitActive: styles.slideExitActive,
                    }}
                >
                    <ProofOfWorkOuterTable
                        taskList={
                            learningPathData.problems.find(e => e.level === activeLevel)?.tasks
                        }
                    />
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
};

export default ProofOfWork;
