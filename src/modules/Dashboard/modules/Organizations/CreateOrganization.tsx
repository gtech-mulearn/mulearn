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
  const [selectedState,setSelectedState] = useState('')
  const [selectedZone,setSelectedZone] = useState('')
  const [selectedDistrict,setSelectedDistrict] = useState('')


  function parseFunctionString(functionString: string) {
    return new Function(`return ${functionString}`)();
  }

  const FormData = ({ activeItem,isCreate}: any) => {
    switch (activeItem) {
      case 'Colleges':
        return (
          <CollegeForm
            isCreate = {isCreate}
            activeItem = "College"

            setSelectedCountry = {setSelectedCountry}
            setSelectedState = {setSelectedState}
            setSelectedZone = {setSelectedZone}
            setSelectedDistrict = {setSelectedDistrict}
          />
        );
      case 'Companies':
        return (
          <CollegeForm
            isCreate = {isCreate}
            activeItem = "Company"

            setSelectedCountry = {setSelectedCountry}
            setSelectedState = {setSelectedState}
            setSelectedZone = {setSelectedZone}
            setSelectedDistrict = {setSelectedDistrict}
          />
        );
      case 'Communities':
        return (
          <CollegeForm
          isCreate = {isCreate}
          activeItem = "Community"

          setSelectedCountry = {setSelectedCountry}
          setSelectedState = {setSelectedState}
          setSelectedZone = {setSelectedZone}
          setSelectedDistrict = {setSelectedDistrict}
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
            <FormData activeItem={activeItem} isCreate={isCreate} />
      </div>
    </div>
  );
}

export default CreateOrganization;
