
import TeamSection from "../TeamSection";
import HQ from "../../data/2025/HQ.json";
import fellows from "../../data/2025/fellows.json";
import associates from "../../data/2025/associates.json";
import PillersQ1 from "../../data/2025/pillersQ1.json"; 
import PillersQ2 from "../../data/2025/pillarsQ2.json"; 
export const Year2025 = () => {
  return (
    <>
      <TeamSection title="µLearn HQ" description="The HQ team is responsible for the overall management and coordination of the µLearn community." members={HQ} />
      <TeamSection title="µLearn Fellows" description="The Fellows are the ones who are responsible for the smooth functioning of different teams and the community as a whole." members={fellows} />
      <TeamSection title="µLearn Associates" description="The Associates are the ones who are responsible for the smooth functioning of different teams and the community as a whole." members={associates} />
      <TeamSection title="µLearn Pillars Q2 2025" description="The Interns are the ones who are responsible for the smooth functioning of different teams and the community as a whole." members={PillersQ2} />
      <TeamSection title="µLearn Pillars Q1 2025" description="The Interns are the ones who are responsible for the smooth functioning of different teams and the community as a whole." members={PillersQ1} />
    </> 
  );
}

export default Year2025;