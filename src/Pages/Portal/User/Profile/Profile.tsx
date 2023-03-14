import React from "react";
import styles from "./Profile.module.css";
import Tasks from "./components/Tasks";
import Karma from "./components/Karma";
import Recent from "./components/Recent";
import Roles from "./components/Roles";
import Instagram from "./assets/svgs/Instagram";
import Discord from "./assets/svgs/Discord";
import Home from "./assets/svgs/Home";
import Navbar from "./components/Navbar";

type Props = {};

const Profile = (props: Props) => {
  const width = window.innerWidth;
  console.log(width);

  return (
    <>
      <Navbar />
      <div className={styles.profile_page}>
        <div className={styles.profile_container}>
          <div>
            <div className={styles.profile}>
              <div className={styles.cover_image}>
                <img src="https://marketplace.canva.com/EAEmB3DmXk0/1/0/1600w/canva-bright-gradient-lettering-rainbow-facebook-cover-0Z5QgybLshE.jpg" />
              </div>
              <div className={styles.profile_details_div}>
                <div className={styles.profile_pic}>
                  <img src="https://whatsondisneyplus.com/wp-content/uploads/2021/12/merida-avatar-wodp.png" />
                </div>
                <div className={styles.profile_details}>
                  <div className={styles.profile_detail}>
                    <h1>James Ronald</h1>
                    <p>College Of Engineering Something</p>
                    <div className={styles.area_of_intersts}>
                      <p>UI Designing</p>
                      <p>Blockchain</p>
                      <p>Intresteed fields</p>
                    </div>
                  </div>
                  <div className={styles.profile_social}>
                    <p className="social">
                      <Home /> Kannur
                    </p>
                    <p className="social">
                      <Instagram />
                    </p>
                    <p className="social">
                      <Discord />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {width < 900 ? <Karma /> : null}

            <Tasks />
          </div>
          <div>
            {width > 900 ? <Karma /> : null}
            <Recent />
            <Roles />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
