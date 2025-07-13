
import TeamSection from "../TeamSection";

// DATA
import pillars from "../../data/2023/pillars.json";
import pillarsQ1 from "../../data/2023/pillarsQ1.json";
import mulearnhq from "../../data/2023/mulearn.json";
import communityteam from "../../data/2023/community.json";
import associates from "../../data/2023/associates.json";
import enablerhq from "../../data/2023/enabler.json";

export const Year2023 = () => {
  return (
    <>
      <TeamSection title="µLearn HQ" description="The HQ members are the ones who are the backbone of the community. They are the ones who are responsible for the smooth functioning of different teams and the community as a whole." members={mulearnhq} />
      <TeamSection title="µLearn Associates" members={associates} />
      <TeamSection title="Enablers HQ" description="" members={enablerhq} />
      <TeamSection title="µLearn Pillars Q3" description="The Pillars of µLearn are the ones who support the µLearn Community. They are a group of students who assist the peers with their work and help the community thrive." members={pillars} />
      <TeamSection title="µLearn Pillars Q1" description="The Pillars of µLearn are the ones who support the µLearn Community. They are a group of students who assist the peers with their work and help the community thrive." members={pillarsQ1} />
      <TeamSection title="Community Contributors" members={communityteam} />
    </>
  );
}

export default Year2023;