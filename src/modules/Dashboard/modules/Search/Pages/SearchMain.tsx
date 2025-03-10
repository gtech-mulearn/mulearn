import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./SearchMain.module.css";
import MuLearnersSearchPage from "./MulearnersSearchPage";
import MentorSearchPage from "../../Mentors/Pages/MentorPage";
import CampusSearchPage from "../../Campus/pages/CampusSearchPage";

const SearchMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paramTab = useParams<{ tab?: string }>().tab;

  const getActiveTab = (): string => {
    const queryParams = new URLSearchParams(location.search);
    const queryTab = queryParams.get("activetab");

    return queryTab && ["mulearners", "mentors", "campuses"].includes(queryTab)
      ? queryTab
      : paramTab && ["mulearners", "mentors", "campuses"].includes(paramTab)
      ? paramTab
      : "mulearners";
  };

  console.log("paramTab", paramTab);

  const [activeTab, setActiveTab] = useState<string>(getActiveTab);

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.search, paramTab]);

  const tabs = [
    { name: "µlearners", value: "mulearners" },
    { name: "Mentors", value: "mentors" },
    { name: "Campuses", value: "campuses" },
  ];

  const handleTab = (tab: string) => {
    setActiveTab(tab);
    navigate(`/dashboard/search?activetab=${tab}`, { replace: true });
  };

  return (
    <div className={styles.searchMain}>
      <div className={styles.tabs}>
        <ul className={styles.tabList}>
          {tabs.map((tab, index) => (
            <li
              key={index}
              onClick={() => handleTab(tab.value)}
              className={`${styles.tabItem} ${activeTab === tab.value ? styles.active : ""}`}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.tabContent}>
        {activeTab === "mulearners" && <MuLearnersSearchPage />}
        {activeTab === "mentors" && <MentorSearchPage />}
        {activeTab === "campuses" && <CampusSearchPage />}
      </div>
    </div>
  );
};

export default SearchMain;
