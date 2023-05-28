import Dropdown from "../../../../components/MuComponents/Dropdown/Dropdown"

interface CompaniesFormProps {
    countryData: any[],
    selectCountry: string,
    setSelectCountry: React.Dispatch<React.SetStateAction<string>>
}

const CompaniesForm = ({countryData,selectCountry,setSelectCountry}:CompaniesFormProps) => {
    return(
      <>
      <div className="inputfield_container">
            <p>Affiliated University</p>
            <Dropdown
              contents={countryData}
              input = {selectCountry}
              setInput = {setSelectCountry}
            />
          </div>
          <div className="inputfield_container">
            <p>Country</p>
            <Dropdown
              contents={countryData}
              input = {selectCountry}
              setInput = {setSelectCountry}
            />
          </div>
          <div className="inputfield_container">
            <p>State</p>
            <Dropdown
              contents={countryData}
              input = {selectCountry}
              setInput = {setSelectCountry}
            />
          </div>
      </>
    )
  }

  export default CompaniesForm