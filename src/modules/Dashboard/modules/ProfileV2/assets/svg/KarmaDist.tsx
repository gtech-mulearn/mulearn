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
  const radius = 80; // Radius of the circle
  const centerX = 100; // X-coordinate of the circle's center
  const centerY = 100; // Y-coordinate of the circle's center
  const totalPercentage = sections.reduce((total, section) => total + section.percentage, 0);

  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * radius;
  const gapPercentage = 5; // Adjust this value to control the gap width

  let startAngle = -Math.PI / 2; // Start angle at the top

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {sections.map((section, index) => {
        // Calculate the angle for the section based on its percentage
        const sectionAngle = (section.percentage / totalPercentage) * 2 * Math.PI;

        // Calculate the end angle for the section
        const endAngle = startAngle + sectionAngle;

        // Calculate the coordinates of the path
        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        // Create a path element for the section
        const path = (
          <path
            key={index}
            d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${sectionAngle > Math.PI ? 1 : 0} 1 ${x2} ${y2}`}
            fill="none"
            strokeWidth="16"
            strokeLinecap="round"
            stroke={section.color || "#456FF6"}
          />
        );

        // Update the start angle for the next section with the gap
        startAngle = endAngle + (gapPercentage / 100) * (2 * Math.PI);

        return path;
      })}
    </svg>
  );
};

export default KarmaDist;
