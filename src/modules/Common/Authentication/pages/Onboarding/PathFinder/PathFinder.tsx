import { useState, useCallback } from "react";
import PathFinderComponent from "../../../components/PathFinder/PathFinderComponent";
import toast from "react-hot-toast";
import styles from "./PathFinder.module.css";
import software from "../../../assets/interests/software.svg";
import maker from "../../../assets/interests/makers.svg";
import management from "../../../assets/interests/management.svg";
import creative from "../../../assets/interests/creative.svg";
// import others from "../../../assets/interests/others.svg";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import { IoCheckmarkSharp } from "react-icons/io5";
// import { TagsInput } from "react-tag-input-component"; // Ensure this is installed
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { onboardingRoutes } from "@/MuLearnServices/urls";
import { useNavigate } from "react-router-dom";

// Define types for interests and endgoals
type Pathway = {
  title: string;
  value: string;
  img: string;
};

type Endgoal = {
  title: string;
  value: string;
  checked: boolean;
};

// const ALL_PATHWAYS: Pathway[] = [
//   { title: "Coder", value: "coder", img: software },
//   { title: "Hardware", value: "hardware", img: maker },
//   { title: "Manager", value: "manager", img: management },
//   { title: "Creative", value: "creative", img: creative },
//   // { title: "Others", value: "others", img: others },
// ];
const ALL_PATHWAYS: Pathway[] = [
  { title: "Coder", value: "coder", img: software },
  { title: "Hardware", value: "hardware", img: maker },
  { title: "Manager", value: "manager", img: management },
  { title: "Creative", value: "creative", img: creative },
];

// const INITIAL_ENDGOALS: Endgoal[] = [
//   { title: "Job", value: "job", checked: false },
//   { title: "Research & Development", value: "r&d", checked: false },
//   { title: "Entrepreneurship", value: "entrepreneurship", checked: false },
//   { title: "Gig Works", value: "gig_work", checked: false },
//   { title: "Higher Education", value: "higher_education", checked: false },
//   // { title: "Others", value: "others", checked: false },
// ];
const INITIAL_ENDGOALS: Endgoal[] = [
  { title: "Job", value: "job", checked: false },
  { title: "Research & Development", value: "r&d", checked: false },
  { title: "Entrepreneurship", value: "entrepreneurship", checked: false },
  { title: "Gig Works", value: "gig_work", checked: false },
  { title: "Higher Education", value: "higher_education", checked: false },
];

