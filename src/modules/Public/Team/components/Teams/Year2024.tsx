
import TeamSection from "../TeamSection";

// DATA
import associates from "../../data/2024/associates.json";
import interns from "../../data/2024/interns.json";
import PillersQ1 from "../../data/2024/pillersQ1.json";


export const Year2024 = () => {
  return (
    <>
      <TeamSection title="µLearn Associates" description="The Associates are the ones who are responsible for the smooth functioning of different teams and the community as a whole." members={associates} />
      <TeamSection title="µLearn Interns 2024" description="The Interns are the ones who are responsible for the smooth functioning of different teams and the community as a whole." members={interns} />
      <TeamSection title="µLearn Pillers Q1 2024" description="The Interns are the ones who are responsible for the smooth functioning of different teams and the community as a whole." members={PillersQ1} />
    </>
  );
}

export default Year2024;