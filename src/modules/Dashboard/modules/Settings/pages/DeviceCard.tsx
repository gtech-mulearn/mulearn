import React from 'react'

import { 
    FaMobileAlt,
    FaLaptop,
    FaChrome,
    FaFirefox
 } from 'react-icons/fa'
import styles from './ConnectedDevices.module.css'

export type deviceType = {
    device_type:"Phone"|"Linux PC"|"Windows PC",
    device_name:string,
    current:boolean,
    logout?:React.MouseEventHandler<HTMLButtonElement>,
    last_active:number,
    logged_in:string,
    browser:"Chrome"|"Firefox"
}

const DeviceCard = ({device}:{device:deviceType}) => {
  
  
    return (
    <div className={styles.device}>
        <span>
            <div className={styles.phone}>
                {
                    device.device_type==='Phone'?
                    <FaMobileAlt size={'3rem'}/>
                    :<FaLaptop size={'3rem'}/>
                }
                <span>
                <h4>{device.device_type}</h4>
                <p>{device.device_name}</p>
                </span>
            </div>
            <div className={styles.button}>
                {
                    device.current?
                    <>
                        <span></span>
                        <p>Current Session</p>
                    </>:
                    <div className={styles.button}>
                    <button onClick={device.logout}>Logout</button>
                    </div>
                    
                }
            </div>
        </span>
        <span className={styles.end}>
            <div className={styles.lastseen}>
                <p>Last Active: {device.last_active}mins ago</p>
                <p>Logged in : {device.logged_in}</p>
            </div>
            
            <div className={styles.google}>
                {{
                    "Chrome":<FaChrome/>,
                    "Firefox":<FaFirefox/>
                }[device.browser]}
                <p>{device.browser}</p>
            </div>
        </span>


    </div>
  )
}

export default DeviceCard