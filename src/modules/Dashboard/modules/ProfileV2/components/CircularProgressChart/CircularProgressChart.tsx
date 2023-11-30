import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";

const COLORS = ["#456FF6", "#8FBCFA", "#AED0FF", "#E0EDFF", "#EA9CF4"];

interface DataItem {
    name: string;
    value: number;
}

interface ExampleProps {
    data: DataItem[];
}

export default class Example extends PureComponent<ExampleProps> {
    static demoUrl =
        "https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o";
    onPieEnter: CategoricalChartFunc | undefined;

    render() {
        const { data } = this.props;
        console.log(data[1].name);

        return (
            <>
                <PieChart
                    width={170}
                    height={170}
                    onMouseEnter={this.onPieEnter}
                >
                    <Pie
                        data={data}
                        cx={80}
                        cy={80}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
                <div>
                    {data.map((entry, index) =>
                        entry.value !== 0 ? (
                            <div style={{display:"flex",gap:"10px"}}>
                                <div
                                    style={{
                                        width: "15px",
                                        height: "15px",
                                        backgroundColor:
                                            COLORS[index % COLORS.length],
                                        borderRadius: "50%"
                                    }}
                                ></div>
                                <p key={index} style={{color:"black"}}>{entry.name}</p>
                            </div>
                        ) : null
                    )}
                </div>
            </>
        );
    }
}
