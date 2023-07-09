import Card from "./Card";
import styles from "./IGSection.module.css";
import assets from "../assets/IGS";

const IGSection = () => {
    return (
        <>
            <div className={styles.main_container}>
                <div className={styles.first_view_container}>
                    <div className={styles.first_view}>
                        <div className={styles.image_container}>
                            <img
                                src={assets.fvimg}
                                alt="myrmidon"
                                className={styles.fvimage}
                            />
                        </div>
                        <div className={styles.fv_texts}>
                            <p className={styles.fv_heading}>
                                Introducing Learning Circles
                            </p>
                            <p className={styles.fv_tagline}>
                                An informal mechanism for bringing together
                                learners who are interested in the same topic
                                from across different fields and disciplines. A
                                fantastic way to spend a small amount of time
                                learning about new things with a group of people
                                with same interests!
                            </p>
                            <a href="#cards">
                                <span className={styles.get_started}>
                                    Get Started{" "}
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.explore_view_container}>
                    <div className={styles.explore_view}>
                        <p className={styles.ev_heading}>
                            Existing Interest Groups
                        </p>

                        {/* <button className={styles.search_button}>Search Now</button> */}
                    </div>
                </div>

                <div className={styles.cards_view_container}>
                    <div id="cards" className={styles.cards_view}>
                        <Card
                            image={assets.Android}
                            name="Android"
                            link="#"
                            description="Android is a mobile operating system based on a modified version of the Linux kernel and other open-source software."
                        />
                        <Card
                            image={assets.IOS}
                            name="iOS"
                            link="#"
                            description="iOS is a mobile operating system created and developed by Apple Inc. exclusively for its hardware."
                        />
                        <Card
                            image={assets.Devops}
                            name="DevOps"
                            link="#"
                            description="DevOps is a set of practices that combines software development and IT operations."
                        />
                        <Card
                            image={assets.Frontend}
                            name="Front-End"
                            link="#"
                            description="
            The term Front-End mainly referes to the User Interface which an user view and interacts with and its working"
                        />
                        <Card
                            image={assets.Blockchain}
                            name="Blockchain"
                            link="#"
                            description="
            A blockchain is a digital ledger or database where encrypted blocks of digital asset data are stored and chained together."
                        />
                        <Card
                            image={assets.AI}
                            name="Artifcial Intelligence"
                            link="#"
                            description="AI which stands for artificial intelligence refers to systems or machines that mimic human intelligence to perform tasks."
                        />
                        <Card
                            image={assets.ARVR}
                            name="AR/VR"
                            link="#"
                            description="
            Augmented and virtual reality (AR/VR) are immersive technologies that enable users to experience digitally rendered content."
                        />

                        <Card
                            image={assets.QA}
                            name="QA"
                            link="#"
                            description="Quality assurance (QA) is any systematic process of determining whether a product or service meets specified requirements."
                        />
                        <Card
                            image={assets.Quantum}
                            name="Quantum Computing"
                            link="#"
                            description="A rapidly-emerging technology that harnesses the laws of quantum mechanics to solve issues too hard for computers."
                        />
                        <Card
                            image={assets.PM}
                            name="Product Management"
                            link="#"
                            description="Are you interested in learning to build the right product and the product right?."
                        />
                        <Card
                            image={assets.IOT}
                            name="IoT"
                            link="#"
                            description="IoT is the network of physical objects that are embedded with sensors, software etc.. for the purpose of connecting and exchanging data over the internet."
                        />
                        <Card
                            image={assets.UIUX}
                            name="UI/UX"
                            link="#"
                            description="UI Design and UX Design are some of the most in-demand skills today. While UI deals with the graphical layout of an app, UX deals with the human experience."
                        />
                        <Card
                            image={assets.Cybersec}
                            name="Cyber Security"
                            link="#"
                            description="Cyber Security is the practice of defending computers, servers, mobile devices, electronic systems, networks, and data from malicious attacks. "
                        />
                        <Card
                            image={assets.Google}
                            name="Actions On Google"
                            link="#"
                            description="
            The Actions console is the web-based tool used for developing Actions for registration, deployment, configuration, and analytics."
                        />
                        <Card
                            image={assets.cdesign}
                            name="Creative Design"
                            link="#"
                            description="Creative Design helps to portray ideas in the best fashion and requires an expertise in designing and a certain level of creativity. "
                        />
                        <Card
                            image={assets.Marketing}
                            name="Marketing"
                            link="#"
                            description="Marketing is the process of promoting and selling goods and services. It involves understanding the product, target audience, and making plans to promote it. "
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default IGSection;
