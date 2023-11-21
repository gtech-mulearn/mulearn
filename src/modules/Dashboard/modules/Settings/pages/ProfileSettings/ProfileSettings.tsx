import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import styles from "./ProfileSettings.module.css"
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from '@/MuLearnComponents/MuButtons/MuButton';

const ProfileSettings = () => {
  const scheme = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Password does not match")
  });

  const onSubmit = (values: any) => {
    console.log(values);
  }

  const [showOrHidePassword, setShowOrHidePassword] = useState("password");
  const [showOrHideConfirmPassword, setShowOrHideConfirmPassword] = useState("password");

  return (
    <div className={styles.mainContainer}>
      <div className={styles.profileContainer}>
        <div className={styles.changePasswordContainer}>
          <div>
            <p className={styles.changePasswordContainerLabel}>Change Password</p>
            <p className={styles.changePasswordContainerTagline}>Enter in a new password, and confirm it to change.</p>
          </div>

          <div className={styles.changePasswordInputContainer}>
            <Formik
              initialValues={{
                password: "",
                confirmPassword: ""
              }}
              validationSchema={scheme}
              onSubmit={onSubmit}
            >
              {formik => (
                <div>
                  <div className={styles.wrapper}>
                    <Form>
                      <div className={styles.inputBox}>
                        <SimpleInput
                          value={formik.values.password}
                          name="password"
                          placeholder="Password"
                          type={showOrHidePassword}
                          onChange={formik.handleChange}
                          style={{ marginTop: "10px" }}

                        />
                        <span
                          className={styles.eye}
                          onClick={() => {
                            setShowOrHidePassword(
                              showOrHidePassword ===
                                "password"
                                ? "text"
                                : "password"
                            );
                          }}
                        >
                          <i
                            className={`fa fa-eye${showOrHidePassword ===
                              "password"
                              ? "-slash"
                              : ""
                              }`}
                          />
                        </span>
                        <SimpleInput
                          value={
                            formik.values.confirmPassword
                          }
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          type={showOrHideConfirmPassword}
                          onChange={formik.handleChange}
                          style={{ marginTop: "10px" }}
                        />
                        <span
                          className={styles.eye}
                          onClick={() => {
                            setShowOrHideConfirmPassword(
                              showOrHideConfirmPassword ===
                                "password"
                                ? "text"
                                : "password"
                            );
                          }}
                        >
                          <i
                            className={`fa fa-eye${showOrHideConfirmPassword ===
                              "password"
                              ? "-slash"
                              : ""
                              }`}
                          />
                        </span>
                        <div className={styles.submit}>
                          <PowerfulButton
                            type="submit"
                          >
                            Change Password
                          </PowerfulButton>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings