import React, { useEffect, useState } from "react"
import styles from "./Onboarding.module.css"
type Props = {}
import axios from "axios"
import { useNavigate } from "react-router-dom"
import ReactSelect from "react-select"
import Error from "./assets/Error"
import Success from "./Success"

//TODO: Success Page in same page on button click (Done!)
//TODO: Gender by Default Select (Done!)
//TODO: Form Validations(On Submit) (I think already done)
//TODO: Favicon (Done!)
//TODO: Registered Users Show Success Page (Done!)
//TODO: JWT Token Wrong(Show Error Page) (Done!)

const Onboarding = (props: Props) => {
  const navigate = useNavigate()
  const queryParameters = new URLSearchParams(window.location.search)
  const token = queryParameters.get("id")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState(0)
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")
  const [role, setRole] = useState([{ id: "", title: "" }])
  const [onboardingCall, setOnboardingCall] = useState(false)
  const [validation, setValidation] = useState(false)
  const [modal, setModal] = useState({
    visible: false,
    message: "",
  })

  const [dept, setDept] = useState("")
  const [yog, setYog] = useState("")
  const [mentorRole, setMentorRole] = useState("")
  const [formSuccess, setFormSuccess] = useState(false)
  const [hasError, setHasError] = useState({
    error: false,
    statusCode: 0,
    message: "",
  })

  const [areaOfInterest, setAreaOfInterest] = useState<string[]>([])
  const [orgnization, setOrgnization] = useState("")

  const [collegeAPI, setCollegeAPI] = useState([{ id: "", title: "" }])
  const [collegeOptions, setCollegeOptions] = useState([
    { value: "", label: "" },
  ])
  const [departmentAPI, setDepartmentAPI] = useState([{ id: "", title: "" }])
  const [companyAPI, setCompanyAPI] = useState([{ id: "", title: "" }])
  const [communityAPI, setCommunityAPI] = useState([{ id: "", title: "" }])
  const [roleAPI, setRoleAPI] = useState([{ id: "", title: "" }])
  const [aoiAPI, setAoiAPI] = useState([{ id: "", name: "" }])


  useEffect(() => {
    if (onboardingCall) {
      const first_name: HTMLInputElement = document.getElementById(
        "first_name"
      ) as HTMLInputElement
      const email_field: HTMLInputElement = document.getElementById(
        "email_field"
      ) as HTMLInputElement
      const phone_field: HTMLInputElement = document.getElementById(
        "phone_field"
      ) as HTMLInputElement
      const role_field: HTMLInputElement = document.getElementById(
        "role_field"
      ) as HTMLInputElement
      const dept_field: HTMLInputElement = document.getElementById(
        "dept_field"
      ) as HTMLInputElement
      const yog_field: HTMLInputElement = document.getElementById(
        "yog_field"
      ) as HTMLInputElement
      const mentortype_filed: HTMLInputElement = document.getElementById(
        "mentortype_filed"
      ) as HTMLInputElement

      const setBorderStyle = (
        element: HTMLInputElement,
        condition: boolean
      ) => {
        element.style.border = condition ? "1px solid red" : "none"
      }

      if (firstName === "") {
        setBorderStyle(first_name, true)
        setValidation(false)
      } else {
        setBorderStyle(first_name, false)
        setValidation(true)
      }

      if (email === "") {
        setBorderStyle(email_field, true)
        setValidation(false)
      } else {
        setBorderStyle(email_field, false)
        setValidation(true)
      }

      if (phone === 0) {
        setBorderStyle(phone_field, true)
        setValidation(false)
      } else {
        setBorderStyle(phone_field, false)
        setValidation(true)
      }

      if (
        role[0].id === "" ||
        (orgnization === "" &&
          ["Student", "Enabler"].includes(role[0].title) &&
          (dept_field.value === "" || yog_field.value === "")) ||
        (orgnization === "" &&
          ["Mentor"].includes(role[0].title) &&
          mentortype_filed.value === "")
      ) {
        setBorderStyle(role_field, true)

        setValidation(false)
      } else {
        setBorderStyle(role_field, false)
        // if (dept_field.value === "") {
        //   setBorderStyle(dept_field, true)
        // } else {
        //   setBorderStyle(dept_field, false)
        //   setValidation(true)
        // }
        // if (yog_field.value === "") {
        //   setBorderStyle(yog_field, true)
        //   setValidation(false)
        // } else {
        //   setBorderStyle(yog_field, false)
        //   setValidation(true)
        // }
      }

      if (areaOfInterest.length < 1) {
        const aoi_message = {
          visible: true,
          message: "Please select at least 1 area of interest",
        }
        setModal(aoi_message)
        setValidation(false)
      } else {
        const aoi_message = {
          visible: false,
          message: "",
        }
        setModal(aoi_message)
        setValidation(true)
      }
    }
  }, [
    firstName,
    email,
    phone,
    role,
    orgnization,
    areaOfInterest,
    onboardingCall,
    dept,
  ])

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
  }

  const yog_year = [
    2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
    2027, 2028, 2029, 2030,
  ]

  const onboard = () => {
    setOnboardingCall(true)
    const options = {
      method: "POST",
      url: import.meta.env.VITE_BACKEND_URL + "/api/v1/user/register/",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
      data: {
        firstName: firstName,
        lastName: lastName === '' ? null : lastName,
        email: email,
        mobile: phone,
        gender: gender === '' ? null : gender,
        dob: dob === '' ? null : dob,
        role: role[0]["id"],
        organization: orgnization === '' ? null : orgnization,
        dept: dept === '' ? null : dept,
        yearOfGraduation: yog === '' ? null : yog, //string
        areaOfInterest,
      },
    }
    if (validation) {
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data)
          const aoi_message = {
            visible: true,
            message: "Onboarding Success!",
          }
          setModal(aoi_message)
          setTimeout(() => {
            setFormSuccess(true)
          }, 1000)
        })
        .catch(function (error) {
          console.log(error.response.data.message.email[0]);

          const aoi_message = {
            visible: true,
            message: error.response.data.message.email[0],
          }
          setModal(aoi_message)
        })
    }
  }

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
    }
    axios
      .request(token_check)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        setHasError({
          error: error.response.data.hasError,
          statusCode: error.response.data.statusCode,
          message: error.response.data.message,
        })
        console.log(error)
      })

    // request for college list
    const college = {
      method: "GET",
      url:
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/register/college/list",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    }
    axios
      .request(college)
      .then(function (response) {
        const colleges = response.data.response.colleges
        setCollegeAPI(colleges)
        setCollegeOptions(
          colleges
            .sort((a: any, b: any) => a.title.localeCompare(b.title))
            .map((college: any) => ({
              value: college.id,
              label: college.title,
            }))
        )
        setDepartmentAPI(response.data.response.departments)
      })
      .catch(function (error) {
        console.error(error)
      })

    // request for company list
    const company = {
      method: "GET",
      url:
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/register/company/list",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    }
    axios
      .request(company)
      .then(function (response) {
        // console.log(response.data.response);
        setCompanyAPI(response.data.response.companies)
      })
      .catch(function (error) {
        console.error(error)
      })

    // request for role list
    const role = {
      method: "GET",
      url: import.meta.env.VITE_BACKEND_URL + "/api/v1/user/register/role/list",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    }
    axios
      .request(role)
      .then(function (response) {
        setRoleAPI(response.data.response.roles)
      })
      .catch(function (error) {
        console.error(error)
      })

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
    }
    axios
      .request(aoi)
      .then(function (response) {
        setAoiAPI(response.data.response.aois)
      })
      .catch(function (error) {
        console.error(error)
      })

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
    }
    axios
      .request(comunity)
      .then(function (response) {
        setCommunityAPI(response.data.response.communities)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])
  // console.log(role);

  return (
    <>
      {modal.visible && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>{modal.message}</div>
        </div>
      )}
      <div className={styles.onboarding_page}>
        {!hasError.error ?
          <>
            {!formSuccess ? <div className={styles.form_container}>
              <h1>User Information</h1>
              <p>
                Please enter all the required information in the fields provided
                below. Please be aware that once you have submitted this
                information, you will not be able to make any changes or updates.
              </p>
              <form action="">
                <div>
                  <div className={styles.inputs}>
                    <div className={styles.input_container}>
                      <label htmlFor="">First Name <span className={styles.required}>*</span></label>
                      <input
                        id="first_name"
                        type="text"
                        placeholder="First name"
                        className={styles.input}
                        onChange={(e) => {
                          setFirstName(e.target.value)
                        }}
                        required
                      />
                    </div>
                    <div className={styles.input_container}>
                      <label htmlFor="">Last Name</label>
                      <input
                        type="text"
                        placeholder="Last name"
                        className={styles.input}
                        onChange={(e) => {
                          setLastName(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.inputs}>
                    <div className={styles.input_container}>
                      <label htmlFor="">Email address <span className={styles.required}>*</span></label>
                      <input
                        id="email_field"
                        type="email"
                        placeholder="username@domain.com"
                        className={styles.input}
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                        required
                      />
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
                            setPhone(e.target.valueAsNumber)
                          }}
                          required
                        />
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
                              setGender(e.target.value)
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
                            <option value="not to say">Prefer not to say</option>
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
                              setDob(e.target.value)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.input_container}>
                      <label htmlFor="">Role <span className={styles.required}>*</span></label>
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
                                : null
                          })
                        }}
                        required
                      >
                        <option value="">Select</option>
                        {roleAPI.map((role, i) => {
                          return (
                            <option key={i} value={role.id}>
                              {role.title}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className={styles.inputs}>
                    {role[0].title == "Student" || role[0].title == "Enabler" ? (
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
                              <label htmlFor="">College <span className={styles.required}>*</span></label>
                              {/* <div className={styles.grouped_inputs}>
                          <input type="text" placeholder="select college" />
                        </div> */}
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
                              />
                            </div>

                            {role[0].title == "Student" ? (
                              <div
                                style={{ width: "20%" }}
                                className={styles.input_container}
                              >
                                <label htmlFor="">Graduation Year <span className={styles.required}>*</span></label>
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
                                    )
                                  })}
                                </select>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className={styles.input_container}>
                          <label htmlFor="">Department <span className={styles.required}>*</span></label>
                          <select
                            id="dept_field"
                            name=""
                            onChange={(e) => {
                              setDept(e.target.value)
                            }}
                            required
                          >
                            <option value="">Select</option>
                            {departmentAPI.map((dept, index) => {
                              return (
                                <option key={index} value={dept.id}>
                                  {dept.title}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </>
                    ) : (
                      <>
                        {role[0].title == "Mentor" ? (
                          <div className={styles.input_container}>
                            <label htmlFor="">Type <span className={styles.required}>*</span></label>
                            <div className={styles.grouped_inputs}>
                              <select
                                id="mentortype_filed"
                                style={{ width: "100%" }} //78%
                                name=""
                                onChange={(e) => {
                                  setMentorRole(e.target.value)
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
                          </div>
                        ) : null}
                        {mentorRole == "Company" ? (
                          <div className={styles.input_container}>
                            <label htmlFor="">Company</label>
                            <select
                              id="company_field"
                              name=""
                              onChange={(e) => {
                                setOrgnization(e.target.value)
                              }}
                              required
                            >
                              <option value="">Select</option>
                              {companyAPI.map((company, index) => {
                                return (
                                  <option key={index} value={company.id}>
                                    {company.title}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                        ) : null}
                        {mentorRole == "Community Partner" ? (
                          <div className={styles.input_container}>
                            <label htmlFor="">Community</label>
                            <select
                              id="community_field"
                              onChange={(e) => {
                                setOrgnization(e.target.value)
                              }}
                              required
                            >
                              <option value="">Select</option>
                              {communityAPI.map((company, index) => {
                                return (
                                  <option key={index} value={company.id}>
                                    {company.title}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                  <div className={styles.inputs}>
                    {/* <div className={styles.input_container}> */}
                    <label htmlFor="">Areas of Interest / Stack <span className={styles.required}>*</span></label>

                    <div className={styles.aoi_container}>
                      {aoiAPI.map((aoi, i) => {
                        const checked = areaOfInterest.includes(aoi.id as string)
                        const disabled = areaOfInterest.length >= 3 && !checked
                        return (
                          <label key={i}>
                            <input
                              value={aoi.id}
                              type="checkbox"
                              checked={checked}
                              disabled={disabled}
                              onChange={(e) => {
                                const selectedId = aoi.id
                                if (checked) {
                                  setAreaOfInterest(
                                    areaOfInterest.filter(
                                      (aois) => aois !== selectedId
                                    )
                                  )
                                } else {
                                  setAreaOfInterest(
                                    [...areaOfInterest, selectedId].slice(-3)
                                  )
                                }
                              }}
                              required
                            />
                            <span>{aoi.name}</span>
                          </label>
                        )
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
                      e.preventDefault()
                      onboard()
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div> : <Success />}
          </>
          :
          <div className={styles.error_msg}>
            <div className={styles.tik}>
              <Error />
            </div>
            <br /><br />
            <p>
              {hasError ? hasError.message : "Loading..."}
            </p>
          </div>
        }
      </div>
    </>
  )
}

export default Onboarding
