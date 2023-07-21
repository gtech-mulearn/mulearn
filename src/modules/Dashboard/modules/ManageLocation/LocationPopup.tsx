import React, { useEffect, useState } from 'react'
import Select from "react-select";
import styles from "../../../../components/MuComponents/FormikComponents/FormComponents.module.css";
import { useNavigate } from 'react-router-dom';
import {
<<<<<<< HEAD
    getCountryData
} from './apis/CountryAPI';
=======
    getCountryData,
  } from './apis';
import { MuButton } from '@/MuLearnComponents/MuButtons/MuButton';
>>>>>>> 528cb6913cfaff7b93847f3d16c436b1b6a3f70e

import { getStateData } from './apis/StateAPI';
import { getZoneData } from './apis/ZoneAPI';
import { getDistrictData } from './apis/DistrictAPI';

interface LocationPopupProps {
    isShowPopup: boolean;
    handlePopup:any;
    popupFields:any;
    activeItem:string;
    handleData:any;
    handleCountry:any;
    handleState:any,
    handleZone:any,
}


interface SelectedDataProps {
    [key: string]: string;
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
}:LocationPopupProps) => {

    const [countryData,setCountryData] = useState([])
    const [stateData,setStateData] = useState([])
    const [zoneData,setZoneData] = useState([])

    const [selectedCountry,setSelectedCountry] = useState("")
    const [selectedState,setSelectedState] = useState("")
    const [selectedZone,setSelectedZone] = useState("")

    const [selectedData,setSelectedData] = useState<SelectedDataProps>({
        Country: "",
        State: "",
        Zone: ""
    })

    const navigate = useNavigate()

    useEffect(()=>{
        console.log("useeffect running")
        if(activeItem === "Country"){
            getCountryData(setCountryData)
        }
        if(selectedData.Country !== ""){
            getStateData(selectedData.Country?.value,setStateData)
        }
        if(selectedData.Country !== "" && selectedData.State !== ""){
            getZoneData(selectedData.Country?.value,selectedData.State?.value,setZoneData)
        }
    },[selectedData])

    interface SelectionBoxProps {
        title:string;
        data:any;
    }
    
    const SelectionBox = ({title,data}:SelectionBoxProps)=> {
        
        function handleOptionChange(option:any){
            setSelectedData(prev=>({...prev,[title]:option}))
        }
    
        return(
            <>
                <p>Select {title}</p>
                <Select
                    value={selectedData[title]}
                    name={title}
                    onChange={handleOptionChange}
                    options={data}
                    required
                />
            </>
        )
    }

    function submitPopupSelection(){
        if(activeItem === "State"){
            console.log(selectedData.Country)
            getStateData(selectedData.Country?.value,handleData)
            handleCountry(selectedData.Country?.value)
        }else if(activeItem === "Zone"){
            setSelectedCountry(selectedData.Country)
            getZoneData(selectedData.Country?.value,selectedData.State?.value,handleData)
            handleCountry(selectedData.Country?.value)
            handleState(selectedData.State?.value)
            // setSelectedState(selectedData.State)
        }else if(activeItem === "District"){
            // setSelectedCountry(selectedData.Country)
            // setSelectedState(selectedData.State)
            getDistrictData(
                selectedData.Country?.value,
                selectedData.State?.value,
                selectedData.Zone?.value,
                handleData
            )
            handleCountry(selectedData.Country?.value)
            handleState(selectedData.State?.value)
            handleZone(selectedData.Zone?.value)
        }
        console.log(selectedData.Country)
        handlePopup(false)
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
                                handlePopup(false)
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
