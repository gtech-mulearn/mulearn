import React, { useEffect, useState } from "react";
import styles from "./InterestGroups.module.css";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { useUserStore } from "/src/ZustandProvider";
import { getInterestGroupsList } from "../../InterestGroup/apis";


type InterestGroup = {
  title: string;
  image?: string;
  link: string;
};

interface InterestGroupsProps {
  title: string;
  groups: InterestGroup[];
}


const currentIgsData: Record<string, string[]> = 
  {creative: ["46fe1fb7-7b04-4ebe-837d-120bc16d0e0a", ],
  maker: [""],
  coder: ["9b8aaf7f-16a0-4a66-ae53-79b8c25e5faa", "3a74725e-a05a-418b-a275-39d68ad9a416","1be43a3a-bcfb-4ef1-b77a-959b01bcb782","85fdd535-08d2-4619-9da7-944e21365de9","1719d19a-0206-4161-9c6f-0a7dba44d4e5"],
  manager: ["5bf2bdfe-5c22-48ab-9572-9e9836c70e79","04d29c15-4de4-4b43-ad63-0f4760c62919"]}


  

const InterestGroups: React.FC<InterestGroupsProps> = ({ title, groups }) => {
  const [igList, setIgList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getInterestGroupsList(setIgList, setIsLoading)
  },[])

  
  const selectedDomain = useUserStore((state) => state.userInfo.user_domains[0]);
  const currentIgs = igList.filter(igl => 
    currentIgsData[selectedDomain]?.some(ci => igl.id === ci)
);

  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {
        isLoading && 
        <div>
            <MuLoader />
          </div>
      }
      <div className={styles.IgTitleContainer}>
        <h3 className={styles.header}>Interest groups in {title}</h3>
        <button onClick={()=> navigate('/dashboard/interestgroups')}>Show more &gt; </button>
      </div>
      <div className={styles.list}>
        {currentIgs.map((group, index) => (
          <div key={index} className={styles.groupItem} onClick={() => navigate(`/dashboard/interestgroups/${group.id}`)}>
            <img
              src={"/assets/IG/mobile_dev.jpg"}
              alt={group.name}
              className={styles.groupImage}
              style={{marginBottom: '0'}}
              />
            <span className={styles.groupTitle}>{group.name.toUpperCase()}</span>
            <span className={styles.arrowLink}>
              <FaChevronRight className={styles.arrowIcon} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterestGroups;
