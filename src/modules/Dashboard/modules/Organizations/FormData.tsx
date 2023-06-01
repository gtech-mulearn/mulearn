import { useState, useEffect } from "react";
import Select, { ActionMeta } from "react-select";
import { hasRole } from '../../../../services/common_functions';
import { roles } from '../../../../services/types';
import { getCountry, getStates, getZones, getDistricts } from './apis';
import { useNavigate } from 'react-router-dom';
import Textfield from '../../../../components/MuComponents/TextField/Textfield';

import { createOrganization, updateOrganization } from './apis';
import { useToast } from "@chakra-ui/react";


import "./Organizations.scss";

interface Option {
  value: string;
  label: string;
}

interface CollegeFormProps {
  isCreate: boolean;
  activeItem: string;

  inputName?: string;
  inputCode?: string;
  selectedCountry?: string;
  selectedState?: string;
  selectedZone?: string;
  selectedDistrict?: string;
}

const FormData = ({ ...props }: CollegeFormProps) => {

  const [inputName, setInputName] = useState('');
  const [inputCode, setInputCode] = useState('');

  const [country, setCountry] = useState<any>("");
  const [state, setState] = useState<any>("");
  const [district, setDistrict] = useState<any>("");
  const [zone, setZone] = useState<any>("");
  const [affiliatedUniversity, setAffiliatedUniversity] = useState("");

  const [countryData, setCountryData] = useState<any[]>([]);
  const [statesData, setStatesData] = useState<any[]>([])
  const [zonesData, setZonesData] = useState<any[]>([])
  const [districtsData, setDistrictsData] = useState<any[]>([])

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('')
  const [selectedZone, setSelectedZone] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  const [isCountryDataLoaded, setCountryDataLoaded] = useState(false)
  const [isStateDataLoaded,setIsStateDataLoaded] = useState(false)
  const [isZoneDataLoaded,setIsZoneDataLoaded] = useState(false)
  const [isDistrictDataLoaded,setIsDistrictDataLoaded] = useState(false)


  const navigate = useNavigate();
  const toast = useToast();

  function camelCase(str: string) {
    return str?.replace(/\b[A-Z]+\b/g, (match) => match.charAt(0) + match.slice(1).toLowerCase());
  }

  const resetStates = () => {
    setInputName('');
    setInputCode('');
  };

  const orgType = props.activeItem
  const AffUni = "KTU"

  const handleSubmit = (e: any) => {
    e.preventDefault();
    resetStates()
    interface SelectBodyProps {
      inputName: string;
      inputCode: string;
      country: string;
      state: string;
      zone: string;
      district: string;
      orgType: string;
      toast: any;
    }
    
    const createOrUpdateOrganization = (
      params: SelectBodyProps,
      isCreate: boolean,
      affUni?: string
    ) => {
      const {
        inputName,
        inputCode,
        country,
        state,
        zone,
        district,
        orgType,
        toast,
      } = params;
    
      if (isCreate) {
        if (orgType === "College") {
          createOrganization(
            inputName,
            inputCode,
            camelCase(country),
            camelCase(state),
            camelCase(zone),
            camelCase(district),
            orgType,
            toast,
            affUni
          );
        } else {
          createOrganization(
            inputName,
            inputCode,
            camelCase(country),
            camelCase(state),
            camelCase(zone),
            camelCase(district),
            orgType,
            toast
          );
        }
      } else {
        if (orgType === "College") {
          updateOrganization(
            inputName,
            inputCode,
            camelCase(country),
            camelCase(state),
            camelCase(zone),
            camelCase(district),
            orgType,
            toast,
            affUni
          );
        } else {
          updateOrganization(
            inputName,
            inputCode,
            camelCase(country),
            camelCase(state),
            camelCase(zone),
            camelCase(district),
            orgType,
            toast
          );
        }
      }
    };
    
    const SelectBody = (item: string) => {
      const params: SelectBodyProps = {
        inputName,
        inputCode,
        country: country.value,
        state: state.value,
        zone: zone.value,
        district: district.value,
        orgType,
        toast,
      };
    
      createOrUpdateOrganization(params, props.isCreate, AffUni);
      navigate('/organizations');
    };
    
    SelectBody(orgType);
    navigate('/organizations');
  };

  useEffect(() => {
    if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate('/404');

    if (!isCountryDataLoaded) {
      getCountry(setCountryData);
      setCountryDataLoaded(true);
    }

    if (!props.isCreate) {
      setInputName(props.inputName || "")
      setInputCode(props.inputCode || "")
      if (props.selectedCountry) {
        getStates(camelCase(props.selectedCountry), setStatesData);
      }
  
      if (props.selectedCountry && props.selectedState) {
        getZones(
          camelCase(props.selectedCountry),
          camelCase(props.selectedState),
          setZonesData
        );
      }
  
      if (
        props.selectedCountry &&
        props.selectedState &&
        props.selectedZone
      ) {
        getDistricts(
          camelCase(props.selectedCountry),
          camelCase(props.selectedState),
          camelCase(props.selectedZone),
          setDistrictsData
        );
      }
    }
  }, []);

  useEffect(() => {
    if (country !== '') {
      getStates(camelCase(country.value), setStatesData)
    }
  }, [selectedCountry])

  useEffect(() => {
    if (state !== '') {
      getZones(camelCase(country.value), camelCase(state.value), setZonesData)
    }
  }, [selectedState])

  useEffect(() => {
    if (state !== '') {
      getDistricts(camelCase(country.value), camelCase(state.value), camelCase(zone.value), setDistrictsData)
    }
  }, [selectedZone])

  const handleCountryChange = (option: any) => {
    if (option) {
      setCountry(option);
      setSelectedCountry(option.value as string)
    }
  };

  const handleStateChange = (option: any) => {
    if (option) {
      setState(option);
      setSelectedState(option.value as string)
    }
  };

  const handleZoneChange = (option: any) => {
    if (option) {
      setZone(option);
      setSelectedZone(option.value as string)
    }
  };

  const handleDistrictChange = (option: any) => {
    if (option) {
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
        <Textfield
          content={`${props.activeItem} Name`}
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
      {
        props.activeItem === "College" ? (
          <div className="inputfield_container">
            <p>Affiliated University</p>
            <Select
              value={state}
              onChange={handleStateChange}
              options={countryData}
            />
          </div>
        ) : (null)
      }

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
            props.isCreate ? district : getDistrictsDefaultValue()
          }
          onChange={handleDistrictChange}
          options={districtsData}
        />
      </div>
      <div className="inputfield_container grid-container">
        <div
          className="btn light-btn"
          onClick={resetStates}
        >Decline</div>
        <div
          className="btn blue-btn"
          onClick={handleSubmit}>Submit</div>
      </div>
    </>
  );
};

export default FormData;
