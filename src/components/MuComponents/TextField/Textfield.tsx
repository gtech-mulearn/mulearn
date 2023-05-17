import React from 'react'
import styles from './Textfield.module.css'

const Textfield = (props:{
  content: string ;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler;
  inputType: 'text'| 'number';
}) => {
  return (
    <div className={styles.inputBox} style={props.style} onClick={props.onClick}>
        <input type={props.inputType} required/>
        <span>{props.content}</span>
    </div>
  )
}

export default Textfield