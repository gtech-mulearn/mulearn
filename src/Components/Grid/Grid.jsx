import React from 'react'

import GridItem from './GridItem'

const Grid = ({ data, selectedCategory ,error}) => {
    const filteredData = data.filter((item) => {
      if (selectedCategory === "All") {
        return true;
      }
  
      return item.Category === selectedCategory;
    });
  
    return (
      <>
      <div id='grid-view' className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8 p-4">
        {filteredData.map((item) => (
          <GridItem key={item["Sl .No"]} item={item} />
        )).reverse()}
         
      </div>
      {error && (
                  <div>
                    <h1 style={{
                      width:"auto",
                      display: 'flex',
                      justifyContent:'center',
                      alignContent:'center',
                      fontSize:'1.5rem',
                      fontWeight:'500',
                      padding:"10px"
                    }} >{error}</h1>
                  </div>

                )}
      </>
    );
  };

export default Grid