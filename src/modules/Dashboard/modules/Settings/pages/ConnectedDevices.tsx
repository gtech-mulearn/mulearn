import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { deviceType } from './DeviceCard'
import DeviceCard from './DeviceCard';
import MuLoader from '@/MuLearnComponents/MuLoader/MuLoader';

import { FaArrowLeft } from 'react-icons/fa';
import styles from "./ConnectedDevices.module.css";



const ConnectedDevices = () => {
    
    const nav = useNavigate()
    
    const [devices,setDevices]= useState<deviceType[]>([
        {
            device_type:"Phone",
            device_name:"poli phone",
            current:true,
            logout:()=>{handleLogout('oru id')},
            last_active:5,
            logged_in:"ennale",
            browser:"Chrome"
        },
        {
            device_type:"Linux PC",
            device_name:"poli lap",
            current:false,
            logout:()=>{handleLogout('oru id')},
            last_active:5,
            logged_in:"day before yesterday",
            browser:"Firefox"
        }
    ])

    const handleLogout = (deviceId:string)=>{
        console.log(deviceId)
    }

    const handleReturn = ()=>{
        nav('/')
    }


    return (
        <div className={styles.connectedDevices}>
            <div className={styles.middle}>
                <div className={styles.content}>
                    {/* <i class="fa fa-arrow-left"></i> */}
                    {/* <FaArrowLeft onClick={handleReturn}/> */}
                    <br/>
                    <p>You’re signed in on these devices or have been in the last 28 days. There might be multiple activity sessions from the same device.</p>

                </div>
                <div className={styles.container}>
                    {devices?
                    devices.map(device=>
                        <DeviceCard
                            key={device.device_name}
                            device={device}
                        />
                        )
                    :
                    <MuLoader/>
                    }
                </div>
            </div>
        </div>
    )
}

export default ConnectedDevices