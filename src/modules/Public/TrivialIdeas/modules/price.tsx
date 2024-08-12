import { useState,useEffect } from "react";
import PriceCard from "../components/priceCard/PriceCard";

const data = [
    {
        prize: "First",
        amount: '50,000'
    },
    {
        prize: "Second",
        amount: '25,000'
    },
    {
        prize: "Third",
        amount: "12,500"
    },
    {
        prize: "Fourth",
        amount: "6,250"
    },
    {
        prize: "Fifth",
        amount: "3,125"
    },
    {
        prize: "Sixth",
        amount: "1,600"
    }
];


function Price() {

    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    useEffect(()=>{
        window.addEventListener('resize',()=>{
            setwindowWidth(window.innerWidth);
        })

        return ()=>{
            window.removeEventListener('resize',()=>{
                setwindowWidth(window.innerWidth);
            })
        }
    },[])

    return ( 
        <div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            gap:"3rem",
        }}>
            <h1 style={{
                fontSize:windowWidth>768?"3vw":"6vw",
                fontWeight:"bold",
                textAlign:"center",
            
            }}>What we’ve got for you</h1>
            <div
            style={{
                // display:'grid',
                gridTemplateColumns:windowWidth>780?"repeat(3,1fr)":"1fr",
                // gap:windowWidth>768?"2.5vw":"1.5rem",
                // backgroundColor:"red",
                //responsive flex
                display:windowWidth>950?"grid":"flex",
                flexDirection:windowWidth>768?"row":"column",
                gap:windowWidth>768?"2.5rem":"1rem",
                justifyContent:"center",
                flexWrap:"wrap",
            }}
            >
                {
                    data.map((e, index) => {
                        return (
                            <PriceCard prize={e.prize} amount={e.amount} key={index} />
                        );
                    })
                }
            </div>
            <div
            style={{padding:"1rem 2rem",
                backgroundColor:"#F5F5F7",
                borderRadius:"1rem",
                fontWeight:"bold",
                }}>+400 Karma Points!</div>
        </div>
     );
}

export default Price;