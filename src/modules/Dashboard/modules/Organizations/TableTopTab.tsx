import React, { useRef, useState } from "react";
import {
    MuButton,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../DistrictDashboard/Organizations.css";
import "../DistrictDashboard/DistricDashboard.scss";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import OrgForm from "./OrgForm";
interface TableTopTabProps {
    active: string;
    onTabClick: (tab: string) => void;
}

const TableTopTab = ({ active, onTabClick }: TableTopTabProps) => {
    const tabletopTab = ["College", "Company", "Community"];
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
	const orgFormRef = useRef<any>(null); //! Use for modal and form button connectivity

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
                    <PowerfulButton
                        className={
                            active === item
                                ? "table_tab_btn active"
                                : "table_tab_btn inactive"
                        }
                        variant="plain"
                        onClick={() => {
                            onTabClick(item);
                        }}
                    >
                        {item}
                    </PowerfulButton>
                ))}
            </div>

            <PowerfulButton
                className="org_create_btn"
                style={{
                    backgroundColor: "#456FF6",
                    color: "#fff"
                }}
                onClick={() => setIsModalOpen(true)}
            >
                <AiOutlinePlusCircle />
                Create
            </PowerfulButton>
            <MuModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Add new ${active}`}
                type={"success"}
                body={`Enter the deatils of the new ${active}`}
                onDone={() => orgFormRef.current?.handleSubmitExternally()}
            >
                <OrgForm
                    ref={orgFormRef}
                    type={active}
                    isEditMode={false}
                    itemId={""}
                    closeModal={() => setIsModalOpen(false)}
                />
            </MuModal>
        </div>
    );
};

export default TableTopTab;
