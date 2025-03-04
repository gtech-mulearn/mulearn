import styles from './CommunityForum.module.css';

const AboutSection = () => {
  return (
    <div className={styles.sectionContent}>
      <div className='w-full'>
        <h2>About</h2>
        <p>
          The community forum is a place where you can connect with other members of the community, ask questions, and share your knowledge.
        </p>
        <p>
          You can also find information about upcoming events, workshops, and meetups hosted by the community.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
