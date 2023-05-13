import styles from "./SideNavBar.module.css";

import { Outlet } from "react-router-dom";
import SideNavBar from "./SideNavBar";
import TopNavBar from "./TopNavBar";

const UserDashboardLayout = (props: { component?: any }) => {
  // const [opacity, setOpacity] = useState(null);
  return (
    <div className={styles.full_page}>
      <SideNavBar />
      <div className={styles.right_side}>
        <TopNavBar />
        <div className={styles.main_content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
