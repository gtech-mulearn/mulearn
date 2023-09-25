import { useEffect, useRef, useState } from "react";
import styles from "./LandingPage.module.css";
import imageBottom from "../Assets/LC3.webp";
import { Link, useNavigate } from "react-router-dom";
import {
    fetchCampusOptions,
    fetchCountryOptions,
    fetchDistrictOptions,
    fetchLC,
    fetchStateOptions,
    getCount,
    getInterestGroups
} from "../services/LandingPageApi";
import Select from "react-select";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

interface Option {
    value: string;
    label: string;
}
const LandingPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<any>([]);
    const [CountryOptions, setCountryOptions] = useState<Option[]>([]);
    const [country, setCountry] = useState(
        "f1840070-ec45-4b09-b582-763482137474"
    );
    const [stateOptions, setStateOptions] = useState<Option[]>([]);
    const [state, setState] = useState("44c63af8-8747-43d1-8402-ba79215d4bed");
    const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
    const [district, setDistrict] = useState("");
    const [campusOptions, setCampusOptions] = useState<Option[]>([]);
    const [campus, setCampus] = useState("");
    const [igOptions, setIgOptions] = useState<Option[] | undefined>([]);
    const [ig, setIg] = useState("");
    const [count, setCount] = useState<LcCount>();

    const [selectedDistrict, setSelectedDistrict] = useState<Option | null>(
        null
    );
    const [selectedCampus, setSelectedCampus] = useState<Option | null>(null);
    const [selectedIg, setSelectedIg] = useState<Option | null>(null);
    const [msg, setMsg] = useState<string>("Select a district");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchCountryOptions(setCountryOptions);
        fetchStateOptions(country, setStateOptions);
        fetchDistrictOptions(state, setDistrictOptions);
        fetchLC(setLoading, setData);
        getCount(setCount);
    }, []);

    const handleCountryChange = async (selectedCountry: Option | null) => {
        if (selectedCountry) {
            setCountry(selectedCountry.value);
            fetchStateOptions(selectedCountry.value, setStateOptions);
            // Reset other options
            setDistrictOptions([]);
            setCampusOptions([]);
            setIgOptions(undefined);
            setData([]);
        }
    };

    const handleStateChange = (state: Option | null) => {
        if (state) {
            setState(state.value);
            fetchDistrictOptions(state.value, setDistrictOptions);
            // Reset other options
            setCampusOptions([]);
            setIgOptions(undefined);
            setData([]);
        }
    };

    const handleDistrictChange = async (selectedDistrict: Option | null) => {
        if (selectedDistrict) {
            setDistrict(selectedDistrict.value);
            setSelectedDistrict(selectedDistrict);
            fetchCampusOptions(selectedDistrict.value, setCampusOptions);
            // Reset other options
            fetchLC(setLoading, setData, selectedDistrict.value);
            setIgOptions(undefined);
            setData([]);
            setSelectedCampus(null);
            setSelectedIg(null);
            setMsg("Select a campus");
        }
    };

    const handleCampusChange = async (selectedCampus: Option | null) => {
        if (selectedCampus) {
            setSelectedCampus(selectedCampus);
            setCampus(selectedCampus.value);
            setIgOptions(await getInterestGroups());
            setSelectedIg(null);

            fetchLC(setLoading, setData,district, selectedCampus.value);

            setData([]);
            setMsg("");
        }
    };

    const handleIgChange = (selectedIg: Option | null) => {
        if (selectedIg) {
            setIg(selectedIg.value);
            setSelectedIg(selectedIg);
            fetchLC(setLoading, setData,district, campus, selectedIg.value);
        }
    };

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
            minWidth: "200px",
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

    useEffect(() => {
        const finalValues: number[] = [
            count?.state ?? 0,
            count?.district ?? 0,
            count?.interest_group ?? 0,
            count?.college ?? 0,
            count?.learning_circle ?? 0
        ];

        const startCounterAnimation = () => {
            const interval = setInterval(() => {
                setCounters(prevCounters =>
                    prevCounters.map((counter, index) =>
                        counter < finalValues[index]
                            ? counter +
                            Math.ceil(
                                finalValues[index] / (durationInSeconds * 20)
                            ) // Increment smoothly
                            : finalValues[index]
                    )
                );
            }, 50);

            return () => clearInterval(interval);
        };

        let cleanup: (() => void) | undefined;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    cleanup = startCounterAnimation();
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.5
            }
        );

        if (targetRef.current) {
            if (isElementInViewport(targetRef.current)) {
                cleanup = startCounterAnimation();
            } else {
                observer.observe(targetRef.current);
            }
        }

        return () => {
            if (cleanup) {
                cleanup();
            }
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [count]);



    return (
        <div className={styles.LClandingPage}>
            <nav className={styles.LClandingPageNav}>
                <img src="https://i.ibb.co/vY786NX/image.png" alt="muLearn" />
                <div className={styles.navLinks}>
                    <div>
                        <Link to="https://mulearn.org/">About</Link>
                        <Link to="https://mulearn.org/events/">Programs</Link>
                        <Link to="https://learn.mulearn.org/">Interest Group</Link>
                        <Link to="https://mulearn.org/careers">Careers</Link>
                    </div>
                    <button
                        onClick={() => {
                            navigate("/dashboard/connect-discord");
                        }}
                    >
                        Join Us
                    </button>
                </div>
            </nav>

            <div className={styles.LClandingPageHero}>
                <div className={styles.dash}></div>
                <div className={styles.heroTitle}>
                    <span>
                        <b>Introducing</b>{" "}
                        <img src="https://i.ibb.co/FDQ2M4n/Learn.png" alt="" />
                    </span>
                    <b>Learning Circles</b>
                </div>
                <p>
                    An informal mechanism for bringing together learners who are
                    interested in the same topic from across different fields
                    and disciplines. A fantastic way to spend a small amount of
                    time learning about new things with a group of people with
                    same interests!
                </p>
                <button onClick={() => navigate("/dashboard/learning-circle")}>
                    Create/Join Learning Circles
                </button>
            </div>

            <div className={styles.LClandingPageEarth}>
                <div className={styles.totalCount}>
                    <div ref={targetRef}>
                        {counters.map((counter, index) => (
                            <div className={styles.count} key={index}>
                                <b>
                                    {index > 1
                                        ? counter >= 20
                                            ? `${counter}+`
                                            : counter
                                        : counter.toLocaleString()}
                                </b>
                                <p>
                                    {index === 0
                                        ? "State"
                                        : index === 1
                                            ? "Districts"
                                            : index === 2
                                                ? "Interest Groups"
                                                : index === 3
                                                    ? "Campuses"
                                                    : "Learning Circles"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <img src="https://i.ibb.co/BwGShc8/planet.png" alt="globe" />
            </div>

            <div className={styles.LClandingPageExplore}>
                <div className={styles.exploreTitle}>
                    <b>Explore</b> <span>Learning Circles</span>
                </div>
                <form className={styles.LClandingPageForm}>
                    <div className={styles.selectOptions}>
                        <Select
                            isSearchable
                            defaultValue={{
                                value: "f1840070-ec45-4b09-b582-763482137474",
                                label: "India"
                            }}
                            placeholder="Select Country"
                            options={CountryOptions}
                            isDisabled={true}
                            onChange={handleCountryChange}
                            styles={customStyles}
                        />
                        <Select
                            isSearchable
                            defaultValue={{
                                value: "44c63af8-8747-43d1-8402-ba79215d4bed",
                                label: "Kerala"
                            }}
                            placeholder="Select State"
                            options={stateOptions}
                            isDisabled={true}
                            onChange={handleStateChange}
                            styles={customStyles}
                        />
                        <Select
                            isSearchable
                            placeholder="Select District"
                            value={selectedDistrict}
                            options={districtOptions}
                            onChange={handleDistrictChange}
                            styles={customStyles}
                        />
                        <Select
                            isSearchable
                            placeholder="Select Campus"
                            value={selectedCampus}
                            options={campusOptions}
                            onChange={handleCampusChange}
                            styles={customStyles}
                        />
                        <Select
                            isSearchable
                            value={selectedIg}
                            placeholder="Select IG"
                            options={igOptions}
                            onChange={handleIgChange}
                            styles={customStyles}
                        />
                    </div>
                </form>

                {loading ?
                    <div className={styles.loader}>
                        <MuLoader />
                    </div>
                    : <div className={styles.container}>
                        {data.length > 0 ? (
                            data.map((lc: LcRandom) => (
                                <div className={styles.exploreCards}>
                                    <img
                                        src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                                        alt="png"
                                    />
                                    <h1>{lc.name}</h1>
                                    <span>
                                        <b>{lc.ig_name}</b> &nbsp;{" "}
                                        <b>Members count: {lc.member_count}</b>
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className={styles.LClandingPagenone}>
                                <img
                                    src={imageBottom}
                                    alt="You haven't joined any circles yet"
                                    loading="eager"
                                />
                                <b>{msg}</b>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default LandingPage;
