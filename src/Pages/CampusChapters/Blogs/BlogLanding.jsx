import React from 'react'
import styles from "./../CampusChapters.module.css";
import styles2 from "./blogLanding.module.css";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import gif from './assets/Leader.gif';


import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
    palette: {
        primary: {
            main: '#f78c40'
        }
    }
});

const BlogLanding = () => {
    return (
        <>
            <Navbar />
            <div className={styles2.third_view_container} id="success-stories">
                <div className={styles2.third_view}>
                    <div className={styles2.header}>
                        <div className={styles2.tv_texts}>
                            <p className={styles.tv_heading}>
                                <span>Campus</span> Success Stories
                            </p>
                            <p className={styles.tv_tagline}>
                                Get insights into how μLearn Campus Chapters have collaborated
                                with Student heroes to build a vibrant campus community.
                            </p>
                        </div>
                        <div className="svg">
                            <img
                                src={gif}
                                alt=""
                                className={styles.fv_img}
                            />
                        </div>
                    </div>

                    <div className={styles2.tv_story_container}>
                        <div className={styles2.tv_story}>
                            <Card sx={{ maxWidth: 345, height: 500, border: "1px solid hsla(0, 0%, 100%, .18)", borderRadius: "10px", boxShadow: "0 1px 12px 0 rgb(193 195 211 / 37%)" }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="30"
                                        image="/assets/campuscommunity/amirtha.webp"
                                        alt="Amritha G S"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Amritha G S
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Read the Story of a Graduate in Electrical and
                                            Electronics Engineering and the way she steered her
                                            college as one of the top-performing colleges among the
                                            200+ onboarded across the state.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Link to="/blogs/amirtha-gs">
                                        <ThemeProvider theme={theme}>
                                            <Button size="small" color="primary">
                                                <span>Read More...</span>
                                            </Button>
                                        </ThemeProvider>
                                        
                                    </Link>
                                </CardActions>
                            </Card>
                        </div>
                        <div className={styles2.tv_story}>
                            <Card sx={{ maxWidth: 345, height: 500, border: "1px solid hsla(0, 0%, 100%, .18)", borderRadius: "10px", boxShadow: "0 1px 12px 0 rgb(193 195 211 / 37%)" }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="30"
                                        image="/assets/campuscommunity/jessno.webp"
                                        alt="Jessno Oommen Jose"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Jessno Oommen Jose
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Read the Story of a Graduate in Electronics and
                                            Communication Engineering and how she placed her college
                                            in the first position in the state and became the Kerala
                                            state lead of 𝝁Learn.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Link to="/blogs/jessno-oomen">

                                        <ThemeProvider theme={theme}>
                                            <Button size="small" color="primary">
                                                <span>Read More...</span>
                                            </Button>
                                        </ThemeProvider>
                                    </Link>
                                </CardActions>
                            </Card>
                        </div>

                        <div className={styles2.tv_story}>
                            <Card sx={{ maxWidth: 345, height: 500, border: "1px solid hsla(0, 0%, 100%, .18)", borderRadius: "10px", boxShadow: "0 1px 12px 0 rgb(193 195 211 / 37%)" }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="10"
                                        image="/assets/campuscommunity/sandra.webp"
                                        alt="Jessno Oommen Jose"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Sandra Pramod
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Read the Story of a graduate of Computer Science and
                                            Engineering who transformed her college to the
                                            top-performing college for the academic year 2021–2022
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Link to="/blogs/sandra-pramod">
                                        <ThemeProvider theme={theme}>
                                            <Button size="small" color="primary">
                                                <span>Read More...</span>
                                            </Button>
                                        </ThemeProvider>
                                    </Link>
                                </CardActions>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ThemeProvider theme={theme}>
      // MUI components
            </ThemeProvider> */}
            
            <Footer />
        </>
    )
}

export default BlogLanding