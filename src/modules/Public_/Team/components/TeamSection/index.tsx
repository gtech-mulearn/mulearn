import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TeamCard from "../TeamCard";
import styles from "./TeamSection.module.css";

type TeamSectionProps = {
  title: string;
  description?: string;
  members?: any[];
  membersWithSubTitles?: Record<string, any[]>;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const TeamSection = ({ title, description, members, membersWithSubTitles }: TeamSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (members && membersWithSubTitles) throw new Error("Only one of members or membersWithSubTitles should be provided at once.");
  if (!members && !membersWithSubTitles) throw new Error("Either members or membersWithSubTitles should be provided.");

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={styles.team_group}
    >
      <p className={styles.team_title}>{title}</p>
      {description && <p className={styles.team_desc}>{description}</p>}
      {membersWithSubTitles ? (
        Object.entries(membersWithSubTitles).map(([subTitle, subTitleMembers]) => {
          return (
            <>
              <p className={styles.sub_team_title}>{subTitle}</p>
              <div className={styles.members_list}>
                {subTitleMembers.map((member: any, index: number) => {
                  return (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                    >
                      <TeamCard
                        name={member.name ?? ""}
                        designation={member.position ?? ""}
                        image={member.image ?? ""}
                        linkedIn={member.linkedin ?? ""}
                        github={member.github ?? ""}
                        twitter={member.twitter ?? ""}
                        muid={member.muid ?? ""}
                        leadDesignation={member.lead ?? ""}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </>
          );
        })
      ) : (
        <div className={styles.members_list}>
          {members?.map((member: any, index: number) => {
            return (
              <motion.div
                key={index}
                variants={cardVariants}
              >
                <TeamCard
                  name={member.name ?? ""}
                  designation={member.position ?? ""}
                  image={member.image ?? ""}
                  linkedIn={member.linkedin ?? ""}
                  github={member.github ?? ""}
                  twitter={member.twitter ?? ""}
                  muid={member.muid ?? ""}
                  leadDesignation={member.lead ?? ""}
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
};

export default TeamSection;