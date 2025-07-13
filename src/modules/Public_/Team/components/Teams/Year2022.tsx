import TeamSection from "../TeamSection";

// DATA
import core from "../../data/2022/core.json";
import zonal from "../../data/2022/zonal.json";
import district from "../../data/2022/district.json";
import ca from "../../data/2022/ca.json";
import techTeam from "../../data/2022/tech.json";
import yipteam from "../../data/2022/yip.json";

export const Year2022 = () => {
  const communityTeam = { "Core Team": core, "Zonal Heads": zonal, "District Heads": district, "Campus Ambassadors": ca };

  return (
    <>
      <TeamSection title="YIP Organization Team" description="Here are the members of the crew and interns who helped to make the YIP a big success." members={yipteam} />
      <TeamSection title="Community Team" description="The Community Team was the one who brought the achievements at the most; it links industry and academia and forges connections between students, faculty, mentors, and others." membersWithSubTitles={communityTeam} />
      <TeamSection title="Tech Team" description="Here are the members of the crew who contributed to developing the website and bot, collected resources and gave suggestions about UX." members={techTeam} />
    </>
  )
}

export default Year2022;