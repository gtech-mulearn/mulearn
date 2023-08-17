import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { Chart } from "react-google-charts";

export const options = {
    
    is3D: false,
    legend: {
        alignment: "center",
        textStyle: {
            fontSize:16,
            bold:1
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
    if(!data)
    return(<MuLoader/>)
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={{...options,...addOptions}}
            width={'100%'}
            height={'90%'}
        />
    );
}

export function BarChart({data,addOptions}:any){
    if(!data)
    return(<MuLoader/>)
    return <Chart
        chartType="Bar"
        data={data}
        options={{...options,...addOptions}}
        width={'100%'}
        height={'90%'}
    />
}

export function ColumnChart({data,addOptions}:any){
    if(!data)
    return(<MuLoader/>)
    return <Chart
        chartType="Bar"
        data={data}
        options={{...options,...addOptions}}
        width={'100%'}
        height={'90%'}
    />
}
