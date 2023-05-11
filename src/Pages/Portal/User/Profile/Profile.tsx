import styles from "./Profile.module.css";

import SideNavBar from "../../../../Components/Dashboard/SideNavBar";

const Profile = () => {
  return (
    <>
      <SideNavBar
        component={
          <div className={styles.profile_page}>
            <div className={styles.profile_container}>
              <p className={styles.heading}>Coming Soon!</p>

              <p className={styles.tagline}>Wait for it</p>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Profile;
