import React from "react";

interface CircleSection {
  label: string;
  percentage: number;
  color?: string;
}

interface CircleChartProps {
  sections: CircleSection[];
}

const KarmaDist: React.FC<CircleChartProps> = ({ sections }) => {
  // Calculate the total percentage
  const totalPercentage = sections.reduce((total, section) => total + section.percentage, 0);

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {sections.map((section, index) => {
        // Calculate the length of this section based on the percentage
        const sectionLength = (section.percentage / totalPercentage) * 360;

        // Set the stroke color based on the data
        const strokeColor = section.color || "#000";

        // Calculate the strokeDasharray for this section
        const dashArray = section.percentage > 1 ? `${sectionLength}, 20` : `0, 20`;

        return (
          <circle
            key={index}
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke={strokeColor}
            strokeWidth="16"
            strokeDasharray={dashArray}
            strokeDashoffset="0"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

export default KarmaDist;
