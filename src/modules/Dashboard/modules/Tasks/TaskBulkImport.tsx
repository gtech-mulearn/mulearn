import BulkImport from "../../../../components/MuComponents/BulkImport/BulkImport";
import { dashboardRoutes } from "../../../../services/urls";

type Props = {};

const TaskBulkImport = (props: Props) => {
    return (
        <>
            <BulkImport path={dashboardRoutes.getTasksData + "import/"} />
        </>
    );
};

export default TaskBulkImport;
