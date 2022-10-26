import React, { useState } from "react";
import Navbar from "../../../../Components/Navbar/Navbar";
import Footer from "../../../../Components/Footer/Footer";
import styles from "./FindCampus.module.css";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FindCampus = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Navbar />
      <div className={styles.main_view_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>Find a Campus Near you</p>
              <p className={styles.fv_tagline}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
                labore, dolores veniam ullam architecto asperiores officia
                distinctio sapiente facilis, eveniet dicta quaerat incidunt
                error! Cumque.
              </p>
            </div>

            <Box sx={{ marginTop: 5, borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="North Zone" {...a11yProps(0)} />
                <Tab label="South Zone" {...a11yProps(1)} />
                <Tab label="East Zone" {...a11yProps(2)} />
                <Tab label="West Zone" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className={styles.card_container}>
                <div className={styles.college_card}>
                  <p className={styles.college_name}>
                    St.Joseph's Engineering College
                  </p>
                  <p className={styles.college_district}>Kottayam</p>
                </div>
                <div className={styles.college_card}>
                  <p className={styles.college_name}>
                    St.Joseph's Engineering College
                  </p>
                  <p className={styles.college_district}>Kottayam</p>
                </div>
                <div className={styles.college_card}>
                  <p className={styles.college_name}>
                    St.Joseph's Engineering College
                  </p>
                  <p className={styles.college_district}>Kottayam</p>
                </div>
                <div className={styles.college_card}>
                  <p className={styles.college_name}>
                    St.Joseph's Engineering College
                  </p>
                  <p className={styles.college_district}>Kottayam</p>
                </div>
                <div className={styles.college_card}>
                  <p className={styles.college_name}>
                    St.Joseph's Engineering College
                  </p>
                  <p className={styles.college_district}>Kottayam</p>
                </div>
                <div className={styles.college_card}>
                  <p className={styles.college_name}>
                    St.Joseph's Engineering College
                  </p>
                  <p className={styles.college_district}>Kottayam</p>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className={styles.card_container}>
                <div className={styles.college_card}>
                  <p className={styles.college_name}>
                    NSS College Of Engineering
                  </p>
                  <p className={styles.college_district}>Kottayam</p>
                </div>
                <div className={styles.college_card}>
                  <p className={styles.college_name}>
                    NSS College Of Engineering
                  </p>
                  <p className={styles.college_district}>Palakkad</p>
                </div>
                <div className={styles.college_card}>
                  <p className={styles.college_name}>
                    NSS College Of Engineering
                  </p>
                  <p className={styles.college_district}>Palakkad</p>
                </div>
                <div className={styles.college_card}>
                  <p className={styles.college_name}>
                    NSS College Of Engineering
                  </p>
                  <p className={styles.college_district}>Palakkad</p>
                </div>
                <div className={styles.college_card}>
                  <p className={styles.college_name}>
                    NSS College Of Engineering
                  </p>
                  <p className={styles.college_district}>Palakkad</p>
                </div>
                <div className={styles.college_card}>
                  <p className={styles.college_name}>
                    NSS College Of Engineering
                  </p>
                  <p className={styles.college_district}>Palakkad</p>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Four
            </TabPanel>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindCampus;
