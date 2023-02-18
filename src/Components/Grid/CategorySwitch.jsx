import React from "react";

const CategorySwitch = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleClick = (category) => {
    setSelectedCategory(category);
    const categoryTabs = document.querySelector("#category-tabs");
    const categoryTabsPosition = categoryTabs.getBoundingClientRect().top;
    const tabsHeight = categoryTabs.offsetHeight;

    if (categoryTabsPosition <= 0) {
      scrollToTargetAdjusted(tabsHeight);
    }
  };

  function scrollToTargetAdjusted(tabsHeight) {
    var element = document.getElementById("grid-view");
    var headerOffset = tabsHeight;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  return (
    <div
      id="category-tabs"
      className="flex justify-center gap-2 mb-4 flex-wrap p-4 sm:sticky top-0 bg-white"
    >
      {categories.map((category) => (
        <button
          key={category}
          className={`font-poppins box-border px-3 py-1 text-sm font-semibold leading-5 rounded-md ${
            category === selectedCategory
              ? "bg-gray-900 text-white"
              : "bg-transparent text-gray-700 border border-gray-300"
          }`}
          onClick={() => handleClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySwitch;
