import { useState } from "react";
import Dropdown from "../../../../components/MuComponents/Dropdown/Dropdown";
import "./Organizations.scss";
import Select, { ActionMeta } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface CollegeFormProps {
  countryData: Option[];
  selectCountry: string;
  setSelectCountry: React.Dispatch<React.SetStateAction<string>>;
  districtsData: Option[];
  statesData: Option [];
  zoneData: Option [];
}

const CollegeForm = ({ ...props }: CollegeFormProps) => {
  const [country, setCountry] = useState<Option | null>(null);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [zone, setZone] = useState("");
  const [affiliatedUniversity, setAffiliatedUniversity] = useState("");

  const handleCountryChange = (option: Option | null, actionMeta: ActionMeta<Option>) => {
    if (option) {
      setCountry(option);
    }
  };

  return (
    <>
      <div className="inputfield_container">
        <p>Affiliated University</p>
      </div>
      <div className="inputfield_container">
        <p>Country</p>
        <Select
          value={country}
          onChange={handleCountryChange}
          options={props.countryData}
        />
      </div>
      <div className="inputfield_container">
        <p>State</p>
        <Select options={props.statesData} />
      </div>
      <div className="inputfield_container">
        <p>District</p>
        <Select options={props.districtsData} />
      </div>
      <div className="inputfield_container">
        <p>Zone</p>
        <Select options={props.zoneData} />
      </div>
    </>
  );
};

export default CollegeForm;
