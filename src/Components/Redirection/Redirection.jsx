import React, { useEffect } from "react";

const Redirection = ({ link }) => {
  useEffect(() => {
    window.location.href = link;
  }, [link]);
  return (
    <div className="flex justify-center items-center flex-col gap-8 h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-l-2 border-gray-900"></div>
      <p className="text-3xl font-medium">Redirecting...</p>
    </div>
  );
};

export default Redirection;
