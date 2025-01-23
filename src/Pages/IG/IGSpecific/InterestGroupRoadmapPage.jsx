import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import RoadMapTimeline from "./components/RoadMapTImeline";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import { Heart } from "lucide-react";

export default function InterestGroupRoadmapPage() {
  const location = useLocation();
  const { roadMapData, activeCard, interestGroupName } = location.state || {};
  const [currentCard, setCurrentCard] = useState(activeCard);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  function handleSetCurrentCard(card) {
    setCurrentCard(card);
  }

  if (!roadMapData || !activeCard) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row flex-grow bg-[rgba(255,255,255,1)] w-full overflow-hidden overflow-y-auto">
        <div className="lg:w-1/4 lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
          <RoadMapTimeline
            activeCard={activeCard}
            roadMapData={roadMapData}
            handleSetCurrentCard={handleSetCurrentCard}
          />
        </div>
        <div className="lg:w-3/4 p-4 lg:p-8 max-w-6xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col mb-6 justify-start items-start">
              <h1 className="text-left text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400 mb-4">
                {interestGroupName}
              </h1>
              <h2 className="text-left text-xl sm:text-2xl font-semibold text-black m-0">
                {currentCard?.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {currentCard?.data?.description}
              </p>
            </div>
            <div className="flex flex-col items-start justify-start rounded-md bg-white shadow-md">
              <h2 className="text-xl sm:text-2xl text-left font-semibold text-black m-0 p-4 rounded-t-md w-full bg-gray-100">
                What you will learn
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 p-4 text-sm sm:text-base">
                {currentCard?.data?.whatYouWillLearn.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col items-start justify-start rounded-md bg-white shadow-md">
                <h2 className="text-xl sm:text-2xl text-left font-semibold text-black m-0 p-4 rounded-t-md w-full bg-gray-100">
                  Challenges
                </h2>
                {currentCard?.data?.challenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="border-t border-gray-200 w-full  first:mt-0 first:border-t-0">
                    <h3 className="bg-orange-400 p-3 sm:p-4 text-left font-medium text-white text-sm sm:text-base">
                      {challenge.title}
                    </h3>
                    <p className="p-3 sm:p-4 text-sm sm:text-base">
                      {challenge.description}
                    </p>
                    <ul className="p-3 sm:p-4 space-y-2">
                      {challenge.resources?.length > 0 && (
                        <>
                          <p className="px-4 py-1 border border-orange-400 text-orange-400 flex items-center justify-center w-36 rounded-full text-sm gap-2">
                            <Heart size={16} /> Resources
                          </p>
                          <li className="text-sm sm:text-base flex gap-2 flex-wrap">
                            {challenge.resources.map((resource, index) => {
                              const domain = (() => {
                                try {
                                  const hostname = new URL(resource).hostname.replace(/^www\./, '');
                                  // Special case for YouTube URLs
                                  if (hostname.includes('youtu.be') || hostname.includes('youtube')) {
                                    return 'youtube.com';
                                  }
                                  return hostname;
                                } catch {
                                  return 'Invalid URL';
                                }
                              })();

                              return (
                                <a
                                  key={index}
                                  aria-label={`Visit ${domain}`}
                                  href={resource}
                                  className="text-black  border bg-green-300 hover:bg-green-400 text-sm px-2 py-1 rounded-md">
                                  {domain}
                                </a>
                              );
                            })}
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
