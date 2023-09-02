import React from 'react'
import styles from './accountCreation.module.css'
import { IconContext } from "react-icons";
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
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.931 7.676C23.896 7.597 23.049 5.718 21.166 3.835C18.657 1.326 15.488 0 12 0C8.512 0 5.34299 1.326 2.83399 3.835C0.950991 5.718 0.0999905 7.6 0.0689905 7.676C0.0235036 7.77831 0 7.88903 0 8.001C0 8.11297 0.0235036 8.22369 0.0689905 8.326C0.103991 8.405 0.950991 10.283 2.83399 12.166C5.34299 14.674 8.512 16 12 16C15.488 16 18.657 14.674 21.166 12.166C23.049 10.283 23.896 8.405 23.931 8.326C23.9765 8.22369 24 8.11297 24 8.001C24 7.88903 23.9765 7.77831 23.931 7.676ZM12 12C11.2089 12 10.4355 11.7654 9.77772 11.3259C9.11992 10.8864 8.60723 10.2616 8.30448 9.53073C8.00173 8.79983 7.92251 7.99556 8.07686 7.21964C8.2312 6.44372 8.61216 5.73098 9.17157 5.17157C9.73098 4.61216 10.4437 4.2312 11.2196 4.07686C11.9956 3.92252 12.7998 4.00173 13.5307 4.30448C14.2616 4.60723 14.8864 5.11992 15.3259 5.77772C15.7654 6.43552 16 7.20887 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12Z" fill="#D9D9D9"/>
          </svg>
          {/* <IconContext.Provider value={{style:{fontSize:'26px'}}}>
          <HiEye/> 
          </IconContext.Provider>   */}
        </button>
        </div>    
        <input type='password' placeholder='Confirm Password'required/>
        <button>Create Account</button>
      </div>
 
      <div className={styles.accountCreationAlternative}>
        <div>
          <hr/>
          <p>OR</p>
          <hr />
        </div> 

          <button>

          <IconContext.Provider
                value={{ style: { fontSize:'30px' } }}
          >
            <FcGoogle/>
          </IconContext.Provider>

            Sign in with google
          </button>

            <div>
                <p>Don't have an account?  <a href="">Sign In</a></p> 
            </div>
      </div>

    </div>

  )
}

