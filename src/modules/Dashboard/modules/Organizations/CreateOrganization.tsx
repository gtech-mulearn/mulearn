import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import FormData from "./FormData";
import orgStyles from "./Organizations.module.css";

function CreateOrganization() {
    const navigate = useNavigate();
    const location = useLocation();

    const { activeItem } = location.state;

    const RenderFormData = ({ activeItem }: any) => {
        console.log(activeItem);
        switch (activeItem) {
            case "College":
                return <FormData isCreate={true} activeItem="College" />;
            case "Company":
                return <FormData isCreate={true} activeItem="Company" />;
            case "Community":
                return <FormData isCreate={true} activeItem="Community" />;
            default:
                return null;
        }
    };

    return (
        <div className={orgStyles.popupContainer}>
            <div className={styles.container}>
                <div className={orgStyles.popupTopContainer}>
                    <h1 className={orgStyles.popupTitle}>Add {activeItem}</h1>
                    <i
                        className="fi fi-sr-cross"
                        onClick={() => {
                            navigate("/dashboard/organizations");
                        }}
                    ></i>
                </div>
                <p>
                    Kindly review the provided details and make sure that they
                    are correct. Once you have verified the information, please
                    click the <span>Confirm</span>
                    button to proceed for further process.
                </p>
                <RenderFormData activeItem={activeItem} />
            </div>
        </div>
    );
}

export default CreateOrganization;
