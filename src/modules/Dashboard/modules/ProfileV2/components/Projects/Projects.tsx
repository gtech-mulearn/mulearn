import React from "react";
import styles from "./Projects.module.css";
import defaultimage from "../../assets/images/defaultProject.png";

type Project = {
    image: string;
    title: string;
};

const projects: Project[] = [
    { image: defaultimage, title: "Loan Planner - Fintech Mobile App" },
    { image: defaultimage, title: "Loan Planner - Fintech Mobile App" },
    { image: defaultimage, title: "Loan Planner - Fintech Mobile App" },
    { image: defaultimage, title: "Loan Planner - Fintech Mobile App" },
    { image: defaultimage, title: "Loan Planner - Fintech Mobile App" },
    { image: defaultimage, title: "Loan Planner - Fintech Mobile App" },
    { image: defaultimage, title: "Loan Planner - Fintech Mobile App" }
];

type Props = {};

export const Projects = (props: Props) => {
    return (
        <div className={styles.ProjectsWrapper}>
            {projects.map((project, index) => (
                <div className={styles.ProjectIndividual} key={index}>
                    <img src={project.image} alt={project.title} />
                    <p>{project.title}</p>
                </div>
            ))}
        </div>
    );
};
