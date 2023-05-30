import { useState } from "react";
import Select, { ActionMeta } from "react-select";
import "./Organizations.scss";

interface Option {
  value: string;
  label: string;
}

interface CollegeFormProps {
  isCreate: boolean;
  countryData: Option[];
  districtsData: Option[];
  statesData: Option[];
  zoneData: Option[];

  setSelectCountry: any;
  setSelectState: any;
  setSelectZone: any;

  selectedCountry?: string;
  selectedState?: string;
  selectedZone?: string;
}

const CollegeForm = ({ ...props }: CollegeFormProps) => {
  const [country, setCountry] = useState<Option | null>(null);
  const [state, setState] = useState<Option | null>(null);
  const [district, setDistrict] = useState("");
  const [zone, setZone] = useState("");
  const [affiliatedUniversity, setAffiliatedUniversity] = useState("");

  const handleCountryChange = (option: Option | null, action: ActionMeta<Option>) => {
    if (option) {
      setCountry(option);
      props.setSelectCountry(option.value)
    }
  };

  const handleStateChange = (option: Option | null, action: ActionMeta<Option>) => {
    if (option) {
      setState(option);
      props.setSelectState(option.value)
    }
  };

  const getCountryDefaultValue = () => {
    if (!props.isCreate) {
      const defaultOption = props.countryData.find(
        (option) =>
          option.label.toUpperCase() === props.selectedCountry?.toUpperCase()
      );
      return defaultOption || null;
    }
    return null;
  };

  const getStatesDefaultValue = () => {
    if (!props.isCreate) {
      const defaultOption = props.statesData.find(
        (option) =>
          option.label.toUpperCase() === props.selectedState?.toUpperCase()
      );
      return defaultOption || null;
    }
    return null;
  };

  const getZonesDefaultValue = () => {
    if (!props.isCreate) {
      const defaultOption = props.zoneData.find(
        (option) =>
          option.label.toUpperCase() === props.selectedZone?.toUpperCase()
      );
      return defaultOption || null;
    }
    return null;
  };

  return (
    <>
      <div className="inputfield_container">
        <p>Affiliated University</p>
        <Select
          value={state}
          onChange={handleStateChange}
          options={props.countryData}
        />
      </div>
      <div className="inputfield_container">
        <p>Country</p>
        <Select
          defaultValue={
            props.isCreate ? country : getCountryDefaultValue()
          }
          onChange={handleCountryChange}
          options={props.countryData}
        />
      </div>
      <div className="inputfield_container">
        <p>State</p>
        <Select 
          defaultValue={
            props.isCreate ? state : getStatesDefaultValue()
          }
          onChange={handleStateChange}
          options={props.statesData} />
      </div>
      <div className="inputfield_container">
        <p>District</p>
        <Select options={props.districtsData} />
      </div>
      <div className="inputfield_container">
        <p>Zone</p>
        <Select 
          defaultValue={getZonesDefaultValue()}
          onChange={handleCountryChange}
          options={props.zoneData} 
         />
      </div>
    </>
  );
};

export default CollegeForm;
