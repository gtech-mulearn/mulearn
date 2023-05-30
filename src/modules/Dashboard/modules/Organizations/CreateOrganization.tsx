import React, { useState, useEffect,useRef } from 'react';
import Textfield from '../../../../components/MuComponents/TextField/Textfield';
import { useNavigate } from 'react-router-dom';
import { MuButtonLight } from '../../../../components/MuComponents/MuButtons/MuButton';
import PrimaryButton from '../../../../components/MuComponents/MuButtons/MuOutlinedButton';
import Dropdown from '../../../../components/MuComponents/Dropdown/Dropdown';
import { hasRole } from '../../../../services/common_functions';
import { roles } from '../../../../services/types';
import './Organizations.scss';
import { MuButton } from '../../../../components/MuComponents/MuButtons/MuButton';
import { getCountry,getStates,getZones } from './apis';
import { useLocation } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

import { createOrganization } from './apis';

import countries from './dummyData/Countries.json';
import districts from './dummyData/Districts.json';
import states from './dummyData/States.json'
import zones from './dummyData/Zones.json'

import CollegeForm from './CollegeForm';
import CompaniesForm from './CompaniesForm';
import CommunitiesForm from './CommunitiesForm';

function CreateOrganization() {
  const navigate = useNavigate();
  const location = useLocation();

  const toast = useToast();

  const { activeItem,isCreate } = location.state;

  const [inputName, setInputName] = useState('');
  const [inputCode, setInputCode] = useState('');

  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryData, setCountryData] = useState<any[]>([]);

  const [selectedState,setSelectedState] = useState('')
  const [statesData,setStatesData] = useState<any[]>([])

  const [selectedZone,setSelectedZone] = useState('')
  const [zonesData,setZonesData] = useState<any[]>([])

  function camelCase(str:string) {
    return str.replace(/\b[A-Z]+\b/g, (match) => match.charAt(0) + match.slice(1).toLowerCase());
  }

  useEffect(() => {
    return () => {
      if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate('/404');
  
      console.log("selected-country:",selectedCountry)
      getCountry(setCountryData);
    }
  }, []);

  useEffect(()=>{
    if(selectedCountry !== ''){
      console.log("now you can select states")
      getStates(camelCase(selectedCountry),setStatesData)
    }
  },[selectedCountry])

  useEffect(()=>{
    if(selectedState !== ''){
      console.log("you can select zone")
      getZones(camelCase(selectedCountry),camelCase(selectedState),setZonesData)
    }
  },[selectedState])

  const orgType = "College"

  const handleSubmit = (e: any) => {
			e.preventDefault();
      resetStates()
			createOrganization(
        inputName,
        inputCode,
        "KTU",
        "India",
        "Kerala",
        "Kozhikode",
        "North",
        orgType,
        toast);
      navigate('/organizations');
  };

  function parseFunctionString(functionString: string) {
    return new Function(`return ${functionString}`)();
  }

  const resetStates = () => {
    setInputName('');
    setInputCode('');
  };

  const FormData = ({ activeItem,isCreate}: any) => {
    switch (activeItem) {
      case 'Colleges':
        return (
          <CollegeForm
            isCreate = {isCreate}
            countryData={countryData}
            districtsData={districts.districts}
            statesData = {statesData}
            zoneData = {zonesData}

            selectedCountry={selectedCountry}
            setSelectCountry={setSelectedCountry}
            setSelectState = {setSelectedState}
            setSelectZone = {setSelectedZone}
          />
        );
      case 'Companies':
        return (
          <CompaniesForm
            countryData={countryData}
            selectCountry={selectedCountry}
            setSelectCountry={setSelectedCountry}
          />
        );
      case 'Communities':
        return (
          <CommunitiesForm
            countryData={countryData}
            selectCountry={selectedCountry}
            setSelectCountry={setSelectedCountry}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="popup_container">
      <div className="popup_top_container">
        <h1 className="popup_title">Add {activeItem}</h1>
        <i
          className="fi fi-sr-cross"
          onClick={() => {
            navigate('/organizations');
          }}
        ></i>
      </div>
      <p>Kindly review the provided details and make sure that they are correct.
        Once you have verified the information, please click the <span>Confirm</span>
        button to proceed for further process.
      </p>
      <div className="popup_dropdown_container">
            <div className="inputfield_container">
              <Textfield
                content={`${activeItem} Name`}
                inputType="text"
                setInput={setInputName}
                input={inputName}
                style={{
                  width: '100%',
                }}
              />
            </div>
            <div className="inputfield_container">
              <Textfield
                content="Code"
                inputType="text"
                setInput={setInputCode}
                input={inputCode}
                style={{
                  width: '100%',
                }}
              />
            </div>
            <FormData activeItem={activeItem} isCreate={isCreate} />
            <div className="inputfield_container grid-container">
              <div 
                className="btn light-btn"
                onClick={resetStates}
              >Decline</div>
              <div 
                className="btn blue-btn"
                onClick={handleSubmit}>Submit</div>
            </div>
      </div>
    </div>
  );
}

export default CreateOrganization;
