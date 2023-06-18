import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { hasRole } from '../../../../services/common_functions';
import { roles } from '../../../../services/types';
import { getInfo } from './apis';
import styles from "../../../../components/MuComponents/FormikComponents/form.module.css";
import { Formik } from 'formik';
import * as Yup from "yup";

import FormData from './FormData';

function EditOrganization() {

  const navigate = useNavigate();
  const location = useLocation();

  const { activeItem, rowId } = location.state

  const [inputName, setInputName] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedAffiliation, setSelectedAffiliation] = useState('');

  useEffect(() => {
    if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate('/404');

    getInfo(rowId)
      .then((data) => {
        setInputName(data.title)
        setInputCode(data.code)
        setSelectedCountry(data.country)
        setSelectedState(data.state)
        setSelectedZone(data.zone)
        setSelectedDistrict(data.district)
        setSelectedAffiliation(data.affiliation)

      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  const RenderFormData = ({ activeItem }: any) => {
    switch (activeItem) {
      case 'Colleges':
        return (
          <FormData
            isCreate={false}
            activeItem="College"
            inputName={inputName}
            inputCode={inputCode}

            selectedCountry={selectedCountry}
            selectedState={selectedState}
            selectedZone={selectedZone}
            selectedDistrict={selectedDistrict}
            selectedAffiliation={selectedAffiliation}
          />
        );
      case 'Companies':
        return (
          <FormData
            isCreate={false}
            activeItem="Company"
            inputName={inputName}
            inputCode={inputCode}

            selectedCountry={selectedCountry}
            selectedState={selectedState}
            selectedZone={selectedZone}
            selectedDistrict={selectedDistrict}
          />
        );
      case 'Communities':
        return (
          <FormData
            isCreate={false}
            activeItem="Community"
            inputName={inputName}
            inputCode={inputCode}
            
            selectedCountry={selectedCountry}
            selectedState={selectedState}
            selectedZone={selectedZone}
            selectedDistrict={selectedDistrict}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="popup_container">
          <div className={styles.container}>
      <div className="popup_top_container">
        <h1 className="popup_title">Edit {activeItem}</h1>
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
        <RenderFormData activeItem={activeItem} />
      </div>
      </div>
    </div>
  )
}

export default EditOrganization
