import React from "react";
import { MuButton, PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../DistrictDashboard/Organizations.css";
import "../DistrictDashboard/DistricDashboard.scss";
interface TableTopTabProps {
    active: string;
    onTabClick: (tab: string) => void;
}

const TableTopTab = ({ active, onTabClick }: TableTopTabProps) => {
    const tabletopTab = ["College", "Company", "Community"];

    const navigate = useNavigate();

    const handleCreate = () => {
        navigate("/dashboard/organizations/create", {
            state: {
                activeItem: active,
                isCreate: true
            }
        });
    };

    return (
        <div className="table_tab_container">
            <div className="table_tabs">
                {tabletopTab.map((item: string): any => (
                    
                    <PowerfulButton className={
                        active === item
                            ? "table_tab_btn active"
                            : "table_tab_btn inactive"
                    }
                    variant="plain"
                    onClick={() => {
                        onTabClick(item);
                    }}>{item}</PowerfulButton>
                ))}
            </div>
           
            <PowerfulButton className="org_create_btn"
                
                style={{
                    backgroundColor: "#456FF6",
                    color: "#fff"
                }}
                onClick={handleCreate}><AiOutlinePlusCircle/>Create</PowerfulButton>
        </div>
    );
};

export default TableTopTab;
