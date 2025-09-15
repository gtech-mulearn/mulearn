import { useEffect, useState, useCallback, useMemo } from "react";
import styles from "./PublicIGSelector.module.css";
import { publicGateway } from "@/MuLearnServices/apiGateways";
import { onboardingRoutes } from "@/MuLearnServices/urls";

type Props = {
  selectedIg: InterestGroup | null;
  setSelectedIg: React.Dispatch<React.SetStateAction<InterestGroup | null>>;
};

const PublicIGSelector = (props: Props) => {
  const [allIg, setAllIg] = useState<InterestGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllPublicIg = async () => {
      try {
        setIsLoading(true);
        const response = await publicGateway.get(onboardingRoutes.areaOfInterestList);
        const igs = response.data.response.aois || [];
        setAllIg(igs);
      } catch (error) {
        console.error("Failed to fetch interest groups:", error);
        setAllIg([]);
      } finally {
        setIsLoading(false);
      }
    };

    getAllPublicIg();
  }, []); // Empty dependency array to run only once on mount

  // Separate effect for setting default selection
  useEffect(() => {
    if (!props.selectedIg && allIg.length > 0) {
      props.setSelectedIg(allIg[0]);
    }
  }, [allIg, props.selectedIg, props.setSelectedIg]);

  const ig_sorted = useMemo(() => {
    return allIg.sort((a: any, b: any) => {
      return a.name > b.name ? 1 : -1;
    });
  }, [allIg]);

  const handleIgClick = useCallback((data: InterestGroup) => {
    props.setSelectedIg(data);
  }, [props]);

  if (isLoading) {
    return (
      <div className={styles.interestGrp}>
        <div className={styles.top_sec}>
          <b>Select Interest Group</b>
        </div>
        <div className={styles.igs_container}>
          <p>Loading interest groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.interestGrp}>
      <div className={styles.top_sec}>
        <b>Select Interest Group</b>
      </div>
      <div className={styles.igs_container}>
        {ig_sorted.length > 0 ? (
          ig_sorted.map((data: any, i: number) => (
            <div
              style={
                props.selectedIg?.id === data.id 
                  ? { backgroundColor: "#456ff6", color: "white" } 
                  : {}
              }
              className={styles.igs}
              key={data.id || i}
              onClick={() => handleIgClick(data)}
            >
              {data.name}
            </div>
          ))
        ) : (
          <p>No interest groups available</p>
        )}
      </div>
    </div>
  );
};

export default PublicIGSelector;