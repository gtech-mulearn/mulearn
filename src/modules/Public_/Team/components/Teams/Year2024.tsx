
import TeamSection from "../TeamSection";

// DATA
import associates from "../../data/2024/associates.json";
import interns from "../../data/2024/interns.json";

export const Year2024 = () => {
  return (
    <>
      <TeamSection title="µLearn Associates" description="The Associates are the ones who are responsible for the smooth functioning of different teams and the community as a whole." members={associates} />
      <TeamSection title="µLearn Interns" description="The Interns are the ones who are responsible for the smooth functioning of different teams and the community as a whole." members={interns} />
    </>
  );
}

export default Year2024;