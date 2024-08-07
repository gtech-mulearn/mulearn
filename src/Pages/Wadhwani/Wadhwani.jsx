import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
// import { CircularProgress } from "@mui/material";

import styles from "./Wadhwani2.module.css";
import styles2 from "./Wadhwani.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import leader from "./assets/Leader.gif";
// import {  getData  } from "./services/api";
import courseData from "./services/Data.json"
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#f78c40",
    },
  },
});

const Wadhwani = () => {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getData(setData,setLoading)
  //   getData(setData)
  // }, []);

  // if (loading) {
  //   return (
  //     <div className={styles.loadingContainer}>
  //       <CircularProgress />
  //       <Typography>Loading...</Typography>
  //     </div>
  //   );
  // }

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className={styles2.third_view_container} id="success-stories">
        <div className={styles2.third_view}>
          <div className={styles2.header}>
            <div className={styles2.tv_texts}>
              <p className={styles.tv_heading}>
                <span>Wadhwani</span> Is Here!
              </p>
              <p className={styles.tv_tagline}>
                Wadhwani helps students learn and grow holistically by focusing
                on the soft skills of the person.
              </p>
              <p>Feel free to check out our courses!</p>
              <a className={styles.buttonMuorange} href="https://app.mulearn.org/dashboard/wadhwani">
                Explore Wadhwani
              </a>
            </div>
            <div className="svg">
              <img src={leader} alt="Leader" className={styles.fv_img} />
            </div>
          </div>

          <div className={styles2.tv_story_container}>
            {courseData.map((item, index) => (
              <div className={styles2.tv_story}>
                <Card
                  key={index}
                  sx={{
                    width: 400,
                    height: 200,
                    border: "1px solid hsla(0, 0%, 100%, .18)",
                    borderRadius: "15px",
                    boxShadow: "0 1px 12px 0 rgb(193 195 211 / 37%)",
                    marginBottom: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    

                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.courseName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description.substring(0, 120)}...
                    </Typography>
                    <Typography variant="body4" color="text.secondary">
                      Duration: {item.CourseDuration} hrs
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default Wadhwani;
