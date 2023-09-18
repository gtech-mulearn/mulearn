import Select from "react-select";
import styles from "./LearningCircleFilter.module.css";
import Option from "react-select/dist/declarations/src/components/Option";
import { useEffect, useState } from "react";
import {
    fetchCampusOptions,
    fetchDistrictLc,
    fetchDistrictOptions,
    fetchInterestGroupLc,
    fetchLCFull,
    getInterestGroups
} from "../services/PublicDataAPI";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";

export interface Option {
    value: string;
    label: string;
}
const customStyles: any = {
    control: (provided: any) => ({
        ...provided,
        backgroundColor: "white",
        border: ".1px solid #CFD3D4",
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
    }),
    option: (styles: any, isFocused: any) => ({
        ...styles,
        color: "#000"
    })
};
type Props = {
    setLc: (lc: LcType[]) => void;
    callAllLc: () => void;
    searchString: string | null;
};
const IndiaId = "f1840070-ec45-4b09-b582-763482137474";
const KeralaId = "44c63af8-8747-43d1-8402-ba79215d4bed";
const LearningCircleForm = (props: Props) => {
    const [districts, setDistricts] = useState<Option[]>([]);
    const [campuses, setCampuses] = useState<Option[]>([]);
    const [igOptions, setIgOptions] = useState<Option[] | undefined>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<Option | null>(
        null
    );
    const district = selectedDistrict?.value as string;
    const [selectedCampus, setSelectedCampus] = useState<Option | null>(null);
    const campus = selectedCampus?.value as string;
    const [selectedIg, setSelectedIg] = useState<Option | null>(null);
    const ig = selectedIg?.value as string;
    const maxMenuHeight = 200;
    useEffect(() => {
        fetchDistrictOptions(KeralaId, setDistricts);
    }, []);
    const handleDistrictChange = async (selectedDistrict: Option | null) => {
        if (selectedDistrict) {
            setSelectedDistrict(selectedDistrict);
            fetchCampusOptions(selectedDistrict.value, setCampuses);
            fetchDistrictLc(props?.setLc, selectedDistrict.value);

            // Reset other options
            setIgOptions(undefined);
            setSelectedCampus(null);
            setSelectedIg(null);
        }
    };
    const handleCampusChange = async (selectedCampus: Option | null) => {
        if (selectedCampus) {
            setSelectedCampus(selectedCampus);
            setIgOptions(await getInterestGroups());
            setSelectedIg(null);
            fetchLCFull(props?.setLc, selectedCampus.value, district);
        }
    };
    const handleIgChange = (selectedIg: Option | null) => {
        if (selectedIg) {
            setSelectedIg(selectedIg);
            fetchInterestGroupLc(
                props?.setLc,
                selectedIg.value,
                campus,
                district
            );
        }
    };
    const enableResetBtn =
        selectedDistrict !== null ||
        selectedCampus !== null ||
        selectedIg !== null ||
        (props?.searchString !== null && props?.searchString !== "");
    return (
        <div className={styles.LClandingPageExplore}>
            <form className={styles.LClandingPageForm}>
                <div className={styles.selectOptions}>
                    <Select
                        isSearchable
                        defaultValue={{
                            value: IndiaId,
                            label: "India"
                        }}
                        placeholder="Select Country"
                        options={[]}
                        isDisabled={true}
                        // onChange={handleCountryChange}
                        styles={customStyles}
                        maxMenuHeight={maxMenuHeight}
                    />
                    <Select
                        isSearchable
                        defaultValue={{
                            value: KeralaId,
                            label: "Kerala"
                        }}
                        placeholder="Select State"
                        options={[]}
                        isDisabled={true}
                        // onChange={handleStateChange}
                        styles={customStyles}
                        maxMenuHeight={maxMenuHeight}
                    />
                    <Select
                        isSearchable
                        placeholder="Select District"
                        value={selectedDistrict}
                        options={districts}
                        onChange={handleDistrictChange}
                        styles={customStyles}
                        maxMenuHeight={maxMenuHeight}
                    />
                    <Select
                        isSearchable
                        placeholder="Select Campus"
                        value={selectedCampus}
                        options={campuses}
                        onChange={handleCampusChange}
                        styles={customStyles}
                        maxMenuHeight={maxMenuHeight}
                    />
                    <Select
                        isSearchable
                        value={selectedIg}
                        placeholder="Select IG"
                        options={igOptions}
                        onChange={handleIgChange}
                        styles={customStyles}
                        maxMenuHeight={maxMenuHeight}
                    />
                    <PowerfulButton
                        disabled={!enableResetBtn}
                        onClick={() => {
                            setSelectedDistrict(null);
                            setSelectedCampus(null);
                            setSelectedIg(null);
                            props?.callAllLc();
                        }}
                    >
                        Reset
                    </PowerfulButton>
                </div>
            </form>
        </div>
    );
};
export default LearningCircleForm;
