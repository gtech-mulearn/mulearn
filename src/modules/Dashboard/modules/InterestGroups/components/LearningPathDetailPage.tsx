import React, { useState } from "react";

import styles from "./LearningPathDetailPage.module.css";
import { TaskCard } from "../../LearningPathNew/Pages/LearningPathPage";
import { FormattedLevel } from "../../LearningPathNew/services/api";
import CardCarousel from "./CardCarousel/CardCarousal";
import { OffCanvasLearningPath } from "./OffCanvasLearningPath/OffCanvasLearningPath";
import { FiArrowLeft } from "react-icons/fi";

interface LearningPathDetailPageProps {
  level: string;
  card: any;
  onBack: () => void;
  formattedTasks: FormattedLevel[];
}

const LearningPathDetailPage: React.FC<LearningPathDetailPageProps> = ({
  level,
  card,
  onBack,
  formattedTasks
}) => {
  const [offCanvasOpen, setOffCanvasOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const selectedLevelData = formattedTasks.find(
    task => task.level === Number(level.replace("Level ", ""))
  );
  console.log(card);

  const tasks = selectedLevelData?.cards || [];

  const handleCloseOffCanvas = () => {
    setOffCanvasOpen(false);
    setSelectedData(null);
  };

  const handleOpenOffCanvas = (data: any) => {
    setSelectedData(data);
    setOffCanvasOpen(true);
  };

  return (
    <div className={styles.detailContainer}>
      <button onClick={onBack} className={styles.backButton}>
        <FiArrowLeft/>
      </button>
      <div className={styles.header}>

      <h1 className={styles.title}>
        {level} - {card.title}
      </h1>
      <p>{card.data.description}</p>
      </div>
      <div className={styles.tasksContainer}>
        <h3>Tasks</h3>
        <CardCarousel
          children={
            tasks.length > 0 ? (
              tasks.map((taskCard, index) => (
                <div className={styles.cardInner}>
                  <TaskCard
                    key={index}
                    card={taskCard}
                    onClickCTA={(card) => {
                      handleOpenOffCanvas(card)
                    }}
                    custom={true}
                  />
                </div>
              ))
            ) : (
              <p>No tasks available for this level.</p>
            )
          }
        />
      </div>
      <OffCanvasLearningPath
        isOpen={offCanvasOpen} onClose={handleCloseOffCanvas} data={selectedData}
      />
    </div>
  );
};

export default LearningPathDetailPage;
