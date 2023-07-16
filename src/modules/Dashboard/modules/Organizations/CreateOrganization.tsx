import { useNavigate } from 'react-router-dom';
import './Organizations.scss';
import { useLocation } from 'react-router-dom';
import FormData from './FormData';
import styles from "../../../../components/MuComponents/FormikComponents/FormComponents.module.css";

function CreateOrganization() {
  const navigate = useNavigate();
  const location = useLocation();

  const { activeItem } = location.state;

  const RenderFormData = ({ activeItem }: any) => {
    switch (activeItem) {
      case 'Colleges':
        return (
          <FormData
            isCreate={true}
            activeItem="College"
          />
        );
      case 'Companies':
        return (
          <FormData
            isCreate={true}
            activeItem="Company"
          />
        );
      case 'Communities':
        return (
          <FormData
            isCreate={true}
            activeItem="Community"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="popup_container">
    <div className={styles.container}>
      <div className="popup_top_container">
        <h1 className="popup_title">Add {activeItem}</h1>
        <i
          className="fi fi-sr-cross"
          onClick={() => {
            navigate('/organizations');
          }}
        ></i>
      </div>
      <p>Kindly review the provided details and make sure that they are correct.
        Once you have verified the information, please click the <span>Confirm</span>
        button to proceed for further process.
      </p>
      <RenderFormData activeItem={activeItem} />
    </div>
    </div>
  );
}

export default CreateOrganization;
