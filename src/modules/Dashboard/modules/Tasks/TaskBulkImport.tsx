import BulkImport from "../../../../components/MuComponents/BulkImport/BulkImport";
import { SingleButton } from "../../../../components/MuComponents/MuButtons/MuButton";
import { dashboardRoutes } from "../../../../services/urls";
import { BiDownload } from "react-icons/bi";

type Props = {};

const TaskBulkImport = (props: Props) => {
	const handleClick = () => {
		//console.log("worked")
	}
    return (
        <>
            <SingleButton
                text={"Download Template"}
                onClick={handleClick}
                icon={<BiDownload />}
                link="https://drive.google.com/uc?export=download&id=1b2DUyj6zxDzY8q5pDTbL3NlZEL1J1dcq"
            />
            <BulkImport path={dashboardRoutes.getTasksData + "import/"} />
        </>
    );
};

export default TaskBulkImport;
