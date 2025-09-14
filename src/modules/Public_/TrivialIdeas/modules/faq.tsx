import { useState,useEffect } from "react";
import QuestionCard from "../components/questionCard/card";

let data = [
    {
        text: "Is there is a registration cost ?",
        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        text: "What are the prizes for winning ?",
        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        text:"What idea can i submit ?",
        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        text:"How can i submit ?",
        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }

]

function Faqs() {

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
            width:windowWidth>768?"50%":"100%",
            display:"flex",
            gap:"3rem",
            flexDirection:"column",
            padding:"80px 0px",
            }}>
            <h1 style={{
                fontSize:windowWidth>768?"3vw":"6vw",
                fontWeight:"bold",
                textAlign:"center",
            }}>Got questions?</h1>
            <div
            
            style={{
                display:"flex",
                gap:"1rem",
                flexDirection:"column",
            }}>
                {
                    data.map((question, index) => {
                        return (
                            <QuestionCard text={question.text} content={question.content} key={index} />
                        );
                    })
                }
            </div>
        </div>
     );
}

export default Faqs;