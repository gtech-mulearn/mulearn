import { useMemo } from "react";
import * as d3 from "d3";

type DataItem = {
    name: string;
    value: number;
};
type PieChartProps = {
    width: number;
    height: number;
    data: DataItem[];
};

const MARGIN = 30;

const colors = ["#55A5E8", "#003E7D", "#D1E8FF", "#8ABFFF", "#001B37", "#90C0FF", "#004080", "#C6E2FF", "#3299CC", "#003D73", "#B3D6FF", "#0067A3", "#C2E0FF", "#02519D", "#A5CBE3"];


export const PieChart = ({ width, height, data }: PieChartProps) => {
    const radius = Math.min(width, height) / 2 - MARGIN;

    const pie = useMemo(() => {
        const pieGenerator = d3.pie<any, DataItem>().value(d => d.value);
        return pieGenerator(data);
    }, [data]);

    const arcs = useMemo(() => {
        const arcPathGenerator = d3.arc();
        return pie.map(p =>
            arcPathGenerator({
                innerRadius: 0,
                outerRadius: radius,
                startAngle: p.startAngle,
                endAngle: p.endAngle
            })
        );
    }, [radius, pie]);

    return (
        <svg width={width} height={height} style={{ display: "inline-block" }}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
                {arcs.map((arc: any, i) => {
                    return <path key={i} d={arc} fill={colors[i]} />;
                })}
            </g>
        </svg>
    );
};
