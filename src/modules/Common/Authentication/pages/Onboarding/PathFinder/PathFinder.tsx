import { useState, useCallback } from "react";
import PathFinderComponent from "../../../components/PathFinder/PathFinderComponent";
import toast from "react-hot-toast";
import styles from "./PathFinder.module.css";
import software from "/assets/landing/coder2.webp";
import maker from "/assets/landing/maker.webp";
import management from "/assets/landing/manager.webp";
import creative from "/assets/landing/creative.webp";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import { IoCheckmarkSharp } from "react-icons/io5";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, onboardingRoutes } from "@/MuLearnServices/urls";
import { useNavigate } from "react-router-dom";
import mu from "/src/modules/Common/Authentication/assets/µLearn.png";
import { useUserStore } from "/src/ZustandProvider";

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

const ALL_PATHWAYS: Pathway[] = [
  { title: "Coder", value: "coder", img: software },
  { title: "Maker", value: "maker", img: maker },
  { title: "Manager", value: "manager", img: management },
  { title: "Creative", value: "creative", img: creative },
];

const INITIAL_ENDGOALS: Endgoal[] = [
  { title: "Job", value: "job", checked: false },
  { title: "Research & Development", value: "r&d", checked: false },
  { title: "Entrepreneurship", value: "entrepreneurship", checked: false },
  { title: "Gig Works", value: "gig_work", checked: false },
  { title: "Higher Education", value: "higher_education", checked: false },
  { title: "Social Impact", value: "social_impact", checked: false },
];

const PATHWAY_INFO = {
  coder: {
    title: "Coder",
    includes: [
      "Programming Languages",
      "Web Development",
      "Mobile App Development",
      "Software Engineering",
      "Database Management",
      "Cloud Computing",
      "DevOps & CI/CD",
      "System Architecture"
    ]
  },
  maker: {
    title: "Maker",
    includes: [
      "Hardware Design",
      "Electronics",
      "3D Printing",
      "Robotics",
      "IoT Development",
      "Prototyping",
      "CAD/CAM",
      "Product Design"
    ]
  },
  manager: {
    title: "Manager",
    includes: [
      "Project Management",
      "Team Leadership",
      "Business Strategy",
      "Resource Planning",
      "Risk Management",
      "Agile Methodologies",
      "Stakeholder Management",
      "Process Optimization"
    ]
  },
  creative: {
    title: "Creative",
    includes: [
      "UI/UX Design",
      "Graphic Design",
      "Digital Marketing",
      "Content Creation",
      "Brand Strategy",
      "Animation",
      "Video Production",
      "Social Media Management"
    ]
  }
};

export default function PathFinder() {
  const { setUserInfo } = useUserStore();
  const [pathways, setPathways] = useState<string[]>([]);
  const [stepTwo, setStepTwo] = useState(false);
  const [recommendedPathways, setRecommendedPathways] = useState<string[]>(["Maker"]);
  const [endgoals, setEndgoals] = useState<Endgoal[]>(INITIAL_ENDGOALS);
  const navigate = useNavigate();

  const onSubmit = (data: string[]) => {
    if (data && data.length > 0) {
      setPathways(data);
      setRecommendedPathways(data);
    } else {
      toast.error("Please try again");
    }
  };

  const handlePathwaySelect = (pathway: string) => {
    setRecommendedPathways((prev) =>
      prev.includes(pathway) ? prev.filter((p) => p !== pathway) : [...prev, pathway]
    );
  };

  const handleEndgoalChange = useCallback((value: string) => {
    setEndgoals((prev) => {
      const newEndgoals = prev.map((item) =>
        item.value === value ? { ...item, checked: !item.checked } : item
      );
      return newEndgoals;
    });
  }, []);

  const handleContinueToEndgoals = () => {
    if (recommendedPathways.length > 0) {
      setStepTwo(true);
    } else {
      toast.error("Please select at least one pathway");
    }
  };

  const handleSubmit = useCallback(async () => {
    const selectedPathways = recommendedPathways;
    const selectedEndgoals = endgoals.filter((e) => e.checked).map((e) => e.value);
    const data = {
      choosen_interests: selectedPathways,
      choosen_endgoals: selectedEndgoals,
      other_interests: [],
      other_endgoals: [],
    };

    try {
      if (selectedPathways.length > 0) {
        await privateGateway.post(`${onboardingRoutes.register}select-domains/`, { domains: selectedPathways });
      }
      if (selectedEndgoals.length > 0) {
        await privateGateway.post(`${onboardingRoutes.register}select-endgoals/`, { endgoals: selectedEndgoals });
      }
      privateGateway
      .get(dashboardRoutes.getInfo)
      .then(async (response: any) => {
          localStorage.setItem(
              "userInfo",
              JSON.stringify(response.data.response)
          );
          setUserInfo(response.data.response);
          toast.success("Pathways and endgoals saved successfully");
          navigate("/dashboard/home");
      }).catch((error) => {
          toast.error("Something went wrong, please try again.");
      });
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
          const isChecked = isInterest
            ? recommendedPathways.includes(item.value)
            : (item as Endgoal).checked;

          const className = `${styles.itemsCard} ${isChecked ? styles.checked : ""}`;

          return (
            <div
              key={item.value}
              className={className}
              onClick={() =>
                isInterest ? handlePathwaySelect(item.value) : handleEndgoalChange(item.value)
              }
            >
              {isInterest ? (
                <div className={styles.content}>
                  <img
                    className={styles.itemImage}
                    src={(item as Pathway).img}
                    alt={(item as Pathway).title}
                  />
                  <p className={styles.title}>{(item as Pathway).title}</p>
                </div>
              ) : (
                <div className={styles.content}>
                  <p className={styles.title}>{(item as Endgoal).title}</p>
                </div>
              )}
              {isChecked && <IoCheckmarkSharp className={styles.checkmark} />}
              {isInterest && (
                <>
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
                  </div>
                  <div className={styles.interestInfo}>
                    <h4>{PATHWAY_INFO[item.value as keyof typeof PATHWAY_INFO].title} includes:</h4>
                    <ul>
                      {PATHWAY_INFO[item.value as keyof typeof PATHWAY_INFO].includes.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    ),
    [recommendedPathways, endgoals, handlePathwaySelect, handleEndgoalChange]
  );

  if (pathways.length === 0) {
    return <PathFinderComponent onContinue={onSubmit} />;
  }

  return (
    <OnboardingTemplate>
      <div className={styles.popUp}>
        <div className={styles.box}>
          <img src={mu} alt="mulearn logo" className={styles.mu} />
          <h1>{stepTwo ? "What do you expect by MuLearning" : "Based on Your Questionnaire Responses"}</h1>
          <p className={styles.subText}>
            {stepTwo
              ? "Pick your goal."
              : "These pathways are recommended for you. Adjust or select additional areas as needed."}
          </p>
          {stepTwo ? renderItems(endgoals, false) : renderItems(ALL_PATHWAYS, true)} {/* Changed to endgoals */}
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