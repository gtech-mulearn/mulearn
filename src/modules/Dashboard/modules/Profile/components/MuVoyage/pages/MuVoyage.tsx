import styles from "./MuVoyage.module.css";

const MuVoyage = () => {
  return (
    <>
      <div className={styles.maintask}>
        <div className={styles.tasks}>
          <div className={styles.topSection}>
            <div className={styles.title}>
              <span></span>
              <div className={styles.title_desc}>
                <p>Keyboard mastery Challenge</p>
                <p>Level2 - Task 1</p>
              </div>
            </div>

            <div className={styles.progressbar}>
              <div className={styles.progress_title}>
                <p>60% complete</p>
                <p>2 days left</p>
              </div>
              <div className={styles.progress}></div>
            </div>

            <div className={styles.date}>
              <p>Start : Nov 12</p>
              <p>End : Dec 12</p>
            </div>
          </div>

          <ul className={styles.accordion}>
            <li className={styles.main_list}>
              <input
                className={styles.expandBtn}
                type="checkbox"
                name="accordion"
                id="first"
              // checked={true}
              />
              <label htmlFor="first" className={styles.level}>
                <p>Level 1 </p>
                <div>
                  <span></span>
                  <p>4 Tasks</p>
                  <i className="fi fi-rr-angle-small-down"></i>
                </div>
              </label>
              <div className={styles.content}>
                <ul className={styles.list_list}>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="first1"
                      className={styles.checkbox}
                    />
                    <label htmlFor="first1" className={styles.first1}>
                      Keyboard Mastery Challenge
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="first2"
                      className={styles.checkbox}
                    />
                    <label htmlFor="first2" className={styles.first1}>
                      Defensive Driving
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="first3"
                      className={styles.checkbox}
                    />
                    <label htmlFor="first3" className={styles.first1}>
                      Defensive Driving
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="first4"
                      className={styles.checkbox}
                    />
                    <label htmlFor="first4" className={styles.first1}>
                      Defensive Driving
                    </label>
                  </li>
                </ul>
              </div>
            </li>

            <li className={styles.main_list}>
              <input
                className={styles.expandBtn}
                type="checkbox"
                name="accordion"
                id="second"
              />
              <label htmlFor="second" className={styles.level}>
                <p>Level 2 </p>
                <div>
                  <span></span>
                  <p>4 Tasks</p>
                  <i className="fi fi-rr-angle-small-down"></i>
                </div>
              </label>
              <div className={styles.content}>
                <ul className={styles.list_list}>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="second1"
                      className={styles.checkbox}
                    />
                    <label htmlFor="second1" className={styles.second1}>
                      Keyboard Mastery Challenge
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="second2"
                      className={styles.checkbox}
                    />
                    <label htmlFor="second2" className={styles.second1}>
                      Defensive Driving
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="second3"
                      className={styles.checkbox}
                    />
                    <label htmlFor="second3" className={styles.second1}>
                      Defensive Driving
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="second4"
                      className={styles.checkbox}
                    />
                    <label htmlFor="second4" className={styles.second1}>
                      Defensive Driving
                    </label>
                  </li>
                </ul>
              </div>
            </li>

            <li className={styles.main_list}>
              <input
                className={styles.expandBtn}
                type="checkbox"
                name="accordion"
                id="third"
              />
              <label htmlFor="third" className={styles.level}>
                <p>Level 3 </p>
                <div>
                  <span></span>
                  <p>4 Tasks</p>
                  <i className="fi fi-rr-angle-small-down"></i>
                </div>
              </label>
              <div className={styles.content}>
                <ul className={styles.list_list}>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="third1"
                      className={styles.checkbox}
                    />
                    <label htmlFor="third1" className={styles.third1}>
                      Keyboard Mastery Challenge
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="third2"
                      className={styles.checkbox}
                    />
                    <label htmlFor="third2" className={styles.third1}>
                      Defensive Driving
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="third3"
                      className={styles.checkbox}
                    />
                    <label htmlFor="third3" className={styles.third1}>
                      Defensive Driving
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="third4"
                      className={styles.checkbox}
                    />
                    <label htmlFor="third4" className={styles.third1}>
                      Defensive Driving
                    </label>
                  </li>
                </ul>
              </div>
            </li>

            <li className={styles.main_list}>
              <input
                className={styles.expandBtn}
                type="checkbox"
                name="accordion"
                id="fourth"
              />
              <label htmlFor="fourth" className={styles.level}>
                <p>Level 4 </p>
                <div>
                  <span></span>
                  <p>4 Tasks</p>
                  <i className="fi fi-rr-angle-small-down"></i>
                </div>
              </label>
              <div className={styles.content}>
                <ul className={styles.list_list}>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="fourth1"
                      className={styles.checkbox}
                    />
                    <label htmlFor="fourth1" className={styles.fourth1}>
                      Keyboard Mastery Challenge
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="fourth2"
                      className={styles.checkbox}
                    />
                    <label htmlFor="fourth2" className={styles.fourth1}>
                      Defensive Driving
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="fourth3"
                      className={styles.checkbox}
                    />
                    <label htmlFor="fourth3" className={styles.fourth1}>
                      Defensive Driving
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="accordion"
                      id="fourth4"
                      className={styles.checkbox}
                    />
                    <label htmlFor="fourth4" className={styles.fourth1}>
                      Defensive Driving
                    </label>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MuVoyage;
