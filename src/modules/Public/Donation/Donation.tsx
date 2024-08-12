import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { submitForm } from "./services/api";
import styles from "./Donation.module.css";
import Marquee from "react-fast-marquee";

import icfoss from "./assets/icfoss.png";
import kdu from "./assets/kdu.png";
import kdisc from "./assets/kdisc.png";
import heroImg from "./assets/heroImg.jpg";

const Donation = () => {
    const [amount, setAmount] = useState<number>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState<number>();
    const [pan, setPan] = useState("");
    const [selectedAmount, setSelectedAmount] = useState<number>(0);
    const [isOrganisation, setIsOrganisation] = useState(false);
    const [company, setCompany] = useState("");

    const callRazorpay = () => {
        if (!amount || !name || !email || !mobile || !pan) {
            toast.error("Please fill all the fields");
            return;
        }

        // if (!validatePAN(pan)) {
        //     toast.error("Invalid PAN number");
        //     return;
        // }

        if (isOrganisation) {
            submitForm({
                amount: amount,
                name: name,
                company: company,
                email: email,
                mobile: mobile,
                pan: pan
            });
            //save data to local storage
            localStorage.setItem("donationData", JSON.stringify({ amount, name, company, email, mobile, pan }));// saving the data because the server does not return all the required data
        } else {
            submitForm({
                amount: amount,
                name: name,
                email: email,
                mobile: mobile,
                pan: pan
            });
            //save data to local storage
            localStorage.setItem("donationData", JSON.stringify({ amount, name, email, mobile, pan }));
        }
    };

    // const validatePAN = (pan: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

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

    useEffect(() => {
        const handleScroll = () => {
            if (isElementInViewport(targetRef.current)) {
                // Start counter logic here
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleAmountClick = (amount: number) => {
        setSelectedAmount(amount);
        setAmount(amount);
    };

    return (
        <main>
            <div className={styles.LClandingPage}>
                <Navbar />

                <div className={styles.DonationHero}>
                    <div className={styles.HeroLeft}>
                        <h1>Help us sustain</h1>
                        <h1>Our Mission</h1>
                        <p>
                            Foster innovation culture, introduce new
                            technologies, and develop skilled entrepreneurs.
                        </p>
                        <div className={styles.OrgContainer}>
                            <img src={icfoss} alt="" />
                            <img src={kdu} alt="" />
                            <img src={kdisc} alt="" />
                        </div>
                        <div className={styles.Stats}>
                            <div>
                                <h3>30k+</h3>
                                <h4>Students</h4>
                            </div>
                            <div>
                                <h3>300+</h3>
                                <h4>Events</h4>
                            </div>
                        </div>
                    </div>
                    <div className={styles.HeroImgContainer}>
                        <img src={heroImg} alt="" />
                    </div>
                </div>
            </div>

            <div className={styles.MarqueeContainer}>
                <Marquee speed={150}>
                    Make Learning Accessible &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; <span>✦</span> &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; Transform Education Today &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span>✦</span>&nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Build Brighter
                    Futures &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <span>✦</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; Make Learning Accessible &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; <span>✦</span> &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp;
                </Marquee>
            </div>

            <div className={styles.DonationSection}>
                <form
                    className={styles.DonationFormElement}
                    onSubmit={e => {
                        e.preventDefault();
                        callRazorpay();
                    }}
                >
                    <div className={styles.DetailsContainer}>
                    <div className={styles.CheckOrgContainer}>
                            <input
                                id="checkc"
                                type="checkbox"
                                onClick={() =>
                                    setIsOrganisation(!isOrganisation)
                                }
                                className={styles.Checkbox}
                            />
                            <p className={styles.OrgChecklabel}>
                            I’m paying for an organization.
                            </p>
                        </div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            aria-label="Name"
                            className={styles.DonationInputStyles}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        
                        {isOrganisation && (
                            <>
                                <label htmlFor="company">Organization</label>
                                <input
                                    type="text"
                                    id="company"
                                    placeholder="Company Name"
                                    className={styles.DonationInputStyles}
                                    value={company}
                                    onChange={e => setCompany(e.target.value)}
                                    required
                                />
                            </>
                        )}
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="johndoe@gmail.com"
                            aria-label="Email"
                            className={styles.DonationInputStyles}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="mobile">Phone Number</label>
                        <input
                            type="number"
                            id="mobile"
                            placeholder="+91"
                            aria-label="Mobile Number"
                            className={styles.DonationInputStyles}
                            value={mobile || ""}
                            onChange={e => setMobile(Number(e.target.value))}
                            required
                        />
                        <label htmlFor="pan">PAN Number</label>
                        <input
                            type="text"
                            id="pan"
                            placeholder="8394XXXXXXXXXXX"
                            aria-label="PAN"
                            className={styles.DonationInputStyles}
                            value={pan}
                            onChange={e => setPan(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.DonationRightSide}>
                    <div className={styles.AmountContainer}>
                        <h1>Select an Amount (INR) </h1>
                        <div
                            className={styles.DonateButtonContainer}
                        >
                            <button
                                type="button"
                                className={
                                    selectedAmount === 10000
                                        ? styles.selectedButton
                                        : ""
                                }
                                onClick={() => handleAmountClick(10000)}
                            >
                                10,000
                            </button>
                            <button
                                type="button"
                                className={
                                    selectedAmount === 15000
                                        ? styles.selectedButton
                                        : ""
                                }
                                onClick={() => handleAmountClick(15000)}
                            >
                                15,000
                            </button>
                            <button
                                type="button"
                                className={
                                    selectedAmount === 20000
                                        ? styles.selectedButton
                                        : ""
                                }
                                onClick={() => handleAmountClick(20000)}
                            >
                                20,000
                            </button>
                            <button
                                type="button"
                                className={
                                    selectedAmount === 25000
                                        ? styles.selectedButton
                                        : ""
                                }
                                onClick={() => handleAmountClick(25000)}
                            >
                                25,000
                            </button>
                        </div>
                        <h4>OR</h4>
                        <div className={styles.CurrencyContainer}>
                            <p>Enter The Donation Amount (INR)</p>
                            <input
                                type="number"
                                id="amount"
                                placeholder="10,000 INR"
                                aria-label="Amount"
                                className={[
                                    styles.DonationInputStyles,
                                    styles.AmountField
                                ].join(" ")}
                                value={amount || ""}
                                onChange={e =>
                                    setAmount(Number(e.target.value))
                                }
                                required
                            />
                        </div>
                               
                        <div className={styles.TermsContainer}>
                            <input id="check" type="checkbox" required className={styles.Checkbox}/>
                            <label >
                                By clicking 'Donate', you agree to our &nbsp;
                                <Link
                                    to="https://mulearn.org/termsandconditions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Terms and Conditions
                                </Link>
                                ,
                                <Link
                                    to="https://mulearn.org/privacypolicy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                Privacy Policy
                                </Link> &nbsp;
                                and &nbsp;
                                <Link
                                    to="./refund"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Refund Policy
                                </Link>
                                .  Please review these documents before donating.
                            </label>
                        </div>
                        <div
                            className={styles.SubmitButton}
                        >
                            <button
                                type="submit"
                                className={styles.selectedButton}
                            >
                                Donate Now
                            </button>
                        </div>
                    </div>
                    </div>
                </form>
            </div>

            <Footer /> 
        </main>
    );
};

export default Donation;
