import React from 'react'
import styles from './AccountCreation.module.css'
import {FcGoogle} from 'react-icons/fc'
import {HiEye} from 'react-icons/hi2'

export default function AccountCreation() {
  return (
    <div className={styles.accountCreationContainer}>

      <div className={styles.accountCreationInputs}>

        <input type="email" placeholder='Email id' required/>
        <div className={styles.accountCreationName}>
            <input type="text" placeholder='First Name' required/>
            <input type="text" placeholder='Last Name'required/>
        </div>
        <input type="number" placeholder='+91'/>
        <div className={styles.accountCreationPassword}>
        <input type="password" placeholder='Password'required />
        <button>
          <HiEye size={26}/>
        </button>
        </div>    
        <input type='password' placeholder='Confirm Password'required/>
        <button>Create Account</button>
      </div>
 
      <div className={styles.accountCreationAlternative}>

        <div>
          <hr/><p>OR</p><hr />
        </div> 
        <button>
          <FcGoogle size={35}/> Sign in with google
        </button>
        <div>
           <p>Don't have an account?  <a href="">Sign In</a></p> 
        </div>

      </div>

    </div>

  )
}

