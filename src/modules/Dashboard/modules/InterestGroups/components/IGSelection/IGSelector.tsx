import { useEffect, useState } from "react";
import styles from "./IgSelector.module.css";
import toast from "react-hot-toast";
import { editIgDetails, getAllIg } from "../../../Profile/components/BasicDetails/services/api";
import { useUserStore } from "/src/ZustandProvider";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";

type Props = {
  userProfile: IGUserInfo;
  igs: InterestGroup[];
  userLog: any;
  isProfilePage: Boolean;
  selectedIg: InterestGroup;
  setSelectedIg: React.Dispatch<React.SetStateAction<InterestGroup>>;
  setUserProfile: (profile: any) => void;
};

const IGSelector = (props: Props) => {
  const [editIg, setEditIg] = useState(false);
  const [allIg, setAllIg] = useState<InterestGroup[]>([]);
  const [ig, setIg] = useState<InterestGroup[]>(props.userProfile.interest_groups || []);

  useEffect(() => {
    setIg(props.igs);
    if (props.igs.length > 0) {
      props.setSelectedIg(props.igs[0]);
    }
  }, [props.igs]);

  useEffect(() => {
    getAllIg(setAllIg);
  }, []);

  const ig_sorted = ig.sort((a: any, b: any) => {
    return a.name > b.name ? 1 : -1;
  });

  const handleIgUpdate = async (newIgIds: string[]) => {
    try {
      await editIgDetails(newIgIds);
      const response = await privateGateway.get(dashboardRoutes.getUserProfile);
      props.setUserProfile(response.data.response);
      setIg(response.data.response.interest_groups || []);
      toast.success("Interest groups updated successfully");
    } catch (error) {
      console.error("Failed to update interest groups:", error);
      toast.error("Failed to update interest groups");
    }
  };

  return (
    <>
      <div className={styles.interestGrp}>
        <div className={styles.top_sec}>
          <b>Your Interest Groups</b>
          <div className={styles.close_and_submit_btn_div}>
            {(Number(props.userProfile.level.slice(3, 4)) >= 4) && !editIg && (
              <p onClick={() => setEditIg(true)} className={styles.edit_profile_btn} tabIndex={0}>
                <i className="fi fi-rr-pencil"></i>
              </p>
            )}
            {editIg && (
              <p
                onClick={() => {
                  setEditIg(false);
                  setIg(props.userProfile.interest_groups); // Reset to original state on cancel
                }}
                className={styles.edit_profile_btn}
                tabIndex={0}
              >
                <i className="fi fi-rr-circle-xmark"></i>
              </p>
            )}
            {editIg && (
              <p
                onClick={() => {
                  setEditIg(false);
                  const newIgIds = ig_sorted.map((ig: any) => ig.id);
                  handleIgUpdate(newIgIds); // API call only happens here
                }}
                className={styles.edit_profile_btn}
                tabIndex={0}
              >
                <i className="fi fi-br-check"></i>
              </p>
            )}
          </div>
        </div>
        <div className={styles.igs_container}>
          {props.userProfile.interest_groups.length !== 0 ? (
            ig.map((data: any, i: number) => (
              <div
                style={Object.assign(
                  {},
                  editIg ? { transform: "scale(0.955)" } : {},
                  props.selectedIg.id === data.id ? { backgroundColor: "#456ff6", color: "white" } : {}
                )}
                className={styles.igs}
                key={i}
                onClick={() => props.setSelectedIg(data)} // Only sets selected IG, no API call
              >
                {editIg && (
                  <i
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent onClick
                      if (ig.length > 1) {
                        setIg(ig.filter((ig: any) => ig.name !== data.name));
                      } else {
                        toast.error("You must have at least one interest group");
                      }
                    }}
                    className="fi fi-sr-circle-xmark"
                  ></i>
                )}
                {data.name}
                <p>
                  {data.karma !== null
                    ? data.karma > 1000
                      ? (data.karma / 1000).toPrecision(2) + "K"
                      : data.karma
                        ? data.karma
                        : "0"
                    : "0"}
                </p>
              </div>
            ))
          ) : (
            <p>No Interest Groups Selected. You need to reach Level 4 to Select</p>
          )}
          {editIg && <hr />}
        </div>
        {editIg && (
          <div className={styles.igs_container}>
            {allIg
              .filter((data: any) => !ig.some((ig: any) => ig.name === data.name))
              .map((data: any, i: number) => (
                <div key={i} className={styles.igs}>
                  <i
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering any parent onClick
                      if (ig.length < 3) {
                        const newIg = [...ig, data];
                        setIg(newIg); // Only update local state, no API call here
                      } else {
                        toast.error("Maximum 3 interest groups allowed");
                      }
                    }}
                    className="fi fi-sr-add"
                  ></i>
                  {data.name}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default IGSelector;