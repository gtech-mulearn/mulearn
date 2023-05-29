import Dropdown from "../../../../components/MuComponents/Dropdown/Dropdown"

interface CommunitiesFormProps {
    countryData: any[],
    selectCountry: string,
    setSelectCountry: React.Dispatch<React.SetStateAction<string>>
}

const CommunitiesForm = ({countryData,selectCountry,setSelectCountry}:CommunitiesFormProps) => {
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
      </>
    )
  }

  export default CommunitiesForm