import React from "react"
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface TableTopTabProps {
    active: string;
    onTabClick: (tab: string) => void;
}

const TableTopTab = ({ active, onTabClick }: TableTopTabProps) => {
    const tabletopTab = ["Colleges", "Companies", "Communities"]

    return (
        <div className='table_tab_container'>
            <div className="table_tabs">
                {
                    tabletopTab?.map((item: string): any => (
                        <MuButton
                            text={item}
                            className = { 
                                active === item 
                                ? "table_tab_btn active" 
                                :  "table_tab_btn inactive"
                            }
                            onClick={()=>{
                                onTabClick(item)
                            }}
                        />
                        // <div 
                        //     key={item}
                            // className = { 
                            //     active === item 
                            //     ? "_table_tab_btn active" 
                            //     :  "_table_tab_btn inactive"
                            // }
                        //     onClick={()=>{
                        //         onTabClick(item)
                        //     }}
                        // >
                        // {item}
                        // </div>
                    ))
                }
            </div>
            <MuButton
                    className="org_create_btn"
                    text={"Create"}
                    // onClick={handleCreate}
                    icon={<AiOutlinePlusCircle></AiOutlinePlusCircle>}
                />
        </div>
    )
}

export default TableTopTab;