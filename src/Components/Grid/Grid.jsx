import React from 'react'

import GridItem from './GridItem'

const Grid = ({ data, selectedCategory }) => {
    const filteredData = data.filter((item) => {
      if (selectedCategory === "All") {
        return true;
      }
  
      return item.Category === selectedCategory;
    });
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8 p-4">
        {filteredData.map((item) => (
          <GridItem key={item["Sl .No"]} item={item} />
        )).reverse()}
      </div>
    );
  };

export default Grid