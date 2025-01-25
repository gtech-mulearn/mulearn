import React from 'react';

const RoadMapTimeline = ({ roadMapData, handleSetCurrentCard }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      {roadMapData.map((level, levelIndex) => (
        <div key={level.level} className="mb-8 sm:mb-12" id={`level-${levelIndex}`}>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 rounded-lg text-left">{level.level}</h2>
          <div className="pl-4 border-l-2 border-gray-300">
            {level.cards.map((card) => (
              <div 
                key={card.title} 
                className="mb-6 sm:mb-8 relative cursor-pointer group"
                onClick={() => handleSetCurrentCard(card)}
              >
                <div className="absolute -left-[25px] top-1 w-4 h-4 bg-orange-400 rounded-full transition-transform group-hover:scale-110"></div>
                <div className="pl-4 sm:pl-6">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 flex items-center">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Resources: {card.resources} | Challenges: {card.proofOfWork}
                  </p>
                  <button 
                    className="text-blue-500 hover:underline text-sm sm:text-base mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          {levelIndex < roadMapData.length - 1 && (
            <button 
              type="button"
              className="mt-4 flex items-center justify-center w-full py-2 px-4 bg-gray-300 hover:bg-orange-500 transition-colors rounded-lg text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              onClick={() => {
                const nextLevel = document.getElementById(`level-${levelIndex + 1}`);
                nextLevel?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Skip to {roadMapData[levelIndex + 1].level}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoadMapTimeline;

