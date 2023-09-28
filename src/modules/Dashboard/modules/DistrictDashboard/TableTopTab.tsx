import { PowerfulButton} from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate } from "react-router-dom";

interface TableTopTabProps {
    active: string;
    onTabClick: (tab: string) => void;
}

const TableTopTab = ({ active, onTabClick }: TableTopTabProps) => {
    const tabletopTab = ["Student management", "Campus management"];

    const navigate = useNavigate();

    return (
        <div className="table_tab_container">
            <div className="table_tabs">
                {tabletopTab?.map((item: string): any => (
                    <PowerfulButton
                        variant="plain"
                        className={
                            active === item
                                ? "table_tab_btn active"
                                : "table_tab_btn inactive"
                        }
                        onClick={() => {
                            onTabClick(item);
                        }}
                    >
                        {item}
                    </PowerfulButton>
                ))}
            </div>
        </div>
    );
};

export default TableTopTab;
