import React, { useState, useEffect } from 'react';
import Textfield from '../../../../components/MuComponents/TextField/Textfield';
import { useNavigate } from 'react-router-dom';
import { MuButtonLight } from '../../../../components/MuComponents/MuButtons/MuButton';
import PrimaryButton from '../../../../components/MuComponents/MuButtons/MuOutlinedButton';
import Dropdown from '../../../../components/MuComponents/Dropdown/Dropdown';
import { hasRole } from '../../../../services/common_functions';
import { roles } from '../../../../services/types';
import './Organizations.scss';
import { MuButton } from '../../../../components/MuComponents/MuButtons/MuButton';
import { getCountry } from './apis';
import { useLocation } from 'react-router-dom';

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

  const { activeItem } = location.state;

  const [inputName, setInputName] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [selectCountry, setSelectCountry] = useState('');
  const [countryData, setCountryData] = useState<any[]>([]);

  useEffect(() => {
    if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate('/404');

    getCountry(setCountryData);
  }, []);

  function parseFunctionString(functionString: string) {
    return new Function(`return ${functionString}`)();
  }

  const FormData = ({ activeItem }: any) => {
    switch (activeItem) {
      case 'Colleges':
        return (
          <CollegeForm
            countryData={countries.countries}
            districtsData={districts.districts}
            statesData = {states.states}
            zoneData = {zones.zones}
            selectCountry={selectCountry}
            setSelectCountry={setSelectCountry}
          />
        );
      case 'Companies':
        return (
          <CompaniesForm
            countryData={countryData}
            selectCountry={selectCountry}
            setSelectCountry={setSelectCountry}
          />
        );
      case 'Communities':
        return (
          <CommunitiesForm
            countryData={countryData}
            selectCountry={selectCountry}
            setSelectCountry={setSelectCountry}
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
        <FormData activeItem={activeItem} />
      </div>
      <div className="submit_container">
        <MuButton text="Submit" className="btn" />
      </div>
    </div>
  );
}

export default CreateOrganization;
