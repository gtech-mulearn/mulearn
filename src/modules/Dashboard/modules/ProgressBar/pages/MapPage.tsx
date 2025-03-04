import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { getPublicUserLevels, getUserLevels } from "../../Profile/services/api";
import GameProgressBar from "../components/GameProgressBar";

const Mappage = () => {
  const { id } = useParams<{ id: string }>();
  const [userLevelData, setUserLevelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLevelData = async () => {
      try {
        setIsLoading(true);
        if (id) {
          // Fetch public user levels if an id is provided
          await getPublicUserLevels(setUserLevelData, id);
        } else {
          // Fetch authenticated user's levels if no id
          await getUserLevels(setUserLevelData);
        }
      } catch (err) {
        console.error("Error fetching level data:", err);
        setError("Failed to load level data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLevelData();
  }, [id]);

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-full p-4">
        {isLoading ? (
          <MuLoader />
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <GameProgressBar levelData={userLevelData} />
        )}
      </div>
    </div>
  );
};

export default Mappage;