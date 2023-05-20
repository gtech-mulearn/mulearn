import React from "react"

interface TableTopTabProps{
    active: string;
    onTabClick: (tab:string) => void;
}

const TableTopTab = ({active,onTabClick}:TableTopTabProps) => {
    const tabletopTab = ["Colleges", "Companies", "Communities"]

    return(
        <div className='_table_tab_container'>
            {
                tabletopTab?.map((item:string):any=>(
                    <div 
                        key={item}
                        className = { 
                            active === item 
                            ? "_table_tab_btn active" 
                            :  "_table_tab_btn inactive"
                        }
                        onClick={()=>{
                            onTabClick(item)
                        }}
                    >
                    {item}
                    </div>
                ))
            }
        </div>
    )
}

export default TableTopTab;