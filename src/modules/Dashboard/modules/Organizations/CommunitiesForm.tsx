import { useState,useEffect } from "react";
import Select, { ActionMeta } from "react-select";
import { hasRole } from '../../../../services/common_functions';
import { roles } from '../../../../services/types';
import { getCountry,getStates,getZones,getDistricts } from './apis';
import { useNavigate } from 'react-router-dom';

import "./Organizations.scss";

interface Option {
  value: string;
  label: string;
}

interface CollegeFormProps {
  isCreate: boolean;

  setSelectedCountry: any;
  setSelectedState: any;
  setSelectedZone: any;
  setSelectedDistrict:any

  selectedCountry?: string;
  selectedState?: string;
  selectedZone?: string;
  selectedDistrict?:string;
}

const CommunitiesForm = ({ ...props }: CollegeFormProps) => {
  const [country, setCountry] = useState<any>("");
  const [state, setState] = useState<any>("");
  const [district, setDistrict] = useState("");
  const [zone, setZone] = useState<any>("");
  const [affiliatedUniversity, setAffiliatedUniversity] = useState("");

  const [countryData, setCountryData] = useState<any[]>([]);
  const [statesData,setStatesData] = useState<any[]>([])
  const [zonesData,setZonesData] = useState<any[]>([])
  const [districtsData,setDistrictsData] = useState<any[]>([])

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState,setSelectedState] = useState('')
  const [selectedZone,setSelectedZone] = useState('')
  const [selectedDistrict,setSelectedDistrict] = useState('')

  const navigate = useNavigate();

  function camelCase(str:string) {
    return str?.replace(/\b[A-Z]+\b/g, (match) => match.charAt(0) + match.slice(1).toLowerCase());
  }

  useEffect(() => {
      if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate('/404');
  
      console.log("getting country datas")
      
      getCountry(setCountryData);
      getStates(camelCase(props?.selectedCountry),setStatesData)
      getZones(camelCase(props?.selectedCountry),camelCase(props?.selectedState),setZonesData)
      getDistricts(camelCase(props?.selectedCountry),camelCase(props?.selectedState),camelCase(props?.selectedZone),setDistrictsData)
  }, []);

  useEffect(()=>{
    if(country !== ''){
      console.log("now you can select states")
      getStates(camelCase(country.value),setStatesData)
    }
  },[selectedCountry])

  useEffect(()=>{
    if(state !== ''){
      console.log("you can select zone")
      getZones(camelCase(country.value),camelCase(state.value),setZonesData)
    }
  },[selectedState])
  
  useEffect(()=>{
    if(state !== ''){
      console.log("you can select districts")
      getDistricts(camelCase(country.value),camelCase(state.value),camelCase(zone.value),setDistrictsData)
    }
  },[selectedZone])

  const handleCountryChange = (option: any ) => {
    if(option){
      setCountry(option);
      setSelectedCountry(option.value as string);
    }
  };

  const handleStateChange = (option: any) => {
    if(option){
      setState(option);
      setSelectedState(option.value as string)
    }
  };

  const handleZoneChange = (option: any) => {
    if(option){
      setZone(option);
      setSelectedZone(option.value as string)
    }
  };

  const handleDistrictChange = (option: any) => {
    if(option){
      setDistrict(option);
      setSelectedDistrict(option.value as string)
    }
  };

  const getCountryDefaultValue = () => {
    if (!props.isCreate) {
      const defaultOption = countryData.find(
        (option) =>
          option.label.toUpperCase() === props.selectedCountry?.toUpperCase()
      );
      return defaultOption || null;
    }
    return null;
  };

  const getStatesDefaultValue = () => {
    if (!props.isCreate) {
      const defaultOption = statesData.find(
        (option) =>
          option.label.toUpperCase() === props.selectedState?.toUpperCase()
      );
      return defaultOption || null;
    }
    return null;
  };

  const getZonesDefaultValue = () => {
    if (!props.isCreate) {
      const defaultOption = zonesData.find(
        (option) =>
          option.label.toUpperCase() === props.selectedZone?.toUpperCase()
      );
      return defaultOption || null;
    }
    return null;
  };

  const getDistrictsDefaultValue = () => {
    if (!props.isCreate) {
      const defaultOption = districtsData.find(
        (option) =>
          option.label.toUpperCase() === selectedDistrict?.toUpperCase()
      );
      return defaultOption || null;
    }
    return null;
  }

  return (
    <>
      <div className="inputfield_container">
        <p>Country</p>
        <Select
          defaultValue={
            props.isCreate ? country : getCountryDefaultValue()
          }
          onChange={handleCountryChange}
          options={countryData}
        />
      </div>
      <div className="inputfield_container">
        <p>State</p>
        <Select 
          defaultValue={
            props.isCreate ? state : getStatesDefaultValue()
          }
          onChange={handleStateChange}
          options={statesData} />
      </div>
      <div className="inputfield_container">
        <p>Zone</p>
        <Select 
          defaultValue={
            props.isCreate ? zone : getZonesDefaultValue()
          }
          onChange={handleZoneChange}
          options={zonesData} 
         />
      </div>
      <div className="inputfield_container">
        <p>District</p>
        <Select 
          defaultValue={
            props.isCreate ? state : getDistrictsDefaultValue()
          }
          onChange={handleDistrictChange}
          options={districtsData} 
        />
      </div>
    </>
  );
};

export default CommunitiesForm;
