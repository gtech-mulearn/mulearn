import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import styles from "./Community.module.css";
import coreTeam from "./data/core.js";
import campusAmbassadors from "./data/ca.js";
import districtHeads from "./data/district.js";
import zonalHeads from "./data/zonal.js";

import MentorCard from "../../../Components/MentorCard/MentorCard";

const Community = () => {
	return (
		<>
			<Navbar />
			<div className={styles.firstviewmain_container}>
				<div className={styles.firstview_container}>
					<div className={styles.first_view}>
						<div className={styles.fv_texts}>
							<p className={styles.fv_heading}>
								<span>Community</span> Team
							</p>
							<p className={styles.fv_tagline}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.team_collection}>
				<h2 className="mt-5">Core Team</h2>
				<div className={styles.team_list}>
					{coreTeam.map((member) => {
						return (
							<MentorCard
								key={member.name}
								name={member.name}
								designation={member.designation}
								image={member.image}
								interest={member.domain ? member.domain : ""}
								linkedIn={member.linkedin ? member.linkedin : ""}
							/>
						);
					})}
				</div>
				<h2 className="mt-5">Zonal Heads</h2>
				<div className={styles.team_list}>
					{zonalHeads.map((member) => {
						return (
							<MentorCard
								key={member.name}
								name={member.name}
								designation={member.designation}
								image={member.image}
								interest={member.domain ? member.domain : ""}
								linkedIn={member.linkedin ? member.linkedin : ""}
							/>
						);
					})}
				</div>
				<h2 className="mt-5">District Heads</h2>
				<div className={styles.team_list}>
					{districtHeads.map((member) => {
						return (
							<MentorCard
								key={member.name}
								name={member.name}
								designation={member.designation}
								image={member.image}
								interest={member.domain ? member.domain : ""}
								linkedIn={member.linkedin ? member.linkedin : ""}
							/>
						);
					})}
				</div>
				<h2 className="mt-5">Campus Ambassadors</h2>
				<div className={styles.team_list}>
					{campusAmbassadors.map((member) => {
						return (
							<MentorCard
								key={member.name}
								name={member.name}
								designation={member.designation}
								image={member.image}
								interest={member.domain ? member.domain : ""}
								linkedIn={member.linkedin ? member.linkedin : ""}
							/>
						);
					})}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Community;
