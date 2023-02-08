import React from 'react'

const CategorySwitch = ({
    categories,
    selectedCategory,
    setSelectedCategory,
  }) => (
    <div className="flex justify-center gap-3 mb-4 flex-wrap p-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`font-poppins box-border border border-gray-300 font-normal px-3 py-1  text-sm font-medium leading-5  rounded-md ${
            category === selectedCategory
              ? "bg-gray-900 text-white"
              : "bg-transparent text-gray-700"
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
  
export default CategorySwitch