import React, { useEffect } from "react";

const Redirection = ({ link }) => {
  useEffect(() => {
    window.location.href = link;
  }, [link]);
  return (
    <div className="flex justify-center items-center flex-col gap-8 h-screen">
      <div className="animate-spin rounded-full h-15 w-15 border-t-2 border-l-2 border-orange-400"></div>
      <p className="text-2xl font-medium text-orange-400">Redirecting...</p>
    </div>
  );
};

export default Redirection;
