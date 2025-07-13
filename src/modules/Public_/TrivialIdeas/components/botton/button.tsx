import styles from './button.module.css'
function Button({name,color,text}:{name:string,color:string,text:string|null}) {

    
    return ( 
        <button
        style={
            {
                color: text?text:'white',
                backgroundColor: `${color}`,
                padding: "15px 20px",
                borderRadius: "5rem",
            }
        }
        className={styles.button}
        >{name}</button>
     );
}

export default Button;