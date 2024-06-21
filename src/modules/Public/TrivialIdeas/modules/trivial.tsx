import {useState,useEffect} from "react";
import styles from "./trivial.module.css";
import logo from "../assets/µLearn.svg";
import white_logo from "../assets/logo_whight.svg";
import Button from "../components/botton/button";
import Price from "./price";
import ProcessDiagram from "./process/process";
import Faqs from "./faq";
import Footer from "../components/footer/footer";
import pattern1 from "../assets/pattern1.png";
import pattern2 from "../assets/pattern2.png";
import pattern3 from "../assets/pattern3.png";
import pattern4 from "../assets/pattern4.png";
import steve from "../assets/steve.png"
import elone from "../assets/elone.png"
import mark from "../assets/mark.png"
import peoples from "../assets/peoples.png"
import arrow from "../assets/arrow.png"
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion"


const navbar = (handelClick:any) => {

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <img src={logo} alt="" />
            </div>
            <div className={styles.navbarLinks}>
                <a href="#">About</a>
                <a href="#">Questions</a>
                <a href="">
                    <Button text={null} color={"black"} name={"Join Us"} />
                </a>
            </div>
            <div onClick={handelClick} className={styles.hamburger}>
                <IoMenu size={35} />
            </div>
        </div>
    );
}

const patterns = [
    {
        img: pattern1,
        text: "A chance to build and deploy your ideas"
    },
    {
        img: pattern2,
        text: "Forge connections that elevate you"
    },
    {
        img: pattern3,
        text: "Get a chance to win ₹ 1 lakh prize pool"
    },
    {
        img: pattern4,
        text: "Get feedbacks from certified mentors"
    }
];

function Trivial() {
    const [isopen, setisopen] = useState(false);

    useEffect(() => {
        if (isopen) {
          // Disable scrolling
          document.body.style.overflow = 'hidden';
        } else {
          // Enable scrolling
          document.body.style.overflow = 'auto';
        }
    
        // Clean up function to re-enable scrolling when the component unmounts
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [isopen]);

    const handelSideNav = () => {
        setisopen(!isopen);
        // console.log("clicked");
    }
    return ( 
        <>
        <div className={`${styles.container}`}>
            <motion.div
            animate={{x: isopen?'-100%':0}}
            className={styles.sidenav}>
                <div style={{
                    display:"flex",
                    justifyContent:"space-between",
                    width:"100%",
                }}>
                    <img src={white_logo} alt="" />
                    <div style={{cursor:"pointer",backgroundColor:"white", color:"black",padding:'0.5rem',borderRadius:"2.5rem"}} onClick={handelSideNav}>
                        <IoMdClose size={35} />
                    </div>
                </div>
                <div>
                    <a href="#">About</a>
                    <a href="#">Questions</a>
                    <a href="">
                    <button
                        style={
                            {
                                color: 'black',
                                backgroundColor: `white`,
                                padding: "10px 20px",
                                borderRadius: "5rem",
                                fontSize:"1rem",
                                fontWeight:"bold",
                            }
                        }
                        >Join Now</button>
                    </a>
                </div>
            </motion.div>
            {navbar(handelSideNav)}
            <div className={`${styles.content}`}>
                <h1>Trivial Ideas</h1>
                <div>
                    <p>
                    Turn <img src={steve} alt="" /> Your
                    </p>
                    <p>
                    Crazy, Wild <img src={elone} alt="" /> Ideas
                    </p>
                    <p>
                    Into <img src={mark} alt="" /> Real Products!
                    </p>
                </div>
                <div className={`${styles.subText}`}>
                    <div>
                        <p>
                        The ultimate playground for innovative minds ready to transform 
                        </p>
                        <p>
                        even their wildest dreams into tangible projects.
                        </p>
                    </div>
                <Button text={null} color={"black"} name={"Submit Now!"} />
                </div>
            </div>
            <div className={`${styles.content2} ${styles.bold_text}`}>
                <div style={{textAlign:"center"}}>
                    <p>Work on ideas that <span>Excites</span> you</p>
                    <div
                    style={{
                        padding: "0rem 0",
                    }}
                    >
                    <p>This monthly event is your chance to transform your </p>
                    <p>'What If' ideas into something real. And guess what?</p>
                    <p>We’ll reward you for your creativity!</p>
                    </div>
                </div>
                <div className={`${styles.patter_container}`}>
                    {
                        patterns.map((pattern, index) => {
                            return (
                                <div className={`${styles.card}`} key={index}>
                                    <img src={pattern.img} style={{height:"200px",width:"200px"}} alt="q" />
                                    <p>{pattern.text}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <Price />
            <ProcessDiagram />
            <Faqs />
            <div className={styles.content4}>
                <h1>Some <span style={{
                    color:"#2E85FE"
                }}>Crazy</span> People</h1>
                <div className={styles.image_container}>
                    <img src={peoples} alt="" />
                    <img className={styles.arrow} src={arrow} alt="" />
                </div>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                }}>
                    <p>Let Us See Your <span>Creation</span></p>
                    <p>submit now!</p>
                    <div style={{paddingTop:'8px'}}>
                        <Button text={null} color={"#2E85FE"} name={"#buildnship"} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        </>
     );
}

export default Trivial;