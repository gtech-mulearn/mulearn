import React, { useEffect, useState } from 'react'
import Select from "react-select";
import styles from "../../../../components/MuComponents/FormikComponents/FormComponents.module.css";
import { useNavigate } from 'react-router-dom';
import {
    getCountryData
} from './apis/CountryAPI';
import { MuButton } from '@/MuLearnComponents/MuButtons/MuButton';

import { getStateData } from './apis/StateAPI';
import { getZoneData } from './apis/ZoneAPI';
import { getDistrictData } from './apis/DistrictAPI';
import { useToast } from '@chakra-ui/react';


interface SelectedDataProps {
    Country: { value: string; label: string } | null;
    State: { value: string; label: string } | null;
    Zone: { value: string; label: string } | null;
}

type LocationItem = { value: string; label: string } | string;

interface LocationPopupProps {
  isShowPopup: boolean;
  handlePopup: (show: boolean) => void;
  popupFields: {
    countryShow: boolean;
    stateShow: boolean;
    zoneShow: boolean;
  };
  activeItem: string;
  handleData: (data: any) => void;
  handleCountry: (country: LocationItem) => void;
  handleState: (state: LocationItem) => void;
  handleZone: (zone: LocationItem) => void;
  handleDeclined: any;
}

const LocationPopup = ({
    isShowPopup,
    handlePopup,
    popupFields,
    activeItem,
    handleData,
    handleCountry,
    handleState,
    handleZone,
    handleDeclined
}:LocationPopupProps) => {

    const [countryData,setCountryData] = useState([])
    const [stateData,setStateData] = useState([])
    const [zoneData,setZoneData] = useState([])

    const [selectedCountry,setSelectedCountry] = useState("")
    const [selectedState,setSelectedState] = useState("")
    const [selectedZone,setSelectedZone] = useState("")

    const [selectedData,setSelectedData] = useState<SelectedDataProps>({
        Country: null,
        State: null,
        Zone: null
    })

    const navigate = useNavigate()
    const toast = useToast();

    useEffect(()=>{
        if(selectedData.Country === null){
            getCountryData(setCountryData,toast)
        }
        if(selectedData.Country !== null){
            getStateData(selectedData.Country?.value,setStateData,toast)
        }
        if(selectedData.Country !== null && selectedData.State !== null){
            getZoneData(selectedData.Country?.value,selectedData.State?.value,setZoneData)
        }
    },[selectedData])

    interface Option {
        value: string;
        label: string;
      }
      
    interface SelectionBoxProps {
        title: string;
        data: Option[];
    }
    
    const SelectionBox = ({ title, data }: SelectionBoxProps) => {
        function handleOptionChange(option: any) {
            setSelectedData((prev) => ({
                ...prev,
                [title]: option,
                ...(title === "Country" && { State: null , Zone:null }),
                ...(title === "State" && { Zone:null }),
              }));
        }
      
        return (
          <div className='selectionBox_container'>
            <p>Select {title}</p>
            <Select
              value={selectedData[title as keyof SelectedDataProps]}
              name={title}
              onChange={handleOptionChange}
              options={data}
              required
            />
          </div>
        );
    };
      

    function submitPopupSelection() {
        if (activeItem === "State") {
          if (selectedData.Country && selectedData.Country.value) {
            getStateData(selectedData.Country.value, handleData,toast);
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
              selectedData.Country.value,
              selectedData.State.value,
              handleData
            );
            handleCountry(selectedData.Country.value);
            handleState(selectedData.State.value);
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
              selectedData.Country.value,
              selectedData.State.value,
              selectedData.Zone.value,
              handleData
            );
            handleCountry(selectedData.Country.value);
            handleState(selectedData.State.value);
            handleZone(selectedData.Zone.value);
          }
        }
        handlePopup(false);
      }
      

    return (
        <div className={`ml_popup_container ${isShowPopup ? "show" : ""}`}>
            <div className="ml_popup_box">
                <h1>Change Location</h1>
                <div className="inputfield_container">
                    {
                        popupFields.countryShow &&
                        <SelectionBox 
                            title="Country"
                            data={countryData}
                        />
                    }
                    {
                        popupFields.stateShow &&
                        <SelectionBox 
                            title="State"
                            data={stateData}
                        />
                    }
                    {
                        popupFields.zoneShow &&
                        <SelectionBox 
                            title="Zone"
                            data={zoneData}
                        />
                    }
                    <div className="ml_popup_btn_container">
                        <MuButton
                            text={"Decline"}
                            className={styles.btn_cancel}
                            onClick={() => {
                                handlePopup(false),
                                handleDeclined(true)
                            }}
                        />
                        <button 
                            type="submit" 
                            className={styles.btn_submit}
                            onClick={()=>submitPopupSelection()}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationPopup
