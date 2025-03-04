import LevelMap from "./Map"
//@ts-ignore
import { ReactFlowProvider } from "reactflow";

function Dashboard() {
    return(
        <ReactFlowProvider>
        <LevelMap />
      </ReactFlowProvider>
    )
}

export default Dashboard