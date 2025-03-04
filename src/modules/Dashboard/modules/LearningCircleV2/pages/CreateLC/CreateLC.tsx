import { Form, Formik } from "formik";
import styles from "./CreateLC.module.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import { HStack, Radio, RadioGroup, Switch, Tooltip } from "@chakra-ui/react";
import {
    createLearningCircle,
    getInterestGroups
} from "../../services/LearningCircleAPIs";
import WeekdayPicker from "../../components/WeekdayPicker/WeekdayPicker";
import MonthdayPicker from "../../components/MonthdayPicker/MonthdayPicker";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { BiInfoCircle } from "react-icons/bi";
import imageTop from "../../assets/images/LC2.webp";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LearningCircleCreate } from "../../services/LearningCircleInterface";

type interestGroupType = {
    value: string;
    label: string;
};

export default function CreateLC() {
    const [interestGroups, setInterestGroups] = useState<interestGroupType[]>();
    const [selectedWeekdays, setSelectedWeekdays] = useState<number>(-1);
    const [selectedMonthdays, setSelectedMonthdays] = useState<number>(-1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const data = await getInterestGroups();
            setInterestGroups(data);
        })();
    }, []);
    const initialValues = {
        ig: {
            label: "",
            value: ""
        },
        is_recurring: true,
        recurrence_type: "weekly",
        recurrence: 1
    };
    const onSubmit = (values: any) => {
        if (!values.ig || values.ig == null || values.ig.value === "") {
            toast.error("Please select interest group");
            return;
        }
        if (values.is_recurring) {
            if (values.recurrence_type === "weekly" && selectedWeekdays == -1) {
                toast.error("Please select weekday");
                return;
            } else if (
                values.recurrence_type === "monthly" &&
                selectedMonthdays == -1
            ) {
                toast.error("Please select monthday");
                return;
            }
        }
        const data: LearningCircleCreate = {
            ig: values.ig.value,
            is_recurring: values.is_recurring,
            recurrence_type: values.recurrence_type,
            recurrence:
                values.recurrence_type == "weekly"
                    ? selectedWeekdays + 1
                    : selectedMonthdays
        };
        setIsLoading(true);
        createLearningCircle(data).then(status => {
            setIsLoading(false);
            if (status) {
                navigate("/dashboard/learningcircle/create-meetup/" + status);
            }
        });
    };
    return (
        <div className={styles.createLCContainer}>
            <div className={styles.content}>
                <div className={styles.formContent}>
                    <Formik onSubmit={onSubmit} initialValues={initialValues}>
                        {formik => (
                            <Form className={styles.form}>
                                <h1>Create Learning Circle</h1>
                                <div className={styles.formGroup}>
                                    {/* <label htmlFor="ig">Select Interest Group</label> */}
                                    <Select
                                        className={styles.select}
                                        placeholder="Select Interest Group"
                                        name="ig"
                                        onChange={value =>
                                            formik.setFieldValue("ig", value)
                                        }
                                        options={interestGroups}
                                    />
                                </div>
                                <div
                                    className={
                                        styles.formGroup +
                                        " " +
                                        styles.horizontal
                                    }
                                >
                                    <label htmlFor="is_recurring">
                                        Is Recurring?{" "}
                                        <Tooltip
                                            label="Are you planning to hold regular meetups for this learning circle, perhaps weekly or monthly?"
                                            shouldWrapChildren
                                        >
                                            <BiInfoCircle />
                                        </Tooltip>
                                    </label>
                                    <Switch
                                        size="md"
                                        isChecked={formik.values.is_recurring}
                                        onChange={e => {
                                            formik.setFieldValue(
                                                "is_recurring",
                                                e.target.checked
                                            );
                                        }}
                                    />
                                </div>
                                {formik.values.is_recurring ? (
                                    <>
                                        <div
                                            className={
                                                styles.formGroup +
                                                " " +
                                                styles.horizontal + " " + styles.radioContainer
                                            }
                                        >
                                            <label htmlFor="recurrence_type">
                                                Recurrence Type
                                            </label>
                                            <RadioGroup
                                                onChange={value => {
                                                    formik.setFieldValue(
                                                        "recurrence_type",
                                                        value
                                                    );
                                                }}
                                                defaultValue="weekly"
                                            >
                                                <HStack gap="6">
                                                    <Radio value="weekly">
                                                        Weekly
                                                    </Radio>
                                                    <Radio value="monthly">
                                                        Monthly
                                                    </Radio>
                                                </HStack>
                                            </RadioGroup>
                                        </div>
                                        <div className={styles.formGroup}>
                                            {formik.values.recurrence_type ==
                                            "weekly" ? (
                                                <>
                                                    <label htmlFor="recurrence">
                                                        Every Week at
                                                    </label>

                                                    <WeekdayPicker
                                                        selectedWeekdays={
                                                            selectedWeekdays
                                                        }
                                                        setSelectedWeekdays={
                                                            setSelectedWeekdays
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <label htmlFor="recurrence">
                                                        Every Month at
                                                    </label>
                                                    <MonthdayPicker
                                                        selectedMonthdays={
                                                            selectedMonthdays
                                                        }
                                                        setSelectedMonthdays={
                                                            setSelectedMonthdays
                                                        }
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </>
                                ) : null}
                                <PowerfulButton
                                    className={styles.submitButton}
                                    type="submit"
                                    disabled={isLoading}
                                    isLoading={isLoading}
                                >
                                    Schedule Next Meetup
                                </PowerfulButton>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className={styles.headContent}>
                    <img src={imageTop} alt="image" loading="eager" />
                    <div className={styles.learningCircleLandingPageDesc}>
                        <h1>Learn, share, together</h1>
                        <b>
                            A fantastic way to spend a small amount of time
                            learning about new things with a group of people
                            with same interests!
                        </b>
                    </div>
                </div>
            </div>
        </div>
    );
}
