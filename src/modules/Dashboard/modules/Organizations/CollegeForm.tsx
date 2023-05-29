import { useState } from "react";
import Dropdown from "../../../../components/MuComponents/Dropdown/Dropdown";
import "./Organizations.scss";
import Select, { ActionMeta, GroupBase } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface CollegeFormProps {
  isCreate: boolean;
  countryData: Option[];
  selectCountry: string;
  setSelectCountry: React.Dispatch<React.SetStateAction<string>>;

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

  const handleCountryChange = (option: Option | null) => {
    if (option) {
      setCountry(option);
    }
  };

  const handleStateChange = (option: Option | null) => {
    if (option) {
      setState(option);
    }
  };
  

  const getDefaultValue = () => {
    console.log("country:",props.selectedCountry)
    if (!props.isCreate && props.selectedCountry) {
      const defaultOption = props.countryData.find((option) => option.label.toUpperCase() === props.selectedCountry ? option.label : null);
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
          defaultValue={getDefaultValue}
          onChange={handleCountryChange}
          options={props.countryData}
        />
      </div>
      <div className="inputfield_container">
        <p>State</p>
        <Select
          options={props.statesData}
        />
      </div>
      <div className="inputfield_container">
        <p>District</p>
        <Select
          options={props.districtsData}
        />
      </div>
      <div className="inputfield_container">
        <p>Zone</p>
        <Select
          options={props.zoneData}
        />
      </div>
    </>
  );
};

export default CollegeForm;
