import { ReactNode, useEffect,Suspense } from "react"
import { useNavigate,Outlet} from "react-router-dom"
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import styles from './Settings.module.css'
type Props = {
}

const Settings = (props: Props) => {
  
  const nav = useNavigate()

  useEffect(()=>{
    nav('connected-devices')
    //temporary measure to access connected device
  },[])
  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: '100vh',
    //     fontSize: '5rem'
    //   }}
    // >Settings</div>
    <div className={styles.reset}>
      <Suspense fallback={<MuLoader />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Settings