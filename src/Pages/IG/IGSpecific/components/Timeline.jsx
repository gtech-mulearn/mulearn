"use client";
import { motion } from "framer-motion";
import { LevelCard } from "./LevelCard";
import { useNavigate } from "react-router-dom";

function Timeline({ timelineData, igName }) {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate(`roadmap/${card.title.toLowerCase().replace(/\s+/g, '-')}`, {
      state: { roadMapData: timelineData, activeCard: card, interestGroupName: igName  }
    });
  };

 

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {timelineData.map((level, index) => (
        <motion.div
          key={level.level}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="mb-8">
          <div className="flex justify-center mb-4 ">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 + 0.2 }}
              className="bg-white px-4 py-1 rounded-full shadow-sm border border-neutral-200">
              <span className="text-gray-600">{level.level}</span>
            </motion.div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div
              className={`grid gap-8 ${
                level.cards.length === 1
                  ? "grid-cols-1 place-items-center"
                  : level.cards.length === 2
                  ? "md:grid-cols-2  place-items-center"
                  : "grid-cols-1 md:grid-cols-3"
              }`}
              >
              
              {level.cards.map((card, cardIndex) => (
                <motion.div
                  key={card.title}
                  onClick={() => handleCardClick(card)}
             
                  initial={{ opacity: 0, x: cardIndex % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 0.4 + cardIndex * 0.2 }}>
                  <LevelCard card={card} />
                </motion.div>
              ))}
            </div>
          </div>
          {/* {index < timelineData.length - 1 && (
            <JumpButton level={level.level} />
          )} */}
        </motion.div>
      ))}
    </div>
  );
}

export default Timeline;