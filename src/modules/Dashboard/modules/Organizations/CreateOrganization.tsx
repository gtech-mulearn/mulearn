import React, { useState } from 'react'
import Textfield from '../../../../components/MuComponents/TextField/Textfield'
import { useNavigate } from 'react-router-dom'
import { MuButtonLight } from '../../../../components/MuComponents/MuButtons/MuButton'
import PrimaryButton from '../../../../components/MuComponents/MuButtons/MuOutlinedButton'
import Dropdown from '../../../../components/MuComponents/Dropdown/Dropdown'
import './Organizations.scss'
import { MuButton } from '../../../../components/MuComponents/MuButtons/MuButton'

function CreateOrganization() {

  const navigate = useNavigate()

  const [input, setInput] = useState("")

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
          <Dropdown
            contents={["A", "B", "C"]}
          />
        </div>
        <div className="inputfield_container">
          <Dropdown
            contents={["A", "B", "C"]}
          />
        </div>
      </div>
      <div className='submit_container'>
      <MuButton text={"Submit"} className="btn" />
      </div>
    </div>
  )
}

export default CreateOrganization
