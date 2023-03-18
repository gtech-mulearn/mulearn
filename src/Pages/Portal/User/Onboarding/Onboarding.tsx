import React, { useEffect, useState } from "react";
import styles from "./Onboarding.module.css";
type Props = {};
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import Error from "./assets/Error";
import Success from "./Success";

const Onboarding = (props: Props) => {
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  //Getting the token from the URL
  const token = queryParameters.get("id");
  //State Variables for the From
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState([{ id: "", title: "" }]);

  const [dept, setDept] = useState("");
  const [yog, setYog] = useState("");
  const [mentorRole, setMentorRole] = useState("");
  //State Variable for the Form Submission Validation
  const [formSuccess, setFormSuccess] = useState(false);
  const [hasError, setHasError] = useState({
    error: false,
    statusCode: 0,
    message: "",
  });

  //State Array for storing the Area of Interests
  const [areaOfInterest, setAreaOfInterest] = useState<string[]>([]);
  //State Array for Storing the Organization(Company, Community, College)
  const [orgnization, setOrgnization] = useState("");

  //State Array for storing the College Options
  const [collegeAPI, setCollegeAPI] = useState([{ id: "", title: "" }]);
  //State Array for storing the College Options(Search)
  const [collegeOptions, setCollegeOptions] = useState([
    { value: "", label: "" },
  ]);

  //State Array for storing the Department Options
  const [departmentAPI, setDepartmentAPI] = useState([{ id: "", title: "" }]);
  //State Array for storing the Company Options
  const [companyAPI, setCompanyAPI] = useState([{ id: "", title: "" }]);
  //State Array for storing the Community Options
  const [communityAPI, setCommunityAPI] = useState([{ id: "", title: "" }]);
  //State Array for storing the Mentor Role Options
  const [roleAPI, setRoleAPI] = useState([{ id: "", title: "" }]);
  //State Array for storing the Area of Interest Options
  const [aoiAPI, setAoiAPI] = useState([{ id: "", name: "" }]);

  //State Varaible t
  const [submitTrigger, setSubmitTrigger] = useState(false);
  const [validations, setValidations] = useState({
    firstName: false,
    email: false,
    phone: false,
    role: false,
    student: {
      organization: false,
      department: false,
      yearOfGraduation: false,
    },
    enabler: {
      organization: false,
      department: false,
    },
    mentor: {
      organization: false,
      mentorRole: false,
      type: "",
    },
    areaOfInterest: false,
  });

  useEffect(() => {
    //Getting the Input Field Elements
    const first_name: HTMLInputElement = document.getElementById(
      "first_name"
    ) as HTMLInputElement;
    const email_field: HTMLInputElement = document.getElementById(
      "email_field"
    ) as HTMLInputElement;
    const phone_field: HTMLInputElement = document.getElementById(
      "phone_field"
    ) as HTMLInputElement;
    const role_field: HTMLInputElement = document.getElementById(
      "role_field"
    ) as HTMLInputElement;
    const dept_field: HTMLInputElement = document.getElementById(
      "dept_field"
    ) as HTMLInputElement;
    const yog_field: HTMLInputElement = document.getElementById(
      "yog_field"
    ) as HTMLInputElement;
    const mentortype_filed: HTMLInputElement = document.getElementById(
      "mentortype_filed"
    ) as HTMLInputElement;
    const company_field: HTMLInputElement = document.getElementById(
      "company_field"
    ) as HTMLInputElement;
    const community_field: HTMLInputElement = document.getElementById(
      "community_field"
    ) as HTMLInputElement;

    const setBorderStyle = (element: HTMLInputElement, condition: boolean) => {
      element.style.border = condition ? "1px solid red" : "none";
    };

    if (submitTrigger) {
      if (firstName === "") {
        setBorderStyle(first_name, true);
        setValidations((prevValidations) => ({
          ...prevValidations,
          firstName: false,
        }));
      } else {
        setBorderStyle(first_name, false);
        setValidations((prevValidations) => ({
          ...prevValidations,
          firstName: true,
        }));
      }

      if (email === "") {
        setBorderStyle(email_field, true);
        setValidations((prevValidations) => ({
          ...prevValidations,
          email: false,
        }));
      } else {
        setBorderStyle(email_field, false);
        setValidations((prevValidations) => ({
          ...prevValidations,
          email: true,
        }));
      }

      if (phone === 0) {
        setBorderStyle(phone_field, true);
        setValidations((prevValidations) => ({
          ...prevValidations,
          phone: false,
        }));
      } else {
        setBorderStyle(phone_field, false);
        setValidations((prevValidations) => ({
          ...prevValidations,
          phone: true,
        }));
      }

      //Validation for the Role Field(Mentory, Student or E)
      if (role[0].id === "") {
        setBorderStyle(role_field, true);
        setValidations((prevValidations) => ({
          ...prevValidations,
          role: false,
        }));
      } else {
        setBorderStyle(role_field, false);
        setValidations((prevValidations) => ({
          ...prevValidations,
          role: true,
        }));

        if (orgnization === "") {
          setValidations((prevValidations) => ({
            ...prevValidations,
            student: {
              ...prevValidations.student,
              organization: false,
            },
          }));
        } else {
          setValidations((prevValidations) => ({
            ...prevValidations,
            student: {
              ...prevValidations.student,
              organization: true,
            },
          }));
        }

        //Validation for the Mentor Role Field(Company, Community, College)
        if (["Mentor"].includes(role[0].title)) {
          if (mentorRole === "") {
            setBorderStyle(mentortype_filed, true);
            setValidations((prevValidations) => ({
              ...prevValidations,
              mentor: {
                ...prevValidations.mentor,
                mentorRole: false,
              },
            }));
          } else {
            setBorderStyle(mentortype_filed, false);
            setValidations((prevValidations) => ({
              ...prevValidations,
              mentor: {
                ...prevValidations.mentor,
                mentorRole: true,
              },
            }));
          }
        }

        //Validation for the Role Field Values
        if (["Mentor"].includes(role[0].title)) {
          //Validation for the Mentor Role Field(Company)
          if (mentorRole === "Company") {
            if (orgnization === "") {
              setBorderStyle(company_field, true);
              setValidations((prevValidations) => ({
                ...prevValidations,
                mentor: {
                  ...prevValidations.mentor,
                  organization: false,
                },
              }));
            } else {
              setBorderStyle(company_field, false);
              setValidations((prevValidations) => ({
                ...prevValidations,
                mentor: {
                  ...prevValidations.mentor,
                  organization: true,
                },
              }));
            }
            //Validation for the Mentor Role Field(Community)
          } else if (mentorRole === "Community Partner") {
            if (orgnization === "") {
              setBorderStyle(community_field, true);
              setValidations((prevValidations) => ({
                ...prevValidations,
                mentor: {
                  ...prevValidations.mentor,
                  organization: false,
                },
              }));
            } else {
              setBorderStyle(community_field, false);
              setValidations((prevValidations) => ({
                ...prevValidations,
                mentor: {
                  ...prevValidations.mentor,
                  organization: true,
                },
              }));
            }
          }
        }

        //Validation for the Student and Enabler Role Field Values
        if (["Student", "Enabler"].includes(role[0].title)) {
          //Validation for the Student Role Field Values(Year of Graduation, Department, Organization)
          if (role[0].title === "Student") {
            if (yog_field.value === "") {
              setBorderStyle(yog_field, true);
              setValidations((prevValidations) => ({
                ...prevValidations,
                student: {
                  ...prevValidations.student,
                  yearOfGraduation: false,
                },
              }));
            } else {
              setBorderStyle(yog_field, false);
              setValidations((prevValidations) => ({
                ...prevValidations,
                student: {
                  ...prevValidations.student,
                  yearOfGraduation: true,
                },
              }));
            }

            if (dept_field.value === "") {
              setBorderStyle(dept_field, true);
              setValidations((prevValidations) => ({
                ...prevValidations,
                student: {
                  ...prevValidations.student,
                  department: false,
                },
              }));
            } else {
              setBorderStyle(dept_field, false);
              setValidations((prevValidations) => ({
                ...prevValidations,
                student: {
                  ...prevValidations.student,
                  department: true,
                },
              }));
            }

            if (orgnization === "") {
              setValidations((prevValidations) => ({
                ...prevValidations,
                student: {
                  ...prevValidations.student,
                  organization: false,
                },
              }));
            } else {
              setValidations((prevValidations) => ({
                ...prevValidations,
                student: {
                  ...prevValidations.student,
                  organization: true,
                },
              }));
            }

            //Validation for the Enabler Role Field Values(Department, Organization)
          } else if (role[0].title === "Enabler") {
            if (dept_field.value === "") {
              setBorderStyle(dept_field, true);
              setValidations((prevValidations) => ({
                ...prevValidations,
                enabler: {
                  ...prevValidations.enabler,
                  department: false,
                },
              }));
            } else {
              setBorderStyle(dept_field, false);
              setValidations((prevValidations) => ({
                ...prevValidations,
                enabler: {
                  ...prevValidations.enabler,
                  department: true,
                },
              }));
            }
            if (orgnization === "") {
              setValidations((prevValidations) => ({
                ...prevValidations,
                enabler: {
                  ...prevValidations.enabler,
                  organization: false,
                },
              }));
            } else {
              setValidations((prevValidations) => ({
                ...prevValidations,
                enabler: {
                  ...prevValidations.enabler,
                  organization: true,
                },
              }));
            }
          }
        }
      }
      //Validation for the Area of Interest Field
      if (areaOfInterest.length < 1) {
        console.log("Area of Interest is empty");
        setValidations((prevValidations) => ({
          ...prevValidations,
          areaOfInterest: false,
        }));
      } else {
        console.log("Area of Interest is not empty");
        setValidations((prevValidations) => ({
          ...prevValidations,
          areaOfInterest: true,
        }));
      }
    }
  }, [
    firstName,
    email,
    phone,
    role,
    orgnization,
    areaOfInterest,
    dept,
    yog,
    submitTrigger,
    mentorRole,
  ]);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: "none",
      background: "rgba(239, 241, 249, 0.6)",
      borderRadius: "6px",
      outline: "none",
      marginTop: "10px",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#F8F8F8" : "white",
      color: "#4A4A4A",
      padding: "8px 20px",
      "&:hover": {
        backgroundColor: "#F8F8F8",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      marginTop: "0",
      borderRadius: "0",
      boxShadow: "none",
    }),
  };

  const yog_year = [
    2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
    2027, 2028, 2029, 2030,
  ];

  const onboard = () => {
    const options = {
      method: "POST",
      url: import.meta.env.VITE_BACKEND_URL + "/api/v1/user/register/",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
      data: {
        firstName: firstName, //required
        lastName: lastName === "" ? null : lastName,
        email: email, //required
        mobile: phone, //required
        gender: gender === "" ? null : gender,
        dob: dob === "" ? null : dob,
        role: role[0]["id"], //required
        organization: orgnization === "" ? null : orgnization, //required except for individual
        dept: dept === "" ? null : dept, //required for student and enabler
        yearOfGraduation: yog === "" ? null : yog, //required for student
        areaOfInterest, //required
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setFormSuccess(true);
      })
      .catch(function (error) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    // request for token verification
    const token_check = {
      method: "GET",
      url:
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/register/jwt/validate",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    };
    axios
      .request(token_check)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        //TODO: Uncomment this commented to bypass already onboarded user
        // setHasError({
        //   error: error.response.data.hasError,
        //   statusCode: error.response.data.statusCode,
        //   message: error.response.data.message,
        // });
        console.log(error);
      });

    // request for college list
    const college = {
      method: "GET",
      url:
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/register/college/list",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    };
    axios
      .request(college)
      .then(function (response) {
        const colleges = response.data.response.colleges;
        setCollegeAPI(colleges);
        setCollegeOptions(
          colleges
            .sort((a: any, b: any) => a.title.localeCompare(b.title))
            .map((college: any) => ({
              value: college.id,
              label: college.title,
            }))
        );
        setDepartmentAPI(response.data.response.departments);
      })
      .catch(function (error) {
        console.error(error);
      });

    // request for company list
    const company = {
      method: "GET",
      url:
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/register/company/list",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    };
    axios
      .request(company)
      .then(function (response) {
        // console.log(response.data.response);
        setCompanyAPI(response.data.response.companies);
      })
      .catch(function (error) {
        console.error(error);
      });

    // request for role list
    const role = {
      method: "GET",
      url: import.meta.env.VITE_BACKEND_URL + "/api/v1/user/register/role/list",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    };
    axios
      .request(role)
      .then(function (response) {
        setRoleAPI(response.data.response.roles);
      })
      .catch(function (error) {
        console.error(error);
      });

    // request for area of intersts list
    const aoi = {
      method: "GET",
      url:
        import.meta.env.VITE_BACKEND_URL +
        "/api/v1/user/register/areaofinterst/list",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    };
    axios
      .request(aoi)
      .then(function (response) {
        setAoiAPI(response.data.response.aois);
      })
      .catch(function (error) {
        console.error(error);
      });

    // request for community list
    const comunity = {
      method: "GET",
      url:
        import.meta.env.VITE_BACKEND_URL +
        "/api/v1/user/register/comunity/list",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    };
    axios
      .request(comunity)
      .then(function (response) {
        setCommunityAPI(response.data.response.communities);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className={styles.onboarding_page}>
        {!hasError.error ? (
          <>
            {!formSuccess ? (
              <div className={styles.form_container}>
                <h1>User Information</h1>
                <p>
                  Please enter all the required information in the fields
                  provided below. Please be aware that once you have submitted
                  this information, you will not be able to make any changes or
                  updates.
                </p>
                <form action="">
                  <div>
                    <div className={styles.inputs}>
                      <div className={styles.input_container}>
                        <label htmlFor="">
                          First Name <span className={styles.required}>*</span>
                        </label>
                        <input
                          id="first_name"
                          type="text"
                          placeholder="First name"
                          className={styles.input}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                          required
                        />
                        {submitTrigger && !validations.firstName && (
                          <p className={styles.error_message}>
                            This field is required
                          </p>
                        )}
                      </div>
                      <div className={styles.input_container}>
                        <label htmlFor="">Last Name</label>
                        <input
                          type="text"
                          placeholder="Last name"
                          className={styles.input}
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.inputs}>
                      <div className={styles.input_container}>
                        <label htmlFor="">
                          Email address{" "}
                          <span className={styles.required}>*</span>
                        </label>
                        <input
                          id="email_field"
                          type="email"
                          placeholder="username@domain.com"
                          className={styles.input}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          required
                        />
                        {submitTrigger && !validations.email && (
                          <p className={styles.error_message}>
                            This field is required
                          </p>
                        )}
                      </div>
                      <div className={styles.input_container}>
                        <label htmlFor="">Phone number</label>
                        <div className={styles.grouped_inputs}>
                          <select
                            style={{ width: "20%", textAlign: "center" }}
                            name=""
                            id=""
                          >
                            <option value="+91">+91</option>
                          </select>
                          <input
                            id="phone_field"
                            style={{ width: "78%" }}
                            type="number"
                            placeholder="8023456789"
                            onChange={(e) => {
                              setPhone(e.target.valueAsNumber);
                            }}
                            required
                          />
                          {submitTrigger && !validations.phone && (
                            <p className={styles.error_message}>
                              This field is required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.inputs}>
                      <div className={styles.input_container}>
                        <div className={styles.grouped_inputs}>
                          <div
                            style={{ width: "49%" }}
                            className={styles.input_container}
                          >
                            <label htmlFor="">Gender</label>
                            <select
                              name=""
                              id=""
                              onChange={(e) => {
                                setGender(e.target.value);
                              }}
                            >
                              <option value="">Select gender</option>
                              <option value="male">
                                <span className={styles.gender}>♂</span> Male
                              </option>
                              <option value="male">
                                <span className={styles.gender}>♀</span> Female
                              </option>
                              <option value="other">Other</option>
                              <option value="not to say">
                                Prefer not to say
                              </option>
                            </select>
                          </div>
                          <div
                            style={{ width: "49%" }}
                            className={styles.input_container}
                          >
                            <label htmlFor="">Date of Birth</label>
                            <input
                              id="gender_field"
                              type="date"
                              placeholder="dd/mm/yyyy"
                              className={styles.input}
                              onChange={(e) => {
                                setDob(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles.input_container}>
                        <label htmlFor="">
                          Role <span className={styles.required}>*</span>
                        </label>
                        <select
                          id="role_field"
                          name=""
                          onChange={(e) => {
                            roleAPI.map((role) => {
                              e.target.value == ""
                                ? setRole([{ id: "", title: "" }])
                                : role.id == e.target.value
                                ? setRole([
                                    { id: e.target.value, title: role.title },
                                  ])
                                : null;
                            });
                          }}
                          required
                        >
                          <option value="">Select</option>
                          {roleAPI.map((role, i) => {
                            return (
                              <option key={i} value={role.id}>
                                {role.title}
                              </option>
                            );
                          })}
                        </select>
                        {submitTrigger && !validations.role && (
                          <p className={styles.error_message}>
                            This field is required
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={styles.inputs}>
                      {role[0].title == "Student" ||
                      role[0].title == "Enabler" ? (
                        <>
                          <div className={styles.input_container}>
                            <div className={styles.grouped_inputs}>
                              <div
                                style={
                                  role[0].title == "Student"
                                    ? { width: "78%" }
                                    : { width: "100%" }
                                }
                                className={styles.input_container}
                              >
                                <label htmlFor="">
                                  College{" "}
                                  <span className={styles.required}>*</span>
                                </label>
                                <ReactSelect
                                  id="college_field"
                                  value={collegeOptions.find(
                                    (college) => college.value === orgnization
                                  )}
                                  onChange={(option) =>
                                    option && setOrgnization(option.value)
                                  }
                                  options={collegeOptions}
                                  isClearable={false}
                                  placeholder="Select college..."
                                  noOptionsMessage={() => "No colleges found."}
                                  filterOption={({ label }, inputValue) =>
                                    label
                                      .toLowerCase()
                                      .includes(inputValue.toLowerCase())
                                  }
                                  styles={customStyles}
                                  required
                                />
                                {submitTrigger &&
                                  !validations.student.organization && (
                                    <p className={styles.error_message}>
                                      This field is required
                                    </p>
                                  )}
                              </div>

                              {role[0].title == "Student" ? (
                                <div
                                  style={{ width: "20%" }}
                                  className={styles.input_container}
                                >
                                  <label htmlFor="">
                                    Graduation Year{" "}
                                    <span className={styles.required}>*</span>
                                  </label>
                                  <select
                                    id="yog_field"
                                    style={{ width: "100%" }} //78%
                                    name=""
                                    onChange={(e) => setYog(e.target.value)}
                                    required
                                  >
                                    <option value="">Select</option>
                                    {yog_year.map((year, i) => {
                                      return (
                                        <option key={i} value={year}>
                                          {year}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {submitTrigger &&
                                    !validations.student.yearOfGraduation && (
                                      <p className={styles.error_message}>
                                        This field is required
                                      </p>
                                    )}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className={styles.input_container}>
                            <label htmlFor="">
                              Department{" "}
                              <span className={styles.required}>*</span>
                            </label>
                            <select
                              id="dept_field"
                              name=""
                              onChange={(e) => {
                                setDept(e.target.value);
                              }}
                              required
                            >
                              <option value="">Select</option>
                              {departmentAPI.map((dept, index) => {
                                return (
                                  <option key={index} value={dept.id}>
                                    {dept.title}
                                  </option>
                                );
                              })}
                            </select>
                            {submitTrigger &&
                              ((role[0].title == "Student" &&
                                !validations.student.department) ||
                                !validations.enabler.department) && (
                                <p className={styles.error_message}>
                                  This field is required
                                </p>
                              )}
                          </div>
                        </>
                      ) : (
                        <>
                          {role[0].title == "Mentor" ? (
                            <div className={styles.input_container}>
                              <label htmlFor="">
                                Type <span className={styles.required}>*</span>
                              </label>
                              <div className={styles.grouped_inputs}>
                                <select
                                  id="mentortype_filed"
                                  style={{ width: "100%" }} //78%
                                  name=""
                                  onChange={(e) => {
                                    setMentorRole(e.target.value);
                                  }}
                                  required
                                >
                                  <option value="Select">Select</option>
                                  <option value="Company">Company</option>
                                  <option value="Community Partner">
                                    Community Partner
                                  </option>
                                  <option value="Induvidual">Induvidual</option>
                                </select>
                              </div>
                              {submitTrigger &&
                                !validations.mentor.mentorRole && (
                                  <p className={styles.error_message}>
                                    This field is required
                                  </p>
                                )}
                            </div>
                          ) : null}
                          {mentorRole == "Company" ? (
                            <div className={styles.input_container}>
                              <label htmlFor="">Company</label>
                              <select
                                id="company_field"
                                name=""
                                onChange={(e) => {
                                  setOrgnization(e.target.value);
                                }}
                                required
                              >
                                <option value="">Select</option>
                                {companyAPI.map((company, index) => {
                                  return (
                                    <option key={index} value={company.id}>
                                      {company.title}
                                    </option>
                                  );
                                })}
                              </select>
                              {submitTrigger &&
                                !validations.mentor.organization && (
                                  <p className={styles.error_message}>
                                    This field is required
                                  </p>
                                )}
                            </div>
                          ) : null}
                          {mentorRole == "Community Partner" ? (
                            <div className={styles.input_container}>
                              <label htmlFor="">Community</label>
                              <select
                                id="community_field"
                                onChange={(e) => {
                                  setOrgnization(e.target.value);
                                }}
                                required
                              >
                                <option value="">Select</option>
                                {communityAPI.map((company, index) => {
                                  return (
                                    <option key={index} value={company.id}>
                                      {company.title}
                                    </option>
                                  );
                                })}
                              </select>
                              {submitTrigger &&
                                !validations.mentor.organization && (
                                  <p className={styles.error_message}>
                                    This field is required
                                  </p>
                                )}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                    <div className={styles.inputs}>
                      {/* <div className={styles.input_container}> */}
                      <label htmlFor="">
                        Areas of Interest / Stack{" "}
                        <span className={styles.required}>*</span>
                      </label>

                      <div className={styles.aoi_container}>
                        {submitTrigger && !validations.areaOfInterest && (
                          <p className={styles.error_message}>
                            Please select at least one area of interest
                          </p>
                        )}
                        {aoiAPI.map((aoi, i) => {
                          const checked = areaOfInterest.includes(
                            aoi.id as string
                          );
                          const disabled =
                            areaOfInterest.length >= 3 && !checked;
                          return (
                            <label key={i}>
                              <input
                                value={aoi.id}
                                type="checkbox"
                                checked={checked}
                                disabled={disabled}
                                onChange={(e) => {
                                  const selectedId = aoi.id;
                                  if (checked) {
                                    setAreaOfInterest(
                                      areaOfInterest.filter(
                                        (aois) => aois !== selectedId
                                      )
                                    );
                                  } else {
                                    setAreaOfInterest(
                                      [...areaOfInterest, selectedId].slice(-3)
                                    );
                                  }
                                }}
                                required
                              />
                              <span>{aoi.name}</span>
                            </label>
                          );
                        })}
                      </div>

                      {/* </div> */}
                    </div>
                  </div>
                  <div className={styles.form_buttons}>
                    <button type="reset">Cancel</button>
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        setSubmitTrigger(true);
                        console.log(validations);
                        if (
                          validations.firstName &&
                          validations.email &&
                          validations.phone &&
                          validations.role &&
                          validations.areaOfInterest
                        ) {
                          if (role[0].title == "Student") {
                            if (
                              validations.student.department &&
                              validations.student.organization &&
                              validations.student.yearOfGraduation
                            ) {
                              onboard();
                            }
                          } else if (role[0].title == "Mentor") {
                            if (
                              validations.mentor.mentorRole &&
                              validations.mentor.organization
                            ) {
                              onboard();
                            }
                          } else if (role[0].title == "Enabler") {
                            if (
                              validations.enabler.organization &&
                              validations.enabler.department
                            ) {
                              onboard();
                            }
                          }
                        }
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <Success />
            )}
          </>
        ) : (
          <div className={styles.error_msg}>
            <div className={styles.tik}>
              <Error />
            </div>
            <br />
            <br />
            <p>{hasError ? hasError.message : "Loading..."}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Onboarding;
