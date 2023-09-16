import { Chart } from "react-google-charts";

export const options = {
    slices: {
        1: { color: "#456FF6" },
        0: { color: "#7DAAE9" },
        2: { color: "#2E85FE" },
        3: { color: "#A0C8FF" },
        4: { color: "#E0EDFF" }
    },
    // fontSize: window.innerWidth > 1800 ? 15 : 10,
    is3D: true,
    // pieHole: 0.4,
    legend: {
        alignment: "center",
        textStyle: {
            fontSize: window.innerWidth > 1800 ? 15 : 10
        }
    },
    chartArea: {
        width: "70%",
        height: "100%"
    },
    backgroundColor: "transparent",
    tooltip: {
        textStyle: {
            fontSize: window.innerWidth > 1800 ? 15 : 10
        }
    },
    pieSliceBorderColor: "#fff"
};
export function PieChart({ data }: any) {
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={
                window.innerWidth > 1800
                    ? "400px"
                    : window.innerWidth < 1400 && window.innerWidth > 900
                    ? "400px"
                    : "200px"
            }
        />
    );
}
