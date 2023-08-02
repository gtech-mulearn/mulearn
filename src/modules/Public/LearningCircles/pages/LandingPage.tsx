import { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
    getCountries,
    getDistrict,
    getState
} from "../../../Common/Authentication/services/onboardingApis";
import { Formik, useFormik } from "formik";
import { FormikReactSelectCustom } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import {
    fetchCampusOptions,
    fetchCountryOptions,
    fetchDistrictOptions,
    fetchStateOptions
} from "../services/LandingPageApi";
import { ActionMeta, InputActionMeta } from "react-select";
import Select from "react-select";

interface Option {
    value: string;
    label: string;
}
const LandingPage = () => {
    const navigate = useNavigate();
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
    const [igOptions, setIgOptions] = useState<Option[]>([]);
    const [ig, setIg] = useState("");

    useEffect(() => {
        fetchCountryOptions(setCountryOptions);
        fetchStateOptions(country, setStateOptions);
        fetchDistrictOptions(state, setDistrictOptions);
        console.log(districtOptions);
    }, []);

    const handleCountryChange = async (selectedCountry: Option | null) => {
        if (selectedCountry) {
            fetchStateOptions(selectedCountry.value, setStateOptions);
            // Reset other options
            setDistrictOptions([]);
            setCampusOptions([]);
            setIgOptions([]);
        }
    };

    const handleStateChange = (state: Option | null) => {
        if (state) {
            console.log(state);
            fetchDistrictOptions(state.value, setDistrictOptions);
            // Reset other options
            setCampusOptions([]);
            setIgOptions([]);
        }
    };

    const handleDistrictChange = async (selectedDistrict: Option | null) => {
        if (selectedDistrict) {
            console.log(selectedDistrict);
            fetchCampusOptions(selectedDistrict.value, setCampusOptions);
            // Reset other options
            setIgOptions([]);
        }
    };

    const handleCampusChange = async (selectedCampus: Option | null) => {
        // if (selectedCampus) {
        //     fetchIgOptions(selectedCampus.value, setIgOptions);
        // }
    };

    const handleIgChange = async (selectedIg: Option | null) => {
        // Reset other options
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
            padding: ".3rem .4rem"
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: "#000" // Specify your desired color here
        }),
        indicatorSeparator: (provided: any) => ({
            ...provided,
            display: "none" // Hide the indicator separator
        })
    };

    const handleChange = (selectedOption: any) => {
        console.log(selectedOption.value);
    };

    return (
        <div className={styles.LClandingPage}>
            <nav className={styles.LClandingPageNav}>
                <img src="https://i.ibb.co/vY786NX/image.png" alt="muLearn" />
                <div className={styles.navLinks}>
                    <div>
                        <Link to="#">About</Link>
                        <Link to="#">Programs</Link>
                        <Link to="#">Events</Link>
                        <Link to="#">Interest Group</Link>
                        <Link to="#">Careers</Link>
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
                <button>Create/Join Learning Circles</button>
            </div>

            <div className={styles.LClandingPageEarth}>
                <div className={styles.totalCount}>
                    <div>
                        <div className={styles.count}>
                            <b>01</b>
                            <p>States</p>
                        </div>
                        <div className={styles.count}>
                            <b>16</b>
                            <p>Districts</p>
                        </div>
                        <div className={styles.count}>
                            <b>20+</b>
                            <p>Interest Groups</p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.count}>
                            <b>500+</b>
                            <p>Campuses</p>
                        </div>
                        <div className={styles.count}>
                            <b>2500+</b>
                            <p>Learning Circles</p>
                        </div>
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
                            options={districtOptions}
                            onChange={handleDistrictChange}
                            styles={customStyles}
                        />
                        <Select
                            isSearchable
                            placeholder="Select Campus"
                            options={campusOptions}
                            onChange={handleCampusChange}
                            styles={customStyles}
                        />
                        <Select
                            isSearchable
                            placeholder="Select IG"
                            options={igOptions}
                            onChange={handleIgChange}
                            styles={customStyles}
                        />
                    </div>
                </form>
                <div className={styles.container}>
                    <div className={styles.exploreCards}>
                        <img
                            src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                            alt="png"
                        />
                        <h1>Internet of Things</h1>
                        <span>
                            <b>Creative Design</b> &nbsp;{" "}
                            <b>Members count: 08</b>
                        </span>
                    </div>
                    <div className={styles.exploreCards}>
                        <img
                            src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                            alt="png"
                        />
                        <h1>Internet of Things</h1>
                        <span>
                            <b>Creative Design</b> &nbsp;{" "}
                            <b>Members count: 08</b>
                        </span>
                    </div>
                    <div className={styles.exploreCards}>
                        <img
                            src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                            alt="png"
                        />
                        <h1>Internet of Things</h1>
                        <span>
                            <b>Creative Design</b> &nbsp;{" "}
                            <b>Members count: 08</b>
                        </span>
                    </div>
                    <div className={styles.exploreCards}>
                        <img
                            src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                            alt="png"
                        />
                        <h1>Internet of Things</h1>
                        <span>
                            <b>Creative Design</b> &nbsp;{" "}
                            <b>Members count: 08</b>
                        </span>
                    </div>
                    <div className={styles.exploreCards}>
                        <img
                            src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                            alt="png"
                        />
                        <h1>Internet of Things</h1>
                        <span>
                            <b>Creative Design</b> &nbsp;{" "}
                            <b>Members count: 08</b>
                        </span>
                    </div>
                    <div className={styles.exploreCards}>
                        <img
                            src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                            alt="png"
                        />
                        <h1>Internet of Things</h1>
                        <span>
                            <b>Creative Design</b> &nbsp;{" "}
                            <b>Members count: 08</b>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
