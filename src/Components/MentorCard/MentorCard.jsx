import React from "react";
import styles from "./MentorCard.module.css";

import linkedin from "./assets/linkedin.png";
import placeholder from "./assets/placeholder.jpeg";

const MentorCard = ({
	name,
	designation,
	image,
	linkedIn,
	interest,
	source,
}) => {
	return (
		<div className={styles.mentor_card_container}>
			<div className={styles.mentor_card}>
				<div className={styles.box}>
					<img src={image || placeholder} alt="" className={styles.mentorimg} />
					<div className={styles.textdiv}>
						{interest && <p className={styles.mentor_interest}>{interest}</p>}

						{linkedIn != "" && (
							<a href={linkedIn} target="_blank" rel="noopener noreferrer">
								<img src={linkedin} alt="" className={styles.linkedinimg} />
							</a>
						)}
					</div>
				</div>

				<p className={styles.mentor_name}>{name}</p>

				<p className={styles.mentor_designation}>{designation}</p>
				<p className={styles.mentor_source}>{source}</p>
			</div>
		</div>
	);
};

export default MentorCard;
