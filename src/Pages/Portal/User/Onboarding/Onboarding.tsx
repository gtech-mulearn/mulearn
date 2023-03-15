import React, { useEffect, useState } from "react";
import styles from "./Onboarding.module.css";
type Props = {};
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Onboarding = (props: Props) => {
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const token = queryParameters.get("id");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState([{ id: "", title: "" }]);

  const [dept, setDept] = useState("");
  const [yof, setYof] = useState("");
  const [mentorRole, setMentorRole] = useState("");
  const [hasError, setHasError] = useState({ error: false, statusCode: 0, message: "" });

  const [areaOfInterest, setAreaOfInterest] = useState<String[] | []>([]);
  const [orgnization, setOrgnization] = useState("");

  const [collegeAPI, setCollegeAPI] = useState([{ id: "", title: "" }])
  const [departmentAPI, setDepartmentAPI] = useState([{ id: "", title: "" }])
  const [companyAPI, setCompanyAPI] = useState([{ id: "", title: "" }])
  const [communityAPI, setCommunityAPI] = useState([{ id: "", title: "" }])
  const [roleAPI, setRoleAPI] = useState([{ id: "", title: "" }])
  const [aoiAPI, setAoiAPI] = useState([{ id: "", name: "" }])

  const yof_year = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

  useEffect(() => {
    // request for token verification
    const token_check = {
      method: "GET",
      url: import.meta.env.VITE_BACKEND_URL + '/api/v1/user/register/jwt/validate',
      headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/json' }
    };
    axios.request(token_check).then((response) => {
      // console.log(response.data.response);
      setHasError({ error: response.data.hasError, statusCode: response.data.statusCode, message: response.data.message });
    }).catch((error) => {
      setHasError(error)
      console.error(error);
    });

    // request for college list
    const college = {
      method: 'GET',
      url: import.meta.env.VITE_BACKEND_URL + '/api/v1/user/register/college/list',
      headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/json' }
    };
    axios.request(college).then(function (response) {
      // console.log(response.data.response.colleges);
      setCollegeAPI(response.data.response.colleges)
      setDepartmentAPI(response.data.response.departments)
    }).catch(function (error) {
      console.error(error);
    });

    // request for company list
    const company = {
      method: 'GET',
      url: import.meta.env.VITE_BACKEND_URL + '/api/v1/user/register/company/list',
      headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/json' }
    };
    axios.request(company).then(function (response) {
      // console.log(response.data.response);
      setCompanyAPI(response.data.response.companies)
    }).catch(function (error) {
      console.error(error);
    });

    // request for role list
    const role = {
      method: 'GET',
      url: import.meta.env.VITE_BACKEND_URL + '/api/v1/user/register/role/list',
      headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/json' }
    };
    axios.request(role).then(function (response) {
      setRoleAPI(response.data.response.roles)
    }).catch(function (error) {
      console.error(error);
    });

    // request for area of intersts list
    const aoi = {
      method: 'GET',
      url: import.meta.env.VITE_BACKEND_URL + '/api/v1/user/register/areaofinterst/list',
      headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/json' }
    };
    axios.request(aoi).then(function (response) {
      setAoiAPI(response.data.response.aois)
    }).catch(function (error) {
      console.error(error);
    });

    // request for community list
    const comunity = {
      method: 'GET',
      url: import.meta.env.VITE_BACKEND_URL + '/api/v1/user/register/comunity/list',
      headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/json' }
    };
    axios.request(comunity).then(function (response) {
      setCommunityAPI(response.data.response.communities)
    }).catch(function (error) {
      console.error(error);
    });
  }, [])

  return (
    <div className={styles.onboarding_page}>
      {!hasError.error ? <div className={styles.form_container}>
        <h1>User Information</h1>
        <p>
          Please enter all the required information in the fields provided
          below. Please be aware that once you have submitted this information,
          you will not be able to make any changes or updates.
        </p>
        <form action="">
          <div>
            <div className={styles.inputs}>
              <div className={styles.input_container}>
                <label htmlFor="">Full name</label>
                <input type="text" placeholder="First name" className={styles.input} onChange={(e) => { setFirstName(e.target.value); }} required />
              </div>
              <div className={styles.input_container}>
                <label htmlFor=""></label>
                <input type="text" placeholder="Last name" className={styles.input} onChange={(e) => { setLastName(e.target.value); }} required />
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input_container}>
                <label htmlFor="">Email address</label>
                <input type="email" placeholder="username@domain.com" className={styles.input} onChange={(e) => { setEmail(e.target.value); }} required />
              </div>
              <div className={styles.input_container}>
                <label htmlFor="">Phone number</label>
                <div className={styles.grouped_inputs}>
                  <select style={{ width: "20%", textAlign: "center" }} name="" id="" >
                    <option value="+91">+91</option>
                  </select>
                  <input style={{ width: "78%" }} type="number" placeholder="8023456789" onChange={(e) => { setPhone(e.target.valueAsNumber); }} required />
                </div>
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input_container}>
                <div className={styles.grouped_inputs}>
                  <div style={{ width: "49%" }} className={styles.input_container} >
                    <label htmlFor="">Gender</label>
                    <select name="" id="" onChange={(e) => { setGender(e.target.value); }} >
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
                  <div style={{ width: "49%" }} className={styles.input_container}>
                    <label htmlFor="">Date of Birth</label>
                    <input type="date" placeholder="dd/mm/yyyy" className={styles.input} onChange={(e) => { setDob(e.target.value); }} required />
                  </div>
                </div>
              </div>
              <div className={styles.input_container}>
                <label htmlFor="">Role</label>
                <select name="" id="" onChange={(e) => { roleAPI.map((role) => { role.id === e.target.value ? setRole([{ id: e.target.value, title: role.title }]) : null }) }} required>
                  <option value="">Select</option>
                  {
                    roleAPI.map((role, i) => {
                      return (
                        <option key={i} value={role.id}>{role.title}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className={styles.inputs}>
              {role[0].title == "Student" || role[0].title == "Enabler" ? (
                <>
                  <div className={styles.input_container}>
                    <div className={styles.grouped_inputs}>
                      <div style={role[0].title == "Student" ? { width: "78%" } : { width: "100%" }} className={styles.input_container}>
                        <label htmlFor="">College</label>
                        {/* <div className={styles.grouped_inputs}>
                          <input type="text" placeholder="select college" />
                        </div> */}
                        <select style={{ width: "100%" }} //78%
                          name="" id="" onChange={(e) => { setOrgnization(e.target.value); }} required>
                          <option value="">Select</option>
                          {
                            collegeAPI.map((college, index) => {
                              return <option key={index} value={college.id}>{college.title}</option>
                            })
                          }
                        </select>
                      </div>


                      {role[0].title == "Student" ? <div style={{ width: "20%" }} className={styles.input_container}>
                        <label htmlFor="">YOG</label>
                        <select style={{ width: "100%" }} //78%
                          name="" id="" onChange={(e) => setYof(e.target.value)} required>
                          <option value="">Select</option>
                          {
                            yof_year.map((year, index) => {
                              return <option value={year}>{year}</option>
                            })
                          }


                        </select>
                      </div> : null}
                    </div>
                  </div>
                  <div className={styles.input_container}>
                    <label htmlFor="">Dept</label>
                    <select name="" id="" onChange={(e) => { setDept(e.target.value); }} required>
                      <option value="">Select</option>
                      {
                        departmentAPI.map((dept, index) => {
                          return <option key={index} value={dept.id}>{dept.title}</option>
                        })
                      }
                    </select>
                  </div>
                </>
              ) : (
                <>
                  {
                    role[0].title == "Mentor" ? <div className={styles.input_container}>
                      <label htmlFor="">Type</label>
                      <div className={styles.grouped_inputs}>
                        <select
                          style={{ width: "100%" }} //78%
                          name="" id="" onChange={(e) => { setMentorRole(e.target.value); }} required>
                          <option value="Select">Select</option>
                          <option value="Company">Company</option>
                          <option value="Community Partner">Community Partner</option>
                          <option value="Induvidual">Induvidual</option>
                        </select>
                      </div>
                    </div> : null
                  }
                  {mentorRole == "Company" ? <div className={styles.input_container}>
                    <label htmlFor="">Company</label>
                    <select name="" id="" onChange={(e) => { setOrgnization(e.target.value); }} required>
                      <option value="">Select</option>
                      {
                        companyAPI.map((company, index) => {
                          return <option key={index} value={company.id}>{company.title}</option>
                        })
                      }
                    </select>
                  </div> : null}
                  {mentorRole == "Community Partner" ?
                    <div className={styles.input_container}>
                      <label htmlFor="">Community</label>
                      <select name="" id="" onChange={(e) => { setOrgnization(e.target.value); }} required>
                        <option value="">Select</option>
                        {
                          communityAPI.map((company, index) => {
                            return <option key={index} value={company.id}>{company.title}</option>
                          })
                        }
                      </select>
                    </div> : null}
                </>
              )}
            </div>
            <div className={styles.inputs}>
              {/* <div className={styles.input_container}> */}
              <label htmlFor="">Areas of Interest / Stack</label>

              <div className={styles.aoi_container}>
                {
                  aoiAPI.map((aoi, i) => {
                    return (
                      <label key={i}>
                        <input value={aoi.id} disabled={areaOfInterest.length < 3 ? false : true} type="checkbox" onChange={(e) => {
                          e.target.checked ? setAreaOfInterest([...areaOfInterest, aoi.id]) : setAreaOfInterest(areaOfInterest.filter((aois) => aois != aoi.id));
                        }} required />
                        <span>{aoi.name}</span>
                      </label>
                    )
                  })
                }
              </div>

              {/* </div> */}
            </div>
          </div>
          <div className={styles.form_buttons}>
            <button type="reset">Cancel</button>
            <button type="submit" onClick={(e) => {
              // e.preventDefault();
              const options = {
                method: 'POST',
                url: import.meta.env.VITE_BACKEND_URL + '/api/v1/user/register/',
                headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/json' },
                data: {
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  mobile: phone,
                  gender,
                  dob,
                  role,
                  organization: orgnization,
                  dept,
                  yearOfGraduation: yof,//string
                  areaOfInterest
                }
              };

              axios.request(options).then(function (response) {
                console.log(response.data);
                navigate("/user/onboarding/success");
              }).catch(function (error) {
                console.log(error);
              });
            }}>Submit</button>
          </div>
        </form>
      </div> : <div>{hasError ? hasError.message : "Loading..."}</div>}
    </div>
  );
};

export default Onboarding;
