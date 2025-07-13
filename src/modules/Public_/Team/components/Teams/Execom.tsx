
import TeamSection from "../TeamSection";

// DATA
import execom from "../../data/muteam/execom.json";

export const Execom = () => {
  return (
    <>
      <TeamSection title="Executive Committee" description="The Executive Members are those who serve as the community's skeleton and propel it forward from the rear." members={execom} />
    </>
  );
}

export default Execom;