import { Tooltip } from "react-tooltip";
import { DateConverter } from "../../../utils/common";
import { HackList } from "../services/HackathonInterfaces";
import "react-tooltip/dist/react-tooltip.css";
import HackathonCardIconButtons from "./HackathonCardIconButtons";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate } from "react-router-dom";
import { CardFooter, CardHeader, Card, CardContent, CardDescription, CardTitle } from "@/MuLearnComponents/MuCard/Card";
import { Badge } from "@/MuLearnComponents/Badge";

type HackathonCardProps = {
    hackathon: HackList;
    setOwnData: UseStateFunc<HackList[]>;
    index: number;
    setData: UseStateFunc<HackList[]>;
    ownData: HackList[];
};
 
const HackathonCard: FC<HackathonCardProps> = ({
    hackathon,
    setOwnData,
    index,
    setData,
    ownData
}) => {
    const isDraft = hackathon.status === "Draft";

    const navigate = useNavigate();

    return ( 
        <Card>
            <CardHeader >
                <CardTitle style={{color: "var(--blue)"}}>
                    {hackathon.title}
                </CardTitle>
                <CardDescription>{hackathon.tagline}</CardDescription>

                <HackathonCardIconButtons
                    style={{
                        position: "absolute",
                        right: "var(--padding-card)",
                        top: "var(--padding-card)",
                    }}
                    hackathon={hackathon}
                    index={index}
                    ownData={ownData}
                    setOwnData={setOwnData}
                    setData={setData}
                />
                <Tooltip id="Icon" 
                    style={{
                        backgroundColor: "var(--blue)",
                        color: "var(--White)",
                        borderRadius: "10px",
                        transition: "opacity 0.5s ease-in-out"
                    }}
                />
            </CardHeader>

            <CardContent>
                <CardDescription style={{ fontSize:".5rem"}}> Application Dates: </CardDescription>
                <Badge variant="small"> {hackathon.application_start ? DateConverter(hackathon.application_start) : "No Date"} </Badge>
                &nbsp; &nbsp;
                <Badge variant="small"> {hackathon.application_ends ? DateConverter(hackathon.application_ends) : "No Date"} </Badge>
            </CardContent>

            <CardFooter>
                <div style={{display: "flex",gap:"8px", flexWrap: "wrap"}}>
                    {/* <Badge> {hackathon.type.charAt(0).toUpperCase() + hackathon.type.slice(1)} </Badge> */}
                    <Badge> {hackathon.event_start ? DateConverter(hackathon.event_start) : "No Date"} </Badge>
                </div>

            <PowerfulButton
                children={isDraft ? "Edit Draft" : "Apply Now"}
                variant={isDraft ? "draft" : "primary"}
                onClick={() => {
                    navigate(
                        isDraft
                            ? `/dashboard/hackathon/edit/${hackathon.id}`
                            : `/dashboard/hackathon/details/${hackathon.id}`
                    );
                }}
            />
            </CardFooter>
        </Card>
     );
}
 
export default HackathonCard;