export default function PathFinder() {
  const [pathways, setPathways] = useState<string[]>([]);
  const [stepTwo, setStepTwo] = useState(false);
  const [recommendedPathways, setRecommendedPathways] = useState<string[]>(["Hardware"]); // Default recommended pathways
  const [endgoals, setEndgoals] = useState<Endgoal[]>(INITIAL_ENDGOALS);
  // const [otherEndgoal, setOtherEndgoal] = useState<string[]>([]);
  const navigate = useNavigate();

  const onSubmit = (data: string[]) => {
    if (data && data.length > 0) {
      setPathways(data); // This will set the recommended pathways from the questionnaire
      setRecommendedPathways(data); // Initialize recommended pathways with the questionnaire results
    } else {
      toast.error("Please try again");
    }
  };

  const handlePathwaySelect = (pathway: string) => {
    setRecommendedPathways((prev) => {
      if (prev.includes(pathway)) {
        return prev.filter((p) => p !== pathway);
      } else {
        return [...prev, pathway];
      }
    });
  };

  const handleEndgoalChange = useCallback((value: string) => {
    setEndgoals((prev) =>
      prev.map((item) =>
        item.value === value ? { ...item, checked: !item.checked } : item
      )
    );
    // if (value === "others" && !endgoals.find((item) => item.value === "others" && item.checked)) {
    //   setOtherEndgoal([]);
    // }
  }, [endgoals]);

  const handleContinueToEndgoals = () => {
    if (recommendedPathways.length > 0) {
      setStepTwo(true);
    } else {
      toast.error("Please select at least one pathway");
    }
  };

  const handleSubmit = useCallback(async () => {
    const selectedPathways = recommendedPathways; // Equivalent to choosen_interests
    const selectedEndgoals = endgoals.filter((e) => e.checked).map((e) => e.value);
    const data = {
      choosen_interests: selectedPathways,
      choosen_endgoals: selectedEndgoals,
      other_interests: [], // Send empty array to keep API working
      other_endgoals: []  // Send empty array to keep API working
    };

    try {
      if (selectedPathways.length > 0) {
        await privateGateway.post(`${onboardingRoutes.register}select-domains/`, { domains: selectedPathways });
      }
      if (selectedEndgoals.length > 0) {
        await privateGateway.post(`${onboardingRoutes.register}select-endgoals/`, { endgoals: selectedEndgoals });
      }
      toast.success("Pathways and endgoals saved successfully");
      navigate("/dashboard/home"); 
    } catch (err: any) {
      console.error("Failed to submit pathways and endgoals:", err);
      toast.error(err.response?.data?.message?.general[0] || "Unexpected Error occurred");
    }
  }, [recommendedPathways, endgoals, navigate]);

  const isEndgoalSelected = endgoals.some((endgoal) => endgoal.checked);

  const renderItems = useCallback(
    (items: Pathway[] | Endgoal[], isInterest: boolean) => (
      <div className={styles.itemsContainer}>
        {items.map((item) => {
          // const isOthers = item.value === "others";
          const isChecked = isInterest ? recommendedPathways.includes(item.value) : (item as Endgoal).checked;
          // const otherItems = isInterest ? [] : otherEndgoal;
          // const setOtherItems = isInterest ? () => {} : setOtherEndgoal;

          return (
            <div
              key={item.value}
              className={`${styles.itemsCard} ${isChecked ? styles.checked : ""}`}
              onClick={() => (isInterest ? handlePathwaySelect(item.value) : handleEndgoalChange(item.value))}
            >
              {isInterest ? (
                <div className={styles.content}>
                  <img className={styles.itemImage} src={(item as Pathway).img} alt={(item as Pathway).title} />
                  <p className={styles.title}>{(item as Pathway).title}</p>
                </div>
              ) : (
                <div className={styles.content}> 
                  <p className={styles.title}>{(item as Endgoal).title}</p>
                </div>
              )}
              {isChecked && (
                <IoCheckmarkSharp className={styles.checkmark} />
              )}
              {isInterest && (
                <div className={styles.infoButton} onClick={(e) => e.stopPropagation()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                  </svg>
                  <div className={styles.interestInfo}>
                    <h4>This category includes:</h4>
                    <ul>
                      <li>Programming</li>
                      <li>Web Development</li>
                      <li>App Development</li>
                    </ul>
                  </div>
                </div>
              )}
              {/* {isOthers && isChecked && !isInterest && (
                <div onClick={(e) => e.stopPropagation()}>
                  <TagsInput
                    value={otherItems}
                    onBlur={(e: any) => {
                      if (e.target.value.length > 0) {
                        setOtherItems([...otherItems, e.target.value]);
                        e.target.value = "";
                      }
                    }}
                    onChange={setOtherItems}
                    name="other_endgoals"
                    placeHolder="Specify your endgoal"
                    separators={[","]}
                  />
                </div>
              )} */}
            </div>
          );
        })}
      </div>
    ),
    [handlePathwaySelect, handleEndgoalChange, recommendedPathways, endgoals]
  );

  if (pathways.length === 0) {
    return <PathFinderComponent onContinue={onSubmit} />;
  }

  return (
    <OnboardingTemplate>
      <div className={styles.popUp}>
        <div className={styles.box}>
          <img src="/src/modules/Common/Authentication/assets/µLearn.webp" alt="µLearn" /> 
          <h1>{stepTwo ? "What do you expect by MuLearning" : "Based on Your Questionnaire Responses"}</h1>
          <p className={styles.subText}>
            {stepTwo ? "Pick your goal." : "These pathways are recommended for you. Adjust or select additional areas as needed."}
          </p>
          {stepTwo ? renderItems(INITIAL_ENDGOALS, false) : renderItems(ALL_PATHWAYS, true)}
          {(stepTwo ? isEndgoalSelected : recommendedPathways.length > 0) && (
            <div className={styles.actionButtons}>
              {!stepTwo && (
                <button
                  className={styles.tryAgainButton}
                  onClick={() => {
                    setPathways([]);
                    setRecommendedPathways([]);
                  }}
                >
                  Try again
                </button>
              )}
              <button
                className={styles.continueButton}
                onClick={stepTwo ? handleSubmit : handleContinueToEndgoals}
              >
                {stepTwo ? "Submit" : "Continue"}
              </button>
            </div>
          )}
        </div>
      </div>
    </OnboardingTemplate>
  );
}