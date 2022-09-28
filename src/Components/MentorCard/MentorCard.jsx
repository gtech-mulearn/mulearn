import React from "react";
import styles from "./MentorCard.module.css";

import linkedin from "./assets/linkedin.png";

const MentorCard = ({
	name,
	designation,
	image,
	linkedIn,
	interest,
	source,
	clink,
}) => {
	return (
		<div className={styles.mentor_card_container}>
			<div className={styles.mentor_card}>
				<div className={styles.box}>
					{image && <img src={image} alt="" className={styles.mentorimg} />}
					<div className={styles.textdiv}>
						{interest && <p className={styles.mentor_interest}>{interest}</p>}

						{linkedIn && linkedIn != "" && (
							<a href={linkedIn} target="_blank" rel="noopener noreferrer">
								<img src={linkedin} alt="" className={styles.linkedinimg} />
							</a>
						)}
					</div>
				</div>

				<p className={styles.mentor_name}>{name}</p>

				<p className={styles.mentor_designation}>{designation}</p>
				<p className={styles.mentor_source}>{source}</p>

				{clink && <a href={clink} target="_blank" rel="noopener noreferrer"> <button className={styles.comingsoon}>Checkout Course</button></a>}
				
			</div>
		</div>
	);
};

export default MentorCard;
