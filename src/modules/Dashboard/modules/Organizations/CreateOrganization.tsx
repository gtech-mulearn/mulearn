import React, { useState, useEffect } from 'react'
import Textfield from '../../../../components/MuComponents/TextField/Textfield'
import { useNavigate } from 'react-router-dom'
import { MuButtonLight } from '../../../../components/MuComponents/MuButtons/MuButton'
import PrimaryButton from '../../../../components/MuComponents/MuButtons/MuOutlinedButton'
import Dropdown from '../../../../components/MuComponents/Dropdown/Dropdown'
import { hasRole } from '../../../../services/common_functions'
import { roles } from '../../../../services/types'
import './Organizations.scss'
import { MuButton } from '../../../../components/MuComponents/MuButtons/MuButton'
import { getCountry } from './apis'

function CreateOrganization() {

  const navigate = useNavigate()

  const [input, setInput] = useState("")
  const [countryData,setCountryData] = useState<any[]>([])

  useEffect(() => {
    if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate("/404");

    getCountry(setCountryData)
  }, []);
  
  function parseFunctionString(functionString: string) {
    return new Function(`return ${functionString}`)();
  }

  return (
    
    <div className='popup_container'>
      <div className="popup_top_container">
        <h1 className='popup_title'>Add College</h1>
        <i
          className="fi fi-sr-cross"
          onClick={() => {
            navigate('/organizations')
          }}
        ></i>
      </div>
      <div className='popup_dropdown_container'>
        <div className="inputfield_container">
          <Textfield
            content={"College Name"}
            inputType={"text"}
            setInput={setInput}
            input={input}
            style={{
              width: "100%"
            }}
          />
        </div>
        <div className="inputfield_container">
          <Textfield
            content={"Code"}
            inputType={"text"}
            setInput={setInput}
            input={input}
            style={{
              width: "100%"
            }}
          />
        </div>
        <div className="inputfield_container">
          <p>Affiliated University</p>
          {/* <Dropdown
            contents={["A", "B", "C"]}
          />
        </div>
        <div className="inputfield_container">
          <p>Country</p>
          <Dropdown
            contents={countryData}
          />
        </div>
        <div className="inputfield_container">
          <p>State</p>
          <Dropdown
            contents={["A", "B", "C"]}
          />
        </div>
        <div className="inputfield_container">
          <p>District</p>
          <Dropdown
            contents={["A", "B", "C"]}
          />
        </div>
        <div className="inputfield_container">
          <p>Zone</p>
          <Dropdown
            contents={["A", "B", "C"]}
          /> */}
        </div>
      </div>
      <div className='submit_container'>
      <MuButton text={"Submit"} className="btn" />
      </div>
    </div>
  )
}

export default CreateOrganization
