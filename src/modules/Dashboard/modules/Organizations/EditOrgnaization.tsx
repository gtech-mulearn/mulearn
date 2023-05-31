import React,{useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { hasRole } from '../../../../services/common_functions';
import { roles } from '../../../../services/types';
import { getInfo } from './apis';
import { getCountry,updateOrganization } from './apis';
import Textfield from '../../../../components/MuComponents/TextField/Textfield';
import { useToast } from "@chakra-ui/react";

import CollegeForm from './CollegeForm';
import CompaniesForm from './CompaniesForm';
import CommunitiesForm from './CommunitiesForm';

import countries from './dummyData/Countries.json';
import districts from './dummyData/Districts.json';
import states from './dummyData/States.json'
import zones from './dummyData/Zones.json'

interface infoProps {
    affiliation: string;
    code: string;
    country: string;
    district: string;
    state: string;
    title: string;
    zone: string;
}


function EditOrgnaization() {

    const navigate = useNavigate();
    const location = useLocation();
  
    const {activeItem,rowId} = location.state

    const toast = useToast();
    
    const [inputName, setInputName] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedZone, setSelectedZone] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const [countryData, setCountryData] = useState<any[]>([]);
    const [selectCountry,setSelectCountry] = useState("")

    const orgType= "College"

    const handleSubmit = (e: any) => {
			e.preventDefault();
      resetStates()
			updateOrganization(
        inputName,
        inputCode,
        "KTU",
        selectedCountry,
        selectedState,
        selectedDistrict,
        selectedZone,
        orgType,
        toast);
      
      navigate('/organizations');
  };
  
    useEffect(() => {
      if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate('/404');
  
      getInfo(rowId)
      .then((data) => {
        setInputName(data.title)
        setInputCode(data.code)
        setSelectedCountry(data.country)
        setSelectedState(data.state)
        setSelectedZone(data.zone)
        console.log("info",data)
      })
      .catch((error) => {
        console.error(error);
      })
    }, []);

    useEffect(() => {
      if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate('/404');
  
      getCountry(setCountryData);
    }, []);
  
    function parseFunctionString(functionString: string) {
      return new Function(`return ${functionString}`)();
    }
  
    const resetStates = () => {
      setInputName('');
      setInputCode('');
    };
  
    const FormData = ({ activeItem }: any) => {
      switch (activeItem) {
        case 'Colleges':
          return (
            <CollegeForm
              isCreate = {false}
              activeItem = "College"
              inputName = {inputName}
              inputCode = {inputCode}

              setSelectedCountry={setSelectedCountry}
              setSelectedState={setSelectedState}
              setSelectedZone={setSelectedZone}
              setSelectedDistrict={setSelectedDistrict}

              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedZone={selectedZone}
              selectedDistrict={selectedDistrict}
            />
          );
        case 'Companies':
          return (
            <CollegeForm
              isCreate = {false}
              activeItem = "Company"
              
              setSelectedCountry={setSelectedCountry}
              setSelectedState={setSelectedState}
              setSelectedZone={setSelectedZone}
              setSelectedDistrict={setSelectedDistrict}

              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedZone={selectedZone}
              selectedDistrict={selectedDistrict}
            />
          );
        case 'Communities':
          return (
            <CollegeForm
            isCreate = {false}
            activeItem = "Community"
              
            setSelectedCountry={setSelectedCountry}
            setSelectedState={setSelectedState}
            setSelectedZone={setSelectedZone}
            setSelectedDistrict={setSelectedDistrict}

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
              <FormData activeItem={activeItem} />
        </div>
      </div>
    )
}

export default EditOrgnaization
