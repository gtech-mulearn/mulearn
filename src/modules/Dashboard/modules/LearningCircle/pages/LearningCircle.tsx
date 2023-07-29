import { useEffect, useState } from "react";
import styles from "./LearningCircle.module.css";
import { approveLcUser, getLcDetails, setLCMeetTime } from "../services/LearningCircleAPIs";
import { useNavigate, useParams } from "react-router-dom";
import pic from "../../Profile/assets/images/dpm.jpg";
import { LcDetail } from "../services/LearningCircleInterface";
import { Form, Formik } from "formik";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";

type Props = {};

const LearningCircle = (props: Props) => {
    const [lc, setLc] = useState<LcDetail>();
    const { id } = useParams();
	const navigate = useNavigate()

    useEffect(() => {
        getLcDetails(setLc, id);
    }, []);

    return (
        <>
            <div className={styles.LearningCircleDetailsContent}>
                <div className={styles.CreatedCircle}>
                    <div className={styles.CircleName}>
                        <h1>{lc?.name}</h1>
                        <b>
                            {lc?.college} <br /> Code:
                            {lc?.circle_code}
                        </b>
                    </div>
                    <div className={styles.CircleRank}>
                        <div>
                            <b>Rank</b>
                            <h1>{lc?.rank}</h1>
                            <b className={styles.points}>
                                {lc?.total_karma} Karma
                            </b>
                        </div>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                </div>

                <div className={styles.BoxContent}>
                    <div className={styles.LeftBox}>
                        {/* <div className={styles.EventOn}>
                            <div className={styles.MeetingOn}>
                                <div>
                                    <b>Next Meeting on</b>
                                    <div>
                                        <h1>22 June 2023</h1>
                                        <b>Sunday</b>
                                    </div>
                                </div>
                                <i className="fa-solid fa-pencil"></i>
                            </div>
                            <div className={styles.MeetingBtn}>
                                <b>
                                    venue: multiplication hall <br /> time:
                                    10:00 am
                                </b>
                                <button className={styles.BtnBtn}>Done</button>
                            </div>
                        </div> */}

                        <div className={styles.EventOn}>
                            <div className={styles.ScheduleOn}>
                                <b>Schedule meeting</b>
                                <p>Enter details to schedule your weekly meeting</p>
                            </div>
                            <div className={styles.InputSchedule}>
                                <div>
                                    <input type="time" placeholder="meeting time" />
                                    <input type="text" placeholder="meeting venue" />
                                </div>
                                <div className={styles.weeks}>
                                    <p>meeting days</p>
                                  <p className={styles.Lcweek}>
                                    <div>
                                        <input type="checkbox" id='S'/><label htmlFor='S'>S</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id='M'/><label htmlFor='M'>M</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id='T'/><label htmlFor='T'>T</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id='W'/><label htmlFor='W'>W</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id='Th'/><label htmlFor='Th'>T</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id='F'/><label htmlFor='F'>F</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id='Sa'/><label htmlFor='Sa'>Sa</label>
                                    </div>
                                  </p>
                                    
                                </div>
                                {/* <input type="text" placeholder="meeting venue" /> */}
                            </div>
                            
                            <button className={styles.BtnBtn}>Schedule</button>
                        </div>


                           <div className={styles.EventOn}>
                                <div className={styles.LcNotedEvent}>
                                    <input type="text" placeholder='input' />
                                    <button className={styles.BtnBtn}>Submit</button>
                                </div>
                            </div>

                        <div className={styles.PendingApp}>
                            <b className={styles.PendingTitle}>Pending approvals</b>
                            <div className={styles.PendingList}>
                                <div className={styles.PendingMembers}>
                                    <span>
                                        <img
                                            src="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png"
                                            alt=""
                                        />
                                        <b>Sarah Philip</b>
                                    </span>
                                    <div className={styles.buttons}>
                                        <button className={styles.BtnBtn}>
                                            Done
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={{
                                            meet_time: "",
                                            meet_place: "",
                                            day: ""
                                        }}
                                        onSubmit={(values, { resetForm }) => {
                                            setLCMeetTime(
                                                values.meet_time,
                                                values.meet_place,
                                                values.day,
                                                id
                                            );
                                            console.log(values);
                                            resetForm();
                                        }}
                                    >
                                        {({
                                            values,
                                            handleChange,
                                            setFieldValue,
                                            errors
                                        }) => (
                                            <Form>
                                                <div
                                                    className={
                                                        styles.LearningCircleCreateForm
                                                    }
                                                >
                                                    <FormikTextInput
                                                        type="text"
                                                        name="meet_time"
                                                        placeholder="Meeting Time"
                                                    />
                                                    <FormikTextInput
                                                        type="text"
                                                        name="meet_place"
                                                        placeholder="Meeting Place"
                                                    />
                                                    <FormikTextInput
                                                        type="text"
                                                        name="day"
                                                        placeholder="Meeting Day"
                                                    />
                                                </div>
                                                <button type="submit">
                                                    Create
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            )}
                        </div>

                        {lc?.pending_members &&
                        lc.pending_members.length > 0 ? (
                            <div className={styles.PendingApp}>
                                <b className={styles.PendingTitle}>
                                    Pending approvals
                                </b>

                                <div className={styles.PendingList}>
                                    {lc?.pending_members &&
                                        lc.pending_members.map(
                                            (member, index) => (
                                                <div
                                                    className={
                                                        styles.PendingMembers
                                                    }
                                                >
                                                    <span>
                                                        <img
                                                            src={
                                                                member.profile_pic
                                                                    ? `https://dev.mulearn.org/${member?.profile_pic}`
                                                                    : pic
                                                            }
                                                            alt="Profile picture"
                                                        />
                                                        <b>{member.username}</b>
                                                    </span>
                                                    <div
                                                        className={
                                                            styles.buttons
                                                        }
                                                    >
                                                        <button
                                                            className={
                                                                styles.BtnBtn
                                                            }
                                                            onClick={() => {
                                                                approveLcUser(
                                                                    id,
                                                                    member.id,
                                                                    true
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        navigate(
                                                                            `/dashboard/learning-circle/details/${id}`
                                                                        );
                                                                    },
                                                                    2000
                                                                );
                                                            }}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className={
                                                                styles.BtnClr
                                                            }
                                                            onClick={() => {
                                                                approveLcUser(
                                                                    id,
                                                                    member.id,
                                                                    false
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        navigate(
                                                                            `/dashboard/learning-circle/details/${id}`
                                                                        );
                                                                    },
                                                                    2000
                                                                );
                                                            }}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className={styles.RightBox}>
                        {/* TODO: Will implement in next iteration */}

                        {/* <div className={styles.Streak}>
                            <img
                                src="https://i.ibb.co/BNMSdTH/flame.png"
                                alt=""
                            />
                            <div>
                                <b className={styles.StreakCount}>87</b>
                                <b>STREAK</b>
                            </div>
                        </div> */}

                        <div className={styles.Members}>
                            <span className={styles.MemberTitle}>
                                Members
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </span>
                            <div className={styles.MemberList}>
                                {lc?.members &&
                                    lc.members.map((member, index) => (
                                        <div className={styles.MemberName}>
                                            <img
                                                src={
                                                    member.profile_pic
                                                        ? `https://dev.mulearn.org/${member?.profile_pic}`
                                                        : pic
                                                }
                                                alt="Profile Picture"
                                            />
                                            <div>
                                                <p>{member.username}</p>
                                                <span>
                                                    <img
                                                        src="https://i.ibb.co/Dbhv9rS/karma.png"
                                                        alt="karma"
                                                    />
                                                    {member.karma}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LearningCircle;
