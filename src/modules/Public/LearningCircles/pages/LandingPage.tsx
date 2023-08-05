import { useEffect, useRef, useState } from "react";
import styles from "./LandingPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
    fetchCampusOptions,
    fetchCountryOptions,
    fetchDistrictOptions,
    fetchLC,
    fetchStateOptions,
    getInterestGroups
} from "../services/LandingPageApi";
import Select from "react-select";

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

	const [selectedDistrict, setSelectedDistrict] = useState<Option | null>(
        null
    );
    const [selectedCampus, setSelectedCampus] = useState<Option | null>(null);
    const [selectedIg, setSelectedIg] = useState<Option | null>(null);

    useEffect(() => {
        fetchCountryOptions(setCountryOptions);
        fetchStateOptions(country, setStateOptions);
        fetchDistrictOptions(state, setDistrictOptions);
        console.log(districtOptions);
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
            setIgOptions(undefined);
			setData([]);
			setSelectedCampus(null);
            setSelectedIg(null);
        }
    };

    const handleCampusChange = async (selectedCampus: Option | null) => {
        if (selectedCampus) {
			setSelectedCampus(selectedCampus);
            setCampus(selectedCampus.value);
            setIgOptions(await getInterestGroups());
            setSelectedIg(null);
			setData([]);
        }
    };

    const handleIgChange = async (selectedIg: Option | null) => {
        if (selectedIg) {
            setIg(selectedIg.value);
			setSelectedIg(selectedIg);
            fetchLC(setData, ig, campus, district);
            setTimeout(() => {
                console.log(data);
            }, 2000);
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
            padding: ".3rem .4rem"
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
                <button onClick={() => navigate("/dashboard/learning-circle")}>
                    Create/Join Learning Circles
                </button>
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
                <div className={styles.container}>
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
                        <div className={styles.container}></div>
                    )}       
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
