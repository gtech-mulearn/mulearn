import { useState } from "react"
import styles from "./SearchMain.module.css"
import MuLearnersSearchPage from "./MulearnersSearchPage"
import MentorSearchPage from "../../Mentors/Pages/MentorPage"
import CampusSearchPage from "../../Campus/pages/CampusSearchPage"

const SearchMain = () => {
  const [activeTab, setActiveTab] = useState<string>("mulearners")
  const tabs = [
    {
      name: "µlearners",
      value: "mulearners",
    },
    {
      name: "Mentors",
      value: "mentors",
    },
    {
      name: "Campuses",
      value: "campuses",
    },
  ]

  const handleTab = (tab: string) => {
    setActiveTab(tab)
  }

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
  )
}

export default SearchMain

