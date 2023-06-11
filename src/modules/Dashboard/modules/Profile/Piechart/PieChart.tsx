import { Chart } from "react-google-charts";

export const options = {
    slices: {
        1: { color: "#014BB2" },
        0: { color: "#7DAAE9" },
        2: { color: "#2E85FE" },
        3: { color: "#A0C8FF" },
        4: { color: "#E0EDFF" }
    }
};
export function PieChart({ data }: any) {
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={window.innerWidth > 2000 ? "500px" : "200px"}
        />
    );
}
