import React from 'react'
import styles from './TopCoders.module.css'

// Images import section
import top100 from './assets/top100logo.png'
import gtech from './assets/gtech.webp'
import heroBar from './assets/heroBar.webp'
import card from './assets/card.png'
import cash from './assets/cash.webp'
import topBorder from './assets/pseudo.webp'
import arrow1 from './assets/arrow.png'
import c1 from './assets/c1.png'
import c2 from './assets/c2.png'
import c3 from './assets/c3.png'
import c4 from './assets/c4.png'
import c5 from './assets/c5.png'
import key from './assets/key.webp'
import build from './assets/build.webp'
import earth from './assets/earth.png'
import algo from './assets/algo.png'
import shield from './assets/shield.png'
import signup from './assets/signup.png'
import gt from './assets/gt.png'
import kerala from './assets/kerala.png'
import videoBg from './assets/vid.webm'

// Icons import section
import { BsDiscord } from 'react-icons/bs'
import { BsInstagram } from 'react-icons/bs'
import { AiOutlineYoutube } from 'react-icons/ai'
import { BiLogoFacebook } from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'
import { LuChevronDown } from 'react-icons/lu'

export default function TopCoders() {

    const navbar = React.useRef(null)

    React.useEffect(() => {
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function () {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                navbar.current.style.top = "0";
            } else {
                navbar.current.style.top = "-150px";
            }
            prevScrollpos = currentScrollPos;
        }
    }, [])

    return (
        <div className={styles.topCoders}>
            <div ref={navbar} className={styles.nav}>
                <img className={styles.top100Logo} src={top100} alt="logo" />
                <div className={styles.navLinks}>
                    <a href="/">Home</a>
                    <a href="/">Top 100</a>
                    <a href="/">About</a>
                </div>
                <img className={styles.gtechLogo} src={gtech} alt="" />
            </div>

            <div className={styles.topCodersHero}>
                <video className={styles.renderVideo} autoPlay loop muted preload="auto">
                    <source src={videoBg} type="video/webm"></source>
                </video>
                <span className={styles.rect}></span>
                <span className={styles.rect}></span>
                <span className={styles.rect}></span>
                <div className={styles.heroBar}>
                    <img src={heroBar} alt="" />
                    <a href="/">Join the Top 100 Elite Squad</a>
                </div>
            </div>

            <div className={styles.topCodersContent}>
                <img className={styles.topBorder} src={topBorder} alt="" />
                <div className={styles.text}>
                    <div className={styles.textHead}>
                        <span className={styles.rect2}></span>
                        <h1>Be the top <b>100</b> of the year 2023</h1>
                        <span className={styles.rect2}></span>
                    </div>
                    <p className={styles.textContent}>Welcome to the Top 100 Coders initiative Recognised by Kerala Govt.
                        We're on a mission to recognize and empower the best coders in India.
                        If you're passionate about coding and want to make a significant
                        impact in the tech community, you're in the right place.</p>
                    <div className={styles.prize}>
                        <span>
                            <p>PRIZES</p>
                            <img src={cash} alt="" />
                        </span>
                        <p>WORTH ₹10,00,000</p>
                    </div>
                </div>
                <img className={styles.card} src={card} alt="" />

                <span className={styles.black}></span>
                <span className={styles.line}></span>
            </div>

            <div className={styles.topCoderSelection}>
                <div className={styles.selectionHead}>
                    <img src={arrow1} alt="" />
                    <span>
                        <p>Criteria for Selection</p>
                        <p>We're looking for top coders who excel in the following areas:</p>
                    </span>
                </div>
                <div className={styles.slider}>
                    <div className={styles.card}>
                        <img className={styles.CC} src={c1} alt="" />
                        <img className={styles.key} src={key} alt="" />
                    </div>
                    <div className={styles.card}>
                        <img className={styles.CC} src={c2} alt="" />
                        <img className={styles.build} src={build} alt="" />
                    </div>
                    <div className={styles.card}>
                        <img className={styles.CC} src={c3} alt="" />
                        <img className={styles.algo} src={algo} alt="" />
                    </div>
                    <div className={styles.card}>
                        <img className={styles.CC} src={c4} alt="" />
                        <img className={styles.earth} src={earth} alt="" />
                    </div>
                    <div className={styles.card}>
                        <img className={styles.CC} src={c5} alt="" />
                        <img className={styles.shield} src={shield} alt="" />
                    </div>
                </div>

                <div className={styles.heroBar}>
                    <img src={signup} alt="" />
                </div>
            </div>

            <div className={styles.topCodersForm}>
                <form action="" className={styles.codersForm}>
                    <div>
                        <input type="text" placeholder='First Name' />
                        <input type="text" placeholder='Last Name' />
                        <input type="text" placeholder='Email' />
                        <input type="text" placeholder='Phone No.' />
                        <input type="text" placeholder='Track-selected' />
                        <input type="text" placeholder='Portfoilio' />
                    </div>
                    <textarea name="" id="" cols="30" rows="7"></textarea>
                    <div className={styles.submit}>
                        <span>
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">Terms & Conditions</label>
                        </span>
                        <button>Submit</button>
                    </div>
                </form>
            </div>

            <div className={styles.topcoderFaq}>
                <div className={styles.faqHead}>
                    <h1>Frequently Asked Questions</h1>
                    <p>Have questions? We've got answers!</p>
                </div>

                <details className={styles.faq}>
                    <summary className={styles.question}>What is Top 100 Coders? <LuChevronDown className={styles.chev} /> </summary>
                    <p className={styles.answer}>
                        <b>
                            Top 100 Coders is an initiative by Gtech to recognize and empower the best coders in India.
                            We're looking for top coders who excel in the following areas: Competitive Coding,
                            Open Source, Algorithms, Community Building, and Tech Evangelism.
                        </b>
                    </p>
                </details>
                <details className={styles.faq}>
                    <summary className={styles.question}>What happens after the selection process? <LuChevronDown className={styles.chev} /></summary>
                    <p className={styles.answer}>
                        <b>
                            Top 100 Coders is an initiative by Gtech to recognize and empower the best coders in India.
                            We're looking for top coders who excel in the following areas: Competitive Coding,
                            Open Source, Algorithms, Community Building, and Tech Evangelism.
                        </b>
                    </p>
                </details>
                <details className={styles.faq}>
                    <summary className={styles.question}>How do I apply? <LuChevronDown className={styles.chev} /></summary>
                    <p className={styles.answer}>
                        <b>
                            Top 100 Coders is an initiative by Gtech to recognize and empower the best coders in India.
                            We're looking for top coders who excel in the following areas: Competitive Coding,
                            Open Source, Algorithms, Community Building, and Tech Evangelism.
                        </b>
                    </p>
                </details>
            </div>

            <footer className={styles.topcodersFooter}>
                <div>
                    <p>Terms of Use & Privacy Policy</p>
                    <p>User agreement</p>
                </div>

                <div>
                    <p>Find us on</p>
                    <span className={styles.socials}>
                        <a href="/"> <BsDiscord /> </a>
                        <a href="/"> <BsInstagram /> </a>
                        <a href="/"> <BsTwitter /> </a>
                        <a href="/"> <AiOutlineYoutube /> </a>
                        <a href="/"> <BiLogoFacebook /> </a>
                    </span>
                </div>

                <div className={styles.footerLogos}>
                    <img src={kerala} alt="" />
                    <span className={styles.line}></span>
                    <img src={top100} alt="" />
                    <span className={styles.line}></span>
                    <img src={gt} alt="" />
                </div>
            </footer>

        </div>
    )
}
