import { Chart } from "react-google-charts";

export const options = {
    // title:'Weekly Karma Insights',
    // titleTextStyle:{
    //     fontSize:20,
    //     alignment: "center",
    // },
    slices: {
        1: { color: "#456FF6" },
        0: { color: "#7DAAE9" },
        2: { color: "#2E85FE" },
        3: { color: "#A0C8FF" },
        4: { color: "#E0EDFF" }
    },
    // fontSize: window.innerWidth > 1800 ? 15 : 10,
    is3D: false,
    // pieHole: 0.4,
    legend: {
        alignment: "center",
        textStyle: {
            fontSize:15
        }
    },
    backgroundColor: "transparent",
    tooltip: {
        textStyle: {
            fontSize:15
        }
    },
    chartArea: {
        width: "100%",
        height: "100%",
        top: 10,
        left: 0,
        right: 0,
        bottom: 0
    },
    pieSliceBorderColor : "transparent",
};

export function PieChart({ data,addOptions }: any) {
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={{...options,...addOptions}}
            width={'100%'}
            height={'85%'}
        />
    );
}

export function BarChart({data,addOptions}:any){
    return <Chart
        chartType="Bar"
        data={data}
        options={{...options,...addOptions}}
        width={'100%'}
        height={'85%'}
    />
}
