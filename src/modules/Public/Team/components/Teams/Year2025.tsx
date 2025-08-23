
import TeamSection from "../TeamSection";

import associates from "../../data/2025/associates.json";
import PillersQ1 from "../../data/2025/pillersQ1.json";
export const Year2025 = () => {
  return (
    <>
      <TeamSection title="µLearn Associates" description="The Associates are the ones who are responsible for the smooth functioning of different teams and the community as a whole." members={associates} />
      <TeamSection title="µLearn Pillers Q1 2025" description="The Interns are the ones who are responsible for the smooth functioning of different teams and the community as a whole." members={PillersQ1} />
    </> 
  );
}

export default Year2025;