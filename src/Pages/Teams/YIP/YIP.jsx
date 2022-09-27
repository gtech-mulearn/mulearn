import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import styles from "./YIP.module.css";
import yipTeam from "./data/yip-team.js";
import MentorCard from "../../../Components/MentorCard/MentorCard";
import { useState } from "react";

const YIP = () => {
	const [filter, setfilter] = useState(0);

	const handleFilterChange = (e) => {
		setfilter(e.target.value);
	};

	const filters = [
		"",
		"Interest Group Management",
		"Delivery Management",
		"Data, documentation & Finance",
		"People Management",
		"Discord Mangement",
	];

	return (
		<>
			<Navbar />
			<div className={styles.firstviewmain_container}>
				<div className={styles.firstview_container}>
					<div className={styles.first_view}>
						<div className={styles.fv_texts}>
							<p className={styles.fv_heading}>
								<span>Young Innovators Programme</span> Organization Team
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
				<select
					className={`${styles.select} form-select form-select-lg mb-3`}
					value={filter}
					onChange={handleFilterChange}
				>
					<option value="0" selected>
						Filter by Domain
					</option>
					<option value="1">Interest Group Management</option>
					<option value="2">Delivery Management</option>
					<option value="3">Data, documentation & Finance</option>
					<option value="4">People Management</option>
					<option value="5">Discord Mangement</option>
				</select>
				<div className={styles.team_list}>
					{yipTeam.map((member) => {
						console.log(member.domain);
						console.log(filters[filter]);
						if (filter == 0 || member.domain === filters[filter]) {
							return (
								<MentorCard
									key={member.name}
									name={member.name}
									designation={member.designation}
									image={member.image}
									interest={member.domain ? member.domain : ""}
									linkedIn={member.linkedin}
								/>
							);
						}
					})}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default YIP;
