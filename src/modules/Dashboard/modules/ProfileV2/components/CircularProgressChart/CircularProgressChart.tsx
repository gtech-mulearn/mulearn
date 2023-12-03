import React from "react";

// Define the types for your data items and props
type DataItem = [string, number];
type CircularProgressChartProps = {
    data: DataItem[];
};

const colors = ["blue", "red", "green", "orange"]; // Define your colors array

const CircularProgressChart: React.FC<CircularProgressChartProps> = ({
    data
}) => {
    const total = data.reduce((acc, [_, value]) => acc + value, 0);

    // Function to calculate the end angle of each segment
    const calculateEndAngle = (
        value: number,
        total: number,
        lastEndAngle: number
    ) => {
        const angle = (value / total) * Math.PI * 2;
        return lastEndAngle + angle;
    };

    let lastEndAngle = 0;

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            {data.map(([_, value], index) => {
                const endAngle = calculateEndAngle(value, total, lastEndAngle);
                const largeArcFlag = endAngle - lastEndAngle > Math.PI ? 1 : 0;
                const pathData = [
                    `M 100 100`, // Move to the center
                    `L ${100 + 70 * Math.cos(lastEndAngle)} ${
                        100 + 70 * Math.sin(lastEndAngle)
                    }`, // Line to the start point of the arc
                    `A 70 70 0 ${largeArcFlag} 1 ${
                        100 + 70 * Math.cos(endAngle)
                    } ${100 + 70 * Math.sin(endAngle)}`, // Arc to the end point
                    `Z` // Close the path
                ].join(" ");
                lastEndAngle = endAngle; // Update the lastEndAngle for the next segment

                return (
                    <path
                        key={index}
                        d={pathData}
                        fill={colors[index % colors.length]}
                        stroke="white"
                        strokeWidth="1"
                    />
                );
            })}
        </svg>
    );
};

export default CircularProgressChart;
