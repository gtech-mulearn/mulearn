import React, { useEffect, useState } from 'react'
import Select from "react-select";
import styles from "../../../../components/MuComponents/FormikComponents/FormComponents.module.css";
import { useNavigate } from 'react-router-dom';
import {
    getCountryData,
  } from './apis';
import { MuButton } from '@/MuLearnComponents/MuButtons/MuButton';

const data = [
    {
        label: "hi",
        value: "hi"
    },
    {
        label: "hi",
        value: "hi"
    },
    {
        label: "hi",
        value: "hi"
    }
]

interface LocationPopupProps {
    isShowPopup: boolean;
    handlePopup:any;
    popupFields:any;
    activeItem:string;
}

interface SelectedDataProps {
    [key: string]: string;
}

const LocationPopup = ({isShowPopup,handlePopup,popupFields,activeItem}:LocationPopupProps) => {

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
            getCountryData(setStateData)
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
        if(activeItem === "States"){
            setSelectedCountry(selectedData.Country)
        }else if(activeItem === "Zone"){
            setSelectedCountry(selectedData.Country)
            setSelectedState(selectedData.State)
        }else if(activeItem === "District"){
            setSelectedCountry(selectedData.Country)
            setSelectedState(selectedData.State)
            setSelectedZone(selectedData.Zone)
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
