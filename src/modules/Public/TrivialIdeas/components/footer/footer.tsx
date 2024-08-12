import logo from '../../assets/µLearn.svg';
import styles from './footer.module.css';
import { FaDiscord } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";



const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          {/* <h2 className={styles.logo}>µLearn</h2> */}
          <img className={styles.logo} src={logo} alt="" />
          <p className={styles.description}>
            A community that focuses on learning, upskilling and networking, while striving for creativity and innovation. TLDR, it's a place for every passionate learner out there!
          </p>
          <div className={styles.socialMedia}>
            <a href="" target="_blank" rel="noreferrer">
              <FaDiscord size={20} />
            </a>
            <a href="" target="_blank" rel="noreferrer">
              <FaYoutube size={20} />
            </a>
            <a href="" target="_blank" rel="noreferrer">
              <FaXTwitter size={20} />
            </a>
            <a href="" target="_blank" rel="noreferrer">
              <FaFacebookSquare size={20} />
            </a>
            <a href="" target="_blank" rel="noreferrer">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
        <div className={styles.section}>
          <h3>Documentation</h3>
          <ul>
            <li><a href="#">Getting Started</a></li>
            <li><a href="#">API Reference</a></li>
            <li><a href="#">Integrations</a></li>
            <li><a href="#">Examples</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3>Resources</h3>
          <ul>
            <li><a href="#">Changelog</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Status</a></li>
            <li><a href="#">Webhooks</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3>Contact</h3>
          <ul>
            <li>Abin outreach - 99999 99999</li>
            <li>Abin outreach - 99999 99999</li>
            <li>Copyright © 2023. All Rights Reserved.</li>
            <li>µLearn Foundation.</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
