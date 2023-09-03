import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { useNavigate } from "react-router-dom";
import { getCountryData } from "./apis/CountryAPI";
import { MuButton, PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";

import { getStateData } from "./apis/StateAPI";
import { getZoneData } from "./apis/ZoneAPI";
import { getDistrictData } from "./apis/DistrictAPI";
import { useToast } from "@chakra-ui/react";

interface SelectedDataProps {
    Country: { value: string; label: string } | null;
    State: { value: string; label: string } | null;
    Zone: { value: string; label: string } | null;
}

type LocationItem = { value: string; label: string } | string;

interface LocationPopupProps {
    isShowPopup: boolean;
    handlePopup: UseStateFunc<boolean>;
    popupFields: {
        countryShow: boolean;
        stateShow: boolean;
        zoneShow: boolean;
    };
    activeItem: string;
    handleData: UseStateFunc<any>;
    handleCountry: UseStateFunc<string>;
    handleState: UseStateFunc<string>;
    handleZone: UseStateFunc<string>;
    handleDeclined: UseStateFunc<boolean>;
    setTotalPages: UseStateFunc<number>;
}

const LocationPopup: FC<LocationPopupProps> = ({
    isShowPopup,
    handlePopup,
    popupFields,
    activeItem,
    handleData,
    handleCountry,
    handleState,
    handleZone,
    handleDeclined,
    setTotalPages
}) => {
    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [zoneData, setZoneData] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedZone, setSelectedZone] = useState("");

    const [selectedData, setSelectedData] = useState<SelectedDataProps>({
        Country: null,
        State: null,
        Zone: null
    });

    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (selectedData.Country === null) {
            getCountryData(setCountryData, toast);
        }
        if (selectedData.Country !== null) {
            getStateData(
                selectedData.Country?.value,
                setStateData,
                toast,
                5,
                1,
                setTotalPages,
                "",
                ""
            );
        }
        if (selectedData.Country !== null && selectedData.State !== null) {
            getZoneData(
                selectedData.State?.value,
                setZoneData,
                5,
                1,
                setTotalPages,
                "",
                ""
            );
        }
    }, [selectedData]);

    interface Option {
        id: string;
        name: string;
    }

    interface SelectionBoxProps {
        title: string;
        data: Option[];
    }

    const SelectionBox = ({ title, data }: SelectionBoxProps) => {
        function handleOptionChange(option: any) {
            setSelectedData(prev => ({
                ...prev,
                [title]: option,
                ...(title === "Country" && { State: null, Zone: null }),
                ...(title === "State" && { Zone: null })
            }));
        }

        return (
            <div className="selectionBox_container">
                <p>Select {title}</p>
                <Select
                    value={selectedData[title as keyof SelectedDataProps]}
                    name={title}
                    onChange={handleOptionChange}
                    options={data.map(item => ({
                        value: item.id,
                        label: item.name
                    }))}
                    required
                />
            </div>
        );
    };

    function submitPopupSelection() {
        if (activeItem === "State") {
            if (selectedData.Country && selectedData.Country.value) {
                getStateData(
                    selectedData.Country?.value,
                    handleData,
                    toast,
                    5,
                    1,
                    setTotalPages,
                    "",
                    ""
                );
                handleCountry(selectedData.Country.value);
            }
        } else if (activeItem === "Zone") {
            if (
                selectedData.Country &&
                selectedData.Country.value &&
                selectedData.State &&
                selectedData.State.value
            ) {
                getZoneData(
                    selectedData.State.value,
                    handleData,
                    5,
                    1,
                    setTotalPages,
                    "",
                    ""
                );
                handleCountry(selectedData.Country.label);
                handleState(selectedData.State.label);
            }
        } else if (activeItem === "District") {
            if (
                selectedData.Country &&
                selectedData.Country.value &&
                selectedData.State &&
                selectedData.State.value &&
                selectedData.Zone &&
                selectedData.Zone.value
            ) {
                getDistrictData(
                    selectedData.Zone.value,
                    handleData,
                    5,
                    1,
                    setTotalPages,
                    "",
                    ""
                );
                handleCountry(selectedData.Country.label);
                handleState(selectedData.State.label);
                handleZone(selectedData.Zone.label);
            }
        }
        handlePopup(false);
    }

    return (
        <div className={`ml_popup_container ${isShowPopup ? "show" : ""}`}>
            <div className="ml_popup_box">
                <h1>Change Location</h1>
                <div className="inputfield_container">
                    {popupFields.countryShow && (
                        <SelectionBox title="Country" data={countryData} />
                    )}
                    {popupFields.stateShow && (
                        <SelectionBox title="State" data={stateData} />
                    )}
                    {popupFields.zoneShow && (
                        <SelectionBox title="Zone" data={zoneData} />
                    )}
                    <div className="ml_popup_btn_container">
                        <MuButton
                            text={"Decline"}
                            className={styles.btn_cancel}
                            onClick={() => {
                                handlePopup(false), handleDeclined(true);
                            }}
                        />
                        <PowerfulButton
                            type="submit"
                            className={styles.btn_submit}
                            onClick={() => submitPopupSelection()}
                        >
                            Confirm
                        </PowerfulButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationPopup;
