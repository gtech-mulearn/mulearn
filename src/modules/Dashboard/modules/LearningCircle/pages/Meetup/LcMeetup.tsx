import { useParams } from "react-router-dom";
import LcHistory from "../LcDashboard/components/LcHistory";
import { useEffect, useState } from "react";
import { getMeetupInfo } from "../../services/LearningCircleAPIs";
import toast from "react-hot-toast";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

export default function LcMeetupIfo() {
    const params = useParams();
    const [data, setData] = useState<LcMeetupDetailInfo | undefined>();
    useEffect(() => {
        getMeetupInfo(setData, params.id ?? "")
            .then(res => {
                console.log(res);
            })
            .catch(() => {
                toast.error("Failed to fetch data");
            });
    }, []);
    return data ? (
        <LcHistory id={data.id} lc={data} setLc={setData} />
    ) : (
        <MuLoader />
    );
}
