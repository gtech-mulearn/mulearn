import { useEffect, useRef, useState } from "react";
import styles from "./Donate.module.css";
import { Form, Link, useNavigate } from "react-router-dom";
import { submitForm } from "../services/api";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import Select from "react-select";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import toast from "react-hot-toast";
import Modal from "@/MuLearnComponents/Modal/Modal";
import { style } from "d3";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface Option {
    value: string;
    label: string;
}
const DonationTest = () => {
        const [amount, setAmount] = useState<number>();
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [mobile, setMobile] = useState<number>();
        const [pan, setPan] = useState("");
    
        const callRazorpay = () => {
            if (!amount || !name || !email || !mobile || !pan) {
                toast.error("Please fill all the fields");
                return;
            }
    
            submitForm({
                amount: amount,
                name: name,
                email: email,
                mobile: mobile,
                pan: pan
            });
        };

    const navigate = useNavigate();
    const customStyles: any = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: "#F3F3F4",
            border: "none",
            borderRadius: "10px",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#000",
            width: "100%",
            padding: ".3rem .4rem",
            minWidth: "200px"
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: "#000"
        }),
        indicatorSeparator: (provided: any) => ({
            ...provided,
            display: "none"
        })
    };

    const [counters, setCounters] = useState<number[]>([0, 0, 0, 0, 0]); // Initialize counters
    const durationInSeconds = 3; // Duration in seconds

    const targetRef = useRef<HTMLDivElement>(null); // Create a ref

    const isElementInViewport = (el: HTMLElement | null) => {
        if (!el) {
            return false;
        }
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    return (
        <div className={styles.LClandingPage}>
            <Navbar />

            <div className={styles.LClandingPageHero}>
                <div className={styles.backgroundImage}><img src="https://i.ibb.co/cCvB4r6/Learning-BG.png" alt="textured background" ></img></div>
                <div className={styles.dash}></div>
                <div className={styles.heroTitle}>
                    <span>
                        <b>Donate to</b>{" "}
                        <img src="https://i.ibb.co/FDQ2M4n/Learn.png" alt="" />
                    </span>
                    <b>Let's grow together</b>
                </div>
                <p>
                    An informal mechanism for bringing together learners who are
                    interested in the same topic from across different fields
                    and disciplines. A fantastic way to spend a small amount of
                    time learning about new things with a group of people with
                    same interests!
                </p>
            </div>

            <div className={styles.DonationSection}>
                <div className={styles.heightFixer}></div>
                <form
                    title="Donation"
                    className={styles.DonationFormElement}
                    onSubmit={() => callRazorpay()}
                >

                    <div className={styles.DetailsContainer}>
                        <h1>Details</h1>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Phil Anthropist"
                            className={styles.DonationInputStyles}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="generousphil@gmail.com"
                            className={styles.DonationInputStyles}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="mobile">Mobile No:</label>
                        <input
                            type="number"
                            id="mobile"
                            placeholder="+91 98765 43210"
                            className={styles.DonationInputStyles}
                            value={mobile}
                            onChange={e => setMobile(Number(e.target.value))}
                            required
                        />
                        <label htmlFor="pan">PAN:</label>
                        <input
                            type="text"
                            id="pan"
                            placeholder="BUKCS5678H"
                            className={styles.DonationInputStyles}
                            value={pan}
                            onChange={e => setPan(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.DetailsContainer}>
                        <h1>Donate</h1>
                        <label htmlFor="amount" className={styles.DonateButtonContainer}>
                            <button className={styles.selectedButton}>10,000</button>
                            <button>15,000</button>
                            <button>20,000</button>
                        </label>
                        <div className={styles.CurrencyContainer}>
                            
                            <p>{"INR"}</p>
                            <input
                                type="number"
                                id="amount"
                                placeholder="10,000"
                                className={[styles.DonationInputStyles,styles.AmountField].join(" ")}
                                value={amount}
                                onChange={e => setAmount(Number(e.target.value))}
                                required
                            />
                        </div>

                        <div className={styles.TermsContainer}>
                            <input id="check" type="checkbox" required></input>
                            <label htmlFor="check">Terms and condition Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra  augue eget lacus commodo euismod. Phasellu ultrices.</label>
                        </div>
                        <div className={[styles.DonateButtonContainer, styles.SubmitButton].join(" ")}>
                            <button className={styles.selectedButton}>Donate</button>    
                        </div>
                </div>
            </form>
            </div>

            <Footer />
        </div>
    );
};

export default DonationTest;
