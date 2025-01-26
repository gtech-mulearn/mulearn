import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { InfiniteImageSlider } from "./IGSpecific/components/InfiniteImageSlider";
import {
  Users,
  BookOpen,
  Calendar,
  Share2,
  TrendingUp,
  Network,
  Award,
  GitMerge,
  Code,
  Paintbrush,
  Cpu,
  Briefcase,
} from "lucide-react";

import fvimg from "./assets/fvimg.png";
import fetchOfficeHours from "./services/fetchOfficeHours";
import OfficeHourCard from "./components/OfficeHourCard";

const features = [
  { icon: Users, title: "Focused Learning Communities" },
  { icon: BookOpen, title: "Peer-to-Peer Learning" },
  { icon: Calendar, title: "Workshops and Events" },
  { icon: Share2, title: "Resource Sharing" },
  { icon: TrendingUp, title: "Skill Development Pathways" },
  { icon: Network, title: "Networking Opportunities" },
  { icon: Award, title: "Recognition and Rewards" },
  { icon: GitMerge, title: "Collaboration Opportunities" },
];

const categories = [
  {
    name: "Software",
    description: "Dive into the world of coding and software development.",
    icon: Code,
    active: [
      "Game Development",
      "Web Development",
      "Data Science",
      "Cyber Security",
      "Artificial Intelligence",
      "Cloud and DevOps",
    ],
    comingSoon: [
      "Beckn",
      "No/Low Code",
      "Quality Assurance",
      "Blockchain",
      "Edge Computing",
      "Data Structures and Algorithms",
    ],
  },
  {
    name: "Creative",
    description: "Unleash your creativity and design skills.",
    icon: Paintbrush,
    active: ["UI UX", "AR VR"],
    comingSoon: [
      "CAD",
      "Film Making",
      "Content Writing",
      "Creative Design",
      "3D Animation",
      "Comics",
    ],
  },
  {
    name: "Maker",
    description: "Build and innovate with cutting-edge technologies.",
    icon: Cpu,
    active: ["Internet of Things"],
    comingSoon: ["Semiconductor", "Robotics", "Wearable Technology", "Drones"],
  },
  {
    name: "Others",
    description: "Explore diverse fields and expand your horizons.",
    icon: Briefcase,
    active: [
      "Product Management",
      "Digital Marketing",
      "Entrepreneurship",
      "Human Resources",
    ],
    comingSoon: ["Strategic Leadership"],
  },
];

const images = [
  "/assets/IG/Web Development/Community Partners/Pygrammers.png",
  "/assets/IG/Web Development/Community Partners/Engagespot.jpg",
  "/assets/IG/Web Development/Community Partners/Reflections.jpg",
  "/assets/IG/Web Development/Community Partners/Faya.jpg",
  "/assets/IG/Web Development/Community Partners/Open Fin Tech.jpg",
  "/assets/IG/Web Development/Community Partners/Github.png",
  "/assets/IG/Web Development/Community Partners/Elixir Labs.png",
  "/assets/IG/Web Development/Community Partners/Open Grad.png",
  "/assets/IG/Web Development/Community Partners/Softnotions.png",
  "/assets/IG/Web Development/Community Partners/Hamon.jpeg",
  "/assets/IG/Web Development/Community Partners/Alokin.jpg",
  "/assets/IG/UI-UX/Community Partners/UXSHOTS.jpg",
  "/assets/IG/Game Development/Community Partners/Tiltlabs.png",
  "/assets/IG/Game Development/Community Partners/Banzan.jpg",
  "/assets/IG/Game Development/Community Partners/Norian.png",
  "/assets/IG/Game Development/Community Partners/AKEF.png",
  "/assets/IG/Game Development/Community Partners/AnimationXpress.jpeg",
  "/assets/IG/Entrepreneurship/Community Partners/Udhyam Logo.png",
  "/assets/IG/Digital Marketing/Community Partners/TechHazel Media.png",
  "/assets/IG/Cyber Security/Community Partners/Beagle Security.jpg",
  "/assets/IG/Cyber Security/Community Partners/Zilicon technologies.png",
  "/assets/IG/ARVR/Community Partners/Xtrudar.png",
  "/assets/IG/AI/Community Partners/Pathway.jpg",
];

const InterestGroups = () => {
  const [officeHours, setOfficeHours] = useState([]);

  const scrollToCategories = () => {
    document
      .getElementById("categories")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const openRequestForm = () => {
    window.open("https://airtable.com/shriAaNO6q4cQzKKl");
  };

  useEffect(() => {
    fetchOfficeHours()
      .then((data) => {
        setOfficeHours(data);
      })
      .catch((error) => {
        console.error("Error fetching office hours data:", error);
      });
  }, [officeHours]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto md:px-20 px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-400 mb-4">
              µLearn <span className="text-black">Interest Groups</span>
            </h1>
            <p className="text-gray-600 mb-8">
              An informal mechanism for bringing together learners who are
              interested in the same topic from across different fields and
              disciplines. A fantastic way to spend a small amount of time
              learning about new things with a group of people with same
              interests!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className="bg-orange-400 text-white px-6 py-3 rounded-md hover:bg-orange-500 transition-colors"
                onClick={scrollToCategories}>
                Discover More
              </button>
              <button
                type="button"
                className="bg-white border border-orange-400 text-orange-400 px-6 py-3 rounded-md hover:bg-orange-50 transition-colors"
                onClick={openRequestForm}>
                Request Interest Group
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={fvimg || "/placeholder.svg"}
              alt="Web Development Illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Community Partners
          </h3>
          <div className="w-full overflow-hidden">
            <InfiniteImageSlider images={images} speed={1} height={200} />
          </div>
        </div>

        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center">
                <feature.icon className="w-12 h-12 text-orange-400 mb-4" />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
            ))}
          </div>
        </section>
        {officeHours.length > 0 && (
          <section id="office-hours" className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-5">
              Office Hours
            </h2>
            <p className="text-center mx-auto max-w-2xl mb-12">
              Office hours are a great way to get help with your projects, ask
              questions, or just chat with our mentors. Join us and get your
              queries solved!
            </p>

            <div className="grid sm:grid-cols-1 md:grid:2 lg:grid-cols-3 gap-6">
              {officeHours?.map((officeHour, index) => (
                <OfficeHourCard key={index} {...officeHour} />
              ))}
            </div>
          </section>
        )}

        <section id="categories">
          <h2 className="text-3xl font-bold text-center mb-5">
            Existing <span className="text-orange-400">Interest Groups</span>
          </h2>
          <p className="text-center mx-auto max-w-2xl mb-12">
            Learning things for which you are curious is interesting, right?
            What about learning the same thing along with a group of like-minded
            peers and mentors, Much more interesting, right? Join in Now and
            Start Learning!
          </p>
          <div className="grid gap-6">
            {categories.map((category, index) => (
              <div key={index} className="shadow-lg p-5 rounded-md">
                <div className="flex items-center mb-4">
                  <category.icon className="w-8 h-8 text-orange-400 mr-3" />
                  <h3 className="text-2xl font-bold">{category.name}</h3>
                </div>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {category.active.map((group, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition duration-300">
                      <h4 className="font-semibold mb-2">{group}</h4>
                      <a
                        href={`/interestgroups/${group
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-sm text-orange-400 hover:text-orange-500">
                        View Group →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default InterestGroups;
