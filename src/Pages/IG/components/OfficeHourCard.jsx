import React from "react";
import { Calendar, Clock, User, Briefcase, Users } from "lucide-react";

const OfficeHourCard = ({ date, ig, mentorName, mentorRole, topic, time }) => {
  return (
    <div className="overflow-hidden border-2 border-orange-400 hover:shadow-lg transition-all duration-300 rounded-md w-full sm:w-full md:w-lg lg:w-xl xl:w-2xl mx-auto">
      <div className="p-6">
        <div className="relative">
          {/* Orange gradient accent */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-orange-400/5 rounded-full blur-3xl" />
          {/* Topic Section */}
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight m-0 mb-3 text-gray-900 tracking-tighter text-left">
              {topic}
            </h2>
            <div className="w-1/2">
              <div className="bg-orange-100 text-orange-700 hover:bg-orange-200 w-auto inline-flex items-center px-3 py-1 rounded-full text-xs font-medium">
                <Users className="w-3 h-3 mr-1" />
                {ig}
              </div>
            </div>
          </div>

          {/* Date and Time Section */}
          <div className="flex flex-wrap items-center gap-4 mb-6 bg-gray-100 rounded-lg p-4">
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-2 text-orange-500" />
              <span className="font-medium">{date}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="w-5 h-5 mr-2 text-orange-500" />
              <span>{time}</span>
            </div>
          </div>

          {/* Mentor Section */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{mentorName}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-1 text-orange-400" />
                <span>{mentorRole}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeHourCard;
