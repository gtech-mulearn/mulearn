// @ts-ignore
import partners from "./data/partners.js";

import fvimg from "./assets/Coding workshop.gif";
import CommunityCard from "./CommunityCard/CommunityCard";
import HomeNav from "@/modules/Common/HomeNav/HomeNav.js";
import Footer from "@/modules/Common/Footer/Footer.js";

type Partner = {
  name: string;
  image: string;
  link: string;
  customlink?: string;
};

const CommunityPartner = () => {
  return (
    <>
      <HomeNav />
      <div className="flex flex-col items-center justify-center pt-20 md:pt-32">
        <div className="flex flex-col md:min-h-screen md:flex-row items-center justify-around ">
          <div className="text-center md:text-left md:w-1/3 mx-4 md:mx-0">
            <p className="font-sans text-5xl font-semibold text-[#303030] md:text-7xl md:leading-tight">
              <span className="font-semibold text-[#5570f1]">µLearn Community</span> Partners
            </p>
            <p className="mt-6 md:mt-8 text-lg md:text-2xl w-full font-[Poppins] mx-2 md:mx-0">
              When a group of like-minded people come together interesting
              things take place. What if multiple Communities join their hands
              together for a common aim things get much more interesting!
            </p>
          </div>

          <div>
            <img src={fvimg} alt="" className="block mt-0 w-[24rem] md:w-[38rem]" />
          </div>  
        </div>

        <div className="bg-white max-w-6xl" style={{ paddingBottom: "5rem" }}>
          <div className="lg:w-2/3 flex flex-col text-center md:text-left relative lg:left-[-4rem] top-[2.5rem] mx-4 md:mx-0">
            <p className="text-3xl md:text-5xl font-semibold font-sans">
              <span className="text-[#5570f1]">Community</span> Partners
            </p>
            <p className="mt-6 md:mt-8 text-lg md:text-2xl mx-2 md:mx-0 font-[Poppins]">
              µLearn has partnered with multiple communities to provide the
              peers the best resources and events to learn and up-skill
              themselves.
            </p>
          </div>
          <div className="grid grid-cols-1 place-items-center relative top-[5rem] gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 ">
            {(partners as Partner[]).map((partner) => (
              <CommunityCard
                key={partner.name}
                cname={partner.name}
                cimage={partner.image}
                clink={partner.link}
                customlink={partner.customlink}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer  />
    </>
  );
};

export default CommunityPartner;
