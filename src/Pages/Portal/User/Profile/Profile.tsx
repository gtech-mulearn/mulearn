import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Tasks from "./components/Tasks";
import Karma from "./components/Karma";
import Recent from "./components/Recent";
import Roles from "./components/Roles";
import Instagram from "./assets/svgs/Instagram";
import Discord from "./assets/svgs/Discord";
import Home from "./assets/svgs/Home";
import Navbar from "./components/Navbar";
import axios from "axios";
import SideNavBar from "../../../../Components/Dashboard/SideNavBar";

const Profile = () => {
  const width = window.innerWidth;
  const queryParameters = new URLSearchParams(window.location.search);
  const muid = queryParameters.get("muid");
  // console.log(width);
  const [name, setName] = useState("");
  const [karma, setKarma] = useState(0);
  const [roles, setRoles] = useState();
  const [tasks, setTasks] = useState();
  const [interstGroup, setInterstGroup] = useState([]);
  const [organization, setOrganization] = useState([]);

  useEffect(() => {
    const options = {
      method: "POST",
      url:
        import.meta.env.VITE_BACKEND_URL +
        "/api/v1/portal/profile/user/" +
        muid,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.response.interest_groups);
        setName(
          response.data.response.first_name +
            " " +
            response.data.response.last_name
        );
        setKarma(response.data.response.karma);
        setRoles(response.data.response.roles);
        setTasks(response.data.response.tasks);
        setInterstGroup(response.data.response.interest_groups);
        setOrganization(response.data.response.organization[0].name);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      <SideNavBar
        component={
          <div className={styles.profile_page}>
            <div className={styles.profile_container}>
              {/* <div>
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
                        <h1>{name}</h1>
                        <p>{organization}</p>
                        <div className={styles.area_of_intersts}>
                          {interstGroup.map((item) => {
                            return (
                              <div className={styles.area_of_interest}>
                                <p>{item}</p>
                              </div>
                            );
                          })}
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
                {width < 900 ? <Karma karma={karma} /> : null}

                <Tasks tasks={tasks} />
              </div> */}
              {/* <div>
                {width > 900 ? <Karma karma={karma} /> : null}
                <Recent />
                <Roles roles={roles} />
              </div> */}
              <p><b><i>Coming Soon!</i></b></p>
              <p>Wait for it</p>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Profile;
