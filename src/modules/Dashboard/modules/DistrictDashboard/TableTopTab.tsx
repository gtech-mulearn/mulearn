import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";

interface TableTopTabProps {
    active: string;
    onTabClick: (tab: string) => void;
}

const TableTopTab = ({ active, onTabClick }: TableTopTabProps) => {
    const tabletopTab = ["Student management", "Campus management"];

    return (
        <div className="table_tab_container">
            <div className="table_tabs">
                {tabletopTab?.map((item: string): any => (
                    <MuButton
                        key={item}
                        text={item}
                        className={
                            active === item
                                ? "table_tab_btn active"
                                : "table_tab_btn inactive"
                        }
                        onClick={() => {
                            onTabClick(item);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default TableTopTab;
