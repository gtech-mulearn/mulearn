import React from "react";

const ContentsMenu = ({data}) => {
  console.log(data);
  // Define a mapping of menu items to their section IDs and data sources
  const contentMapping = [
    { 
      label: "FOUNDATION", 
      sectionId: "foundation-section",
      checkPath: 'introduction.downloadLink', 
      isVisible: () => data?.introduction?.downloadLink 
    },
    { 
      label: "PARTNERS", 
      sectionId: "partners-section",
      checkPath: 'communityPartners', 
      isVisible: () => data?.communityPartners?.length 
    },
    { 
      label: "PRE-REQUISITES", 
      sectionId: "prerequisites-section",
      checkPath: 'prerequisites.description', 
      isVisible: () => data?.prerequisites?.description 
    },
    { 
      label: "LEARNING PATH", 
      sectionId: "learning-path-section",
      checkPath: 'roadMap', 
      isVisible: () => data?.roadMap?.length 
    },
    { 
      label: "MENTOR DETAILS", 
      sectionId: "mentors-section",
      checkPath: 'mentors', 
      isVisible: () => data?.mentors?.length 
    },
    { 
      label: "IG LEADS / IG LEADERBOARD", 
      sectionId: "ig-leads-section",
      checkPath: 'interestGroupLeads.leads', 
      isVisible: () => data?.interestGroupLeads?.leads?.length 
    },
    { 
      label: "OPPORTUNITIES", 
      sectionId: "opportunities-section",
      checkPath: 'opportunities', 
      isVisible: () => data?.opportunities?.length 
    },
    { 
      label: "TOP PEOPLE TO FOLLOW", 
      sectionId: "people-to-follow-section",
      checkPath: 'peopleToFollow', 
      isVisible: () => data?.peopleToFollow?.length 
    },
    { 
      label: "TOP BLOGS TO FOLLOW", 
      sectionId: "blogs-to-follow-section",
      checkPath: 'blogsToFollow', 
      isVisible: () => data?.blogsToFollow?.length 
    },
    { 
      label: "TOP KEYWORDS", 
      sectionId: "top-keywords-section",
      checkPath: 'topKeywords', 
      isVisible: () => data?.topKeywords?.length 
    },
  ];

  // Scroll to section handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter out null values and generate menu items
  const contents = contentMapping
    .filter(item => item.isVisible())
    .map(item => item);

  return (
    <div
      // style={{
      //   boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
      // }}
      className="p-4 rounded-md sticky top-10 min-w-64 bg-white hidden lg:block m-8"
    >
      {/* Heading */}
      <h2 className="text-xl font-bold text-orange-400 mb-4 text-left ml-0">
        Contents
      </h2>

      {/* List of items */}
      <ul className="space-y-4 pl-2">
        {contents.map((item, index) => (
          <li
            key={index}
            onClick={() => scrollToSection(item.sectionId)}
            className="text-gray-700 font-medium text-[15px] hover:text-orange-500 cursor-pointer"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentsMenu;