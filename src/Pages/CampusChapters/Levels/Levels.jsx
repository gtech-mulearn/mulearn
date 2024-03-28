import styles from "./Levels.module.css";

const Levels = () => {
  return (
    <>
      {/*Updated levels start*/}
      <div className={styles.levels_view_container}>
        <div className={styles.levels_view}>
          <div className={styles.levels_texts}>
            <p className={styles.levels_heading}>
              What is a <span>µLearn</span> Chaptership?
            </p>
            <p className={styles.levels_tagline}>
              At µLearn, the concept of learning comes with a motivation and
              that at µLearn is the Gamification of learning. At µLearn a
              Chaptership is a recognition, acknowledgement given to a Campus
              when they unlock the level 5 of Activities .This Acknowledgement
              unlocks many benefits for these campuses. Campuses with the
              Chaptership title gets access to exclusive perks from the parent,
              The µLearn Foundation.
            </p>
            {/* <Link to="findcampus">
                <button className={styles.leadcampus}>Find Campus</button>
              </Link> */}
          </div>
          <div className={styles.levels_image}>
            <img
              src="/assets/campuscommunity/chaptership.svg"
              alt=""
              className={styles.levels_img}
            />
          </div>
        </div>
      </div>
      <div className={styles.levels_heading}>
        <p className={styles.levels_headingtext}>
          Road to <span> Chaptership </span>
        </p>
      </div>
      <div className={styles.levels_view_container}>
        <div className={styles.levels_view1}>
          <div className={styles.levels_image}>
            <img
              src="/assets/campuscommunity/level0.svg"
              alt=""
              className={styles.levels_img}
            />
          </div>
          <div className={styles.levels_cards}>
            <div className={styles.second_card}>
              <p className={styles.levels_headingcard}>
                Level 0 : <span>The Selection</span>
              </p>
            </div>
            <div className={styles.sd_cardtext}>
              <p>
                Establishing a great leadership team on campus is foundational to the journey of attaining µLearn Chaptership, representing the pinnacle of organizational excellence and innovation within the academic community.{" "}
                <span className={styles.sd_cardtextin}>
                  At the zeroth level, the focus is on laying the groundwork for effective leadership that will drive the mission and vision of the campus forward.
                </span>
                <br></br>
                <br></br>
                This is the Zeroth level in the journey of attaining µLearn Chaptership for your campus
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.levels_view_container}>
        <div className={styles.levels_view}>
          <div className={styles.levels_cards}>
            <div className={styles.second_card}>
              <p className={styles.levels_headingcard}>
                Level 1 : <span>The Orientation</span>
              </p>
            </div>
            <div className={styles.sd_cardtext}>
              <p>
                Establishing the need for µLearn within your campus community, promote a culture of continuous learning and growth .
                <span className={styles.sd_cardtextin}>
                  {" "}
                  Also emphasize the importance of grit and perseverance in the face of adversity, helping students develop the resilience and determination needed to overcome obstacles and achieve their academic and personal goals.
                </span>
                <br></br>
                <br></br>
                This is the first level in the journey of attaining µLearn Chaptership for your campus.
              </p>
            </div>
          </div>
          <div className={styles.levels_image}>
            <img
              src="/assets/campuscommunity/level1.svg"
              alt=""
              className={styles.levels_img}
            />
          </div>
        </div>
      </div>
      <div className={styles.levels_view_container}>
        <div className={styles.levels_view1}>
          <div className={styles.levels_image}>
            <img
              src="/assets/campuscommunity/level2.svg"
              alt=""
              className={styles.levels_img}
            />
          </div>
          <div className={styles.levels_cards}>
            <div className={styles.second_card}>
              <p className={styles.levels_headingcard}>
                Level 2 : <span>The Execom</span>
              </p>
            </div>
            <div className={styles.sd_cardtext}>
              <p>
                Forming a campus executive committee (execom) of passionate individuals dedicated to fostering a culture of learning and growth marks a crucial step in advancing the µLearn initiative.
                <span className={styles.sd_cardtextin}>
                  {" "}
                  This committee's objective is to officially launch µLearn on campus, completing the second level journey. The execom will drive µLearn's implementation, integrating it into campus culture, organizing events, and engaging stakeholders for success. With the execom in place, the campus is poised to empower students and promote lifelong learning effectively.
                </span>
                <br></br>
                <br></br>
                The second level journey gets completed if the execom formation is done
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.levels_view_container}>
        <div className={styles.levels_view}>
          <div className={styles.levels_cards}>
            <div className={styles.second_card}>
              <p className={styles.levels_headingcard}>
                Level 3 : <span>The Outreach</span>
              </p>
            </div>
            <div className={styles.sd_cardtext}>
              <p>
                <span className={styles.sd_cardtextin}>
                  At the third level of the journey, establishing a digital presence for your campus involves creating social media accounts and completing level 3 tasks on Discord.
                </span>{" "}
                This includes setting up official accounts on platforms like Facebook, Twitter, Instagram, and LinkedIn, and engaging in tasks on Discord that enhance community interaction and collaboration. These efforts showcase the campus's commitment to leveraging digital platforms for connectivity, communication, and learning opportunities.
                <br></br>
                <br></br>
                The third level journey is accomplished upon fulfilling level 3 tasks and establishing the campus's digital presence.
              </p>
            </div>
          </div>
          <div className={styles.levels_image}>
            <img
              src="/assets/campuscommunity/level3.svg"
              alt=""
              className={styles.levels_img}
            />
          </div>
        </div>
      </div>
      <div className={styles.levels_view_container}>
        <div className={styles.levels_view1}>
          <div className={styles.levels_image}>
            <img
              src="/assets/campuscommunity/level4.svg"
              alt=""
              className={styles.levels_img}
            />
          </div>
          <div className={styles.levels_cards}>
            <div className={styles.second_card}>
              <p className={styles.levels_headingcard}>
                Level 4 : <span>The Learning</span>
              </p>
            </div>
            <div className={styles.sd_cardtext}>
              <p>
                Take your campus chapter's learning journey to the next level by set up learning circles, which provide a platform for students to collaborate, exchange ideas, and learn from one another.
                <span className={styles.sd_cardtextin}>
                  By establishing this you can create a supportive and dynamic learning environment that fosters academic excellence and personal growth, kick-starting their learning activities.
                </span>
                <br></br>
                <br></br>
                Level four completes when Interest Groups activate, fostering collaboration and a supportive learning environment.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.levels_view_container}>
        <div className={styles.levels_view1}>
          <div className={styles.levels_cards}>
            <div className={styles.second_card}>
              <p className={styles.levels_headingcard}>
                Level 5 : <span>The Chaptership</span>
              </p>
            </div>
            <div className={styles.sd_cardtext}>
              <p>
              At this stage, you have earned the esteemed status of chaptership for your campus chapter.
                <span className={styles.sd_cardtextin}>
                This achievement signifies your successful completion of the first level in the journey towards fostering a culture of continuous learning and academic excellence within your campus community.
                </span>
                <br></br>
                <br></br>
                Now you have gained benefits of the parent, The µLearn Foundation.
              </p>
            </div>
          </div>
          <div className={styles.levels_image}>
            <img
              src="/assets/campuscommunity/level5.svg"
              alt=""
              className={styles.levels_img}
            />
          </div>
        </div>
      </div>
      {/*Updated levels*/}
    </>
  );
};

export default Levels;
