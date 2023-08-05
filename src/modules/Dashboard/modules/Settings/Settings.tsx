import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
}

const Settings = (props: Props) => {
  
  const nav = useNavigate()

  useEffect(()=>{
    nav('connected-devices')
    //temporary measure to access connected device
  },[])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '5rem'
      }}
    >Settings</div>
  )
}

export default Settings