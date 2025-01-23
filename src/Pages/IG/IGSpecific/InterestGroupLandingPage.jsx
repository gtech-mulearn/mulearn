import { Keywords } from "./components/keywords";
import { ProfileCard } from "./components/profilecard";
import { Section } from "./components/section";
import fvimg from "../assets/fvimg.png";
import { BiCalendar, BiTime, BiMap } from "react-icons/bi";
import "swiper/css";
import "swiper/css/navigation";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Timeline from "./components/Timeline";
import { InfiniteImageSlider } from "./components/InfiniteImageSlider";
import styles from "../InterestGroups.module.css";

export default function InterestGroupLandingPage({ data, id, images }) {
  const [isMobile, setIsMobile] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = isMobile ? 1 : 3;

  const handleJoinLearningCircles = () => {
    window.open("https://app.mulearn.org", "_blank");
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= data.learningCircles.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? data.learningCircles.length - 1 : nextIndex;
    });
  };

  const getVisibleItems = () => {
    const items = [...data.learningCircles];
    const visibleItems = [];

    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % items.length;
      visibleItems.push(items[index]);
    }

    return visibleItems;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div
      className={`${styles.container} min-h-screen px-4 sm:px-6 lg:px-8 w-full`}>
      <div className="flex flex-col lg:flex-row text-left w-full mb-8">
        <div
          id="foundation-section"
          className={`${styles.contentSide} lg:w-2/3`}>
          <h1
            className={`${styles.title} text-3xl sm:text-4xl lg:text-5xl font-bold mb-4`}>
            {data.title}
          </h1>

          <p className={`${styles.description} text-sm sm:text-base mb-4`}>
            {data.introduction?.description}
            <br />
            <span>
              <a
                href={data.introduction?.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline">
                Click here
              </a>{" "}
              to download the foundation deck.
            </span>
          </p>

          <div className={`${styles.offerInfo} mb-4`}>
            <span className={`${styles.highlight} font-semibold`}>
              Office Hours:
            </span>{" "}
            {data.introduction.schedules?.officeHours || "TBA"}
            <br />
            <span className={`${styles.highlight} font-semibold`}>
              Think Tank Meeting:
            </span>{" "}
            {data.introduction.schedules?.thinkTankMeeting || "TBA"}
          </div>

          <button
            type="button"
            className={`${styles.primaryButton} bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded`}
            onClick={handleJoinLearningCircles}>
            Join Learning Circles
          </button>
        </div>
        <div className="lg:w-1/3 flex justify-center items-center mt-8 lg:mt-0">
          <div className={styles.heroImage}>
            <img
              src={fvimg}
              alt="Web Development Illustration"
              className={`${styles.mainImage} w-full max-w-sm`}
            />
          </div>
        </div>
      </div>

      {data.communityPartners && (
        <div id="partners-section" className="w-full">
          <Section
            className="w-full text-left flex flex-col justify-start items-start py-4 md:py-8 space-y-4 md:space-y-8"
            title="Community Partners">
            <div className="flex items-center justify-center">
              <div className="w-full overflow-hidden">
                <InfiniteImageSlider images={images} speed={1.5} height={100} />
              </div>
            </div>
          </Section>
        </div>
      )}

      {data.learningCircles && (
        <div className="w-full py-4 md:py-8" id="learning-circles-section">
          <h2 className="text-2xl font-bold text-[#f78c40] my-4 md:my-6 text-left">
            Learning Circles
          </h2>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out gap-5"
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / itemsPerView)
                  }%)`,
                }}>
                {getVisibleItems().map((circle) => (
                  <div
                    key={circle.id}
                    className="w-full flex-shrink-0 min-w-0"
                    style={{ flex: `0 0 ${100 / itemsPerView}%` }}>
                    <div className="bg-white rounded-lg p-6 m-2 shadow-lg">
                      <h3 className="text-xl font-semibold mb-2">
                        {circle.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {circle.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <BiCalendar className="w-5 h-5" />
                          <span className="text-sm">{circle.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <BiTime className="w-5 h-5" />
                          <span className="text-sm">{circle.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <BiMap className="w-5 h-5" />
                          <span className="text-sm">{circle.location}</span>
                        </div>
                      </div>
                      <button className="bg-[#f78c40] text-white px-4 py-2 rounded hover:bg-[#e85f2f] transition-colors">
                        Join Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors -ml-4 z-10">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors -mr-4 z-10">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      <div id="prerequisites-section">
        <Section
          className="w-full text-left flex flex-col justify-start items-start py-4 md:py-8 space-y-4 md:space-y-8"
          title="Pre-requisites">
          {/* <p className="text-gray-600">{data.prerequisites.description}</p> */}
          <ul className="list-disc pl-5 space-y-1">
            {data.prerequisites?.map((prerequisite) => (
              <li key={prerequisite} className="text-gray-600">
                {prerequisite}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {data.roadMap && (
        <div id="learning-path-section" className="w-full">
          <Section className="w-full" title="Learning Path">
            <div className="max-w-6xl mx-auto py-8">
              <div className="w-full border rounded-lg overflow-hidden bg-white">
                <Timeline timelineData={data.roadMap} igName={data.title} />
              </div>
            </div>
          </Section>
        </div>
      )}

      <div className=" space-y-4 md:space-y-8 w-full" id="mentors-section">
        <Section title="Mentor Details" className="space-y-4 md:space-y-6">
          <p className="text-gray-600">
            Here to help? Our Mentors are here to help you get all your doubts
            cleared and help you along your journey. Join in for our office
            hours and get all your doubts cleared.
          </p>
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.mentors?.map((mentor) => (
              <ProfileCard key={mentor.name} {...mentor} />
            ))}
          </div>
        </Section>

        <div
          className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2"
          id="ig-leads-section">
          <Section title="Interest Group Leads">
            <p className="text-gray-600">
              Interest group leads manage the activities and events within
              interest groups and serve as a point of contact for students. They
              help coordinate activities and provide information about new
              interests.
            </p>
            <div className="space-y-4 mt-4">
              {data.interestGroupLeads?.leads.map((lead) => (
                <ProfileCard key={lead.name} {...lead} />
              ))}
            </div>
          </Section>

          <Section title="Interest Group Leaderboard " className="">
            <p className="text-gray-600 ">
              Stay engaged and climb the leaderboard as you complete projects
              and participate in discussions.
            </p>
            {data.interestGroupLeaderboard && (
              <div className="aspect-square bg-white rounded-lg border mt-4" />
            )}
          </Section>
        </div>

        <div
          id="opportunities-section"
          className="w-full grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Section title="Opportunities">
            <p className="text-gray-600">
              Getting a new skill always brings in possible opportunities. Here
              are possible opportunities that you could grab by learning this
              skill.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {data.opportunities?.map((opportunity) => (
                <li key={opportunity.title} className="text-gray-600">
                  {opportunity.title} - {opportunity.description}
                </li>
              ))}
            </ul>
          </Section>

          <div id="people-to-follow-section">
            <Section title="Top People to Follow ">
              <p className="text-gray-600">
                These are list of people you should be following/connecting to
                learn as well as stay updated!
              </p>
              <ul className="space-y-1">
                {data.peopleToFollow?.map((person) => (
                  <li key={person.name} className="text-gray-600">
                    {person.name} -{" "}
                    <a
                      href={person.link}
                      className="text-[#ff6b00] hover:underline">
                      click here
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <div id="blogs-to-follow-section">
            <Section title="Top Blogs to Follow">
              <p className="text-gray-600">
                Learning through reading is a great way to improve your
                knowledge base. These are trusted blogs and have quality content
                and have lots of them!
              </p>
              <ul className="space-y-1">
                {data.blogsToFollow?.map((blog) => (
                  <li key={blog.name} className="text-gray-600">
                    {blog.name} -{" "}
                    <a
                      href={blog.link}
                      className="text-[#ff6b00] hover:underline">
                      click here
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>

        <div id="top-keywords-section">
          <Section title="Top Keywords">
            <p className="text-gray-600">
              Listed below are the top keywords that you should be looking out
              for while searching through internet!
            </p>
            <Keywords keywords={data.topKeywords} />
          </Section>
        </div>
      </div>
    </div>
  );
}
