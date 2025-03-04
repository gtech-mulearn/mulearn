import CampusDetails from './CampusPage-demo';
import styles from './CampusForum.module.css';
import { CampusDataSet } from '../../../CampusStudentList/services/apis';

interface Campus {
  id: string;
  college_name: string;
  campus_code: string;
  campus_zone: string;
  total_karma: string;
  grade: 'A' | 'B' | 'C' | 'N/A';
  lead: { campus_lead: string; enabler: string };
}

interface AboutSectionProps {
  campusData: Campus;
}

const AboutSection: React.FC<AboutSectionProps> = ({ campusData }) => (
  <div>
      {/* <CampusDetails campusData={campusData} /> */}
  </div>
);

export default AboutSection;