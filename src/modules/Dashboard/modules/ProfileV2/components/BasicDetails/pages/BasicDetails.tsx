import { useEffect, useState } from "react";
import styles from "./BasicDetails.module.css";
import HeatmapComponent from "../../Heatmap/HeatmapComponent";
import { useToast } from "@chakra-ui/react";
import { editIgDetails, getAllIg, getIgDetails } from "../services/api";
import { useParams } from "react-router-dom";
import { PlanetGreen, PlanetOrange, PlanetRed } from "../../../assets/svg/Planets";
type Props = {
    userProfile: any;
    userLog: any;
};
const BasicDetails = (props: Props) => {
    const toast = useToast();
    const [editIg, setEditIg] = useState(false);
    const [allIg, setAllIg] = useState<any>([]);

    const [ig, setIg] = useState<any>(props.userProfile.interest_groups);
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        // getIgDetails(toast, setIg);
        getAllIg(setAllIg);
    }, []);
    const ig_sorted = ig.sort((a: any, b: any) => {
        return a.name > b.name ? 1 : -1;
    });
    return (
        <>
            <div className={styles.card_container}>
                <div className={styles.card}>
                    UX/UI Design
                    <p>85%</p>
                    <div className={styles.planet}>
                        <PlanetGreen />
                    </div>
                </div>
                <div className={styles.card}>
                    UX/UI Design
                    <p>85%</p>
                    <div className={styles.planet}>
                        <PlanetOrange />
                    </div>
                </div>
                <div className={styles.card}>
                    UX/UI Design
                    <p>85%</p>
                    <div className={styles.planet}>
                        <PlanetRed />
                    </div>
                </div>
            </div>

            <div className={styles.heatmap}>
                <HeatmapComponent
                    data={props.userLog}
                    year={props.userProfile.joined?.slice(0, 4)}
                />
            </div>
        </>
    );
};

export default BasicDetails;
