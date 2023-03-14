import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "./Onboarding.module.css";
type Props = {};
import axios from "axios";

const Onboarding = (props: Props) => {
  const queryParameters = new URLSearchParams(window.location.search);
  const token = queryParameters.get("id");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [college, setCollege] = useState("");
  const [company, setCompany] = useState("");
  const [district, setDistrict] = useState("");
  const [dept, setDept] = useState("");
  const [yof, setYof] = useState("");
  const [mentorRole, setMentorRole] = useState("");
  const [hasError, setHasError] = useState(true)

  const [areaOfInterest, setAreaOfInterest] = useState<String[] | []>([]);
  const [orgnization, setOrgnization] = useState("");

  const [newCompany, setNewCompany] = useState("");
  const [newCollege, setNewCollege] = useState("");
  const [newDomain, setNewDomain] = useState("");

  const [collegeAPI, setCollegeAPI] = useState([{ id: "", title: "" }])
  const [departmentAPI, setDepartmentAPI] = useState([{ id: "", title: "" }])
  const [companyAPI, setCompanyAPI] = useState([{ id: "", title: "" }])
  const [communityAPI, setCommunityAPI] = useState([{ id: "", title: "" }])
  const [roleAPI, setRoleAPI] = useState([{ id: "", title: "" }])
  const [aoiAPI, setAoiAPI] = useState([{ id: "", name: "" }])

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const student = "603faa33-43f8-4d1a-aaf8-8cfb739e5905"
  const mentor = "ba71344d-3f2b-4382-8720-1005b1d9931c"
  const enabler = "eab367b4-86b4-4f96-a531-cfbacd7fab02"

  //api check
  // console.log(token);
  useEffect(() => {    
    const token_check = {
      method: "GET",
      url: import.meta.env.VITE_BACKEND_URL+'/api/v1/user/register/jwt/validate',
      headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/json' }
    };
    axios.request(token_check).then((response) => {
      // console.log(response.data.response);
      setHasError(response.data.hasError);
    }).catch((error) => {
      console.error(error);
    });

    const college = {
      method: 'GET',
      url: import.meta.env.VITE_BACKEND_URL+'/api/v1/user/register/college/list',
      headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/json' }
    };
    axios.request(college).then(function (response) {
      // console.log(response.data.response.colleges);
      setCollegeAPI(response.data.response.colleges)
      setDepartmentAPI(response.data.response.departments)
    }).catch(function (error) {
      console.error(error);
    });

    const company = {
      method: 'GET',
      url: import.meta.env.VITE_BACKEND_URL+'/api/v1/user/register/company/list',
      headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/json' }
    };
    axios.request(company).then(function (response) {
      // console.log(response.data.response);
      setCompanyAPI(response.data.response.companies)
    }).catch(function (error) {
      console.error(error);
    });

    const role = {
      method: 'GET',
      url: import.meta.env.VITE_BACKEND_URL+'/api/v1/user/register/role/list',
      headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/json' }
    };

    axios.request(role).then(function (response) {
      setRoleAPI(response.data.response.roles)
    }).catch(function (error) {
      console.error(error);
    });

    const aoi = {
      method: 'GET',
      url: import.meta.env.VITE_BACKEND_URL+'/api/v1/user/register/areaofinterst/list',
      headers: { Authorization: 'Bearer ' + token, 'content-type': 'application/json' }
    };
    axios.request(aoi).then(function (response) {
      setAoiAPI(response.data.response.aois)
    }).catch(function (error) {
      console.error(error);
    });

    const comunity = {
      method: 'GET',
      url: import.meta.env.VITE_BACKEND_URL+'/api/v1/user/register/comunity/list',
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
      {/* <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent margin="1rem">
          <ModalHeader>{`Create your ${role === "Student" ? "College" : "Company"
            }`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>{`${role === "Student" ? "College" : "Company"
                } name`}</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Company"
                onChange={(e) => {
                  setNewCompany(e.target.value);
                }}
              />
            </FormControl>

            {role === "Mentor" ? (
              <FormControl mt={4}>
                <FormLabel>Company domain</FormLabel>
                <Input
                  placeholder="Domain"
                  onChange={(e) => {
                    setNewDomain(e.target.value);
                  }}
                />
              </FormControl>
            ) : null}

            <FormControl mt={4}>
              <FormLabel>District</FormLabel>
              <Input
                placeholder="Select"
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={"facebook"} mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
      {!hasError ? <div className={styles.form_container}>
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
                <input type="text" placeholder="First name" className={styles.input} onChange={(e) => { setFirstName(e.target.value); }} />
              </div>
              <div className={styles.input_container}>
                <label htmlFor=""></label>
                <input type="text" placeholder="Last name" className={styles.input} onChange={(e) => { setLastName(e.target.value); }} />
              </div>
            </div>
            {/* <div className={styles.inputs}>
              <div className={styles.input_container}>
                <label htmlFor="">Password</label>
                <input type="password" placeholder="" className={styles.input} />
              </div>
              <div className={styles.input_container}>
                <label htmlFor="">Confirm password</label>
                <input type="password" placeholder="" className={styles.input} />
              </div>
            </div> */}
            <div className={styles.inputs}>
              <div className={styles.input_container}>
                <label htmlFor="">Email address</label>
                <input type="email" placeholder="username@domain.com" className={styles.input} onChange={(e) => { setEmail(e.target.value); }} />
              </div>
              <div className={styles.input_container}>
                <label htmlFor="">Phone number</label>
                <div className={styles.grouped_inputs}>
                  <select style={{ width: "20%", textAlign: "center" }} name="" id="" >
                    <option value="+91">+91</option>
                  </select>
                  <input style={{ width: "78%" }} type="number" placeholder="8023456789" onChange={(e) => { setPhone(e.target.valueAsNumber); }} />
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
                    </select>
                  </div>
                  <div style={{ width: "49%" }} className={styles.input_container}>
                    <label htmlFor="">Date of Birth</label>
                    <input type="date" placeholder="dd/mm/yyyy" className={styles.input} onChange={(e) => { setDob(e.target.value); }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.input_container}>
                <label htmlFor="">Role</label>
                <select name="" id="" onChange={(e) => { setRole(e.target.value); }}>
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
            {/* <div className={styles.inputs}>
              <div className={styles.input_container}>
                <label htmlFor="">Organization type</label>
                <select name="" id="">
                  <option value="">Select</option>
                </select>
              </div>
              <div className={styles.input_container}>
                <label htmlFor="">Organization name</label>
                <select name="" id="">
                  <option value="">Select</option>
                </select>
              </div>
            </div> */}
            <div className={styles.inputs}>
              {role == student || role == enabler ? (
                <>
                  <div className={styles.input_container}>
                    <div className={styles.grouped_inputs}>
                      <div style={role == student ? { width: "78%" } : { width: "100%" }} className={styles.input_container}>
                        <label htmlFor="">College</label>
                        <div className={styles.grouped_inputs}>
                          <select style={{ width: "100%" }} //78%
                            name="" id="" onChange={(e) => { setOrgnization(e.target.value); }}>
                            <option value="">Select</option>
                            {
                              collegeAPI.map((college, index) => {
                                return <option key={index} value={college.id}>{college.title}</option>
                              })
                            }
                          </select>
                          {/* <input
                            style={{ width: "20%" }}
                            type="button"
                            value="ADD"
                            onClick={onOpen}
                          /> */}
                        </div>
                      </div>
                      {role == student ? <div style={{ width: "20%" }} className={styles.input_container}>
                        <label htmlFor="">YOG</label>
                        <input type="number" onChange={(e) => setYof(e.target.value)} />
                      </div> : null}
                    </div>
                  </div>
                  <div className={styles.input_container}>
                    <label htmlFor="">Dept</label>
                    <select name="" id="" onChange={(e) => { setDept(e.target.value); }} >
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
                  <div className={styles.input_container}>
                    <label htmlFor="">Type</label>
                    <div className={styles.grouped_inputs}>
                      <select
                        style={{ width: "100%" }} //78%
                        name="" id="" onChange={(e) => { setMentorRole(e.target.value); }}>
                        <option value="Select">Select</option>
                        <option value="Company">Company</option>
                        <option value="Community Partner">Community Partner</option>
                        <option value="Induvidual">Induvidual</option>
                      </select>
                      {/* <input
                      style={{ width: "20%" }}
                      type="button"
                      value="ADD"
                      onClick={onOpen}
                    /> */}
                    </div>
                  </div>
                  {mentorRole == "Company" ? <div className={styles.input_container}>
                    <label htmlFor="">Company</label>
                    <select name="" id="" onChange={(e) => { setOrgnization(e.target.value); }} >
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
                      <select name="" id="" onChange={(e) => { setOrgnization(e.target.value); }} >
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
              {/* <div className={styles.input_container}>
                <label htmlFor="">District</label>
                <select name="" id="" onChange={(e) => { setDistrict(e.target.value); }} >
                  <option value="">Select</option>
                </select>
              </div> */}
            </div>
            <div className={styles.inputs}>
              {/* <div className={styles.input_container}> */}
              <label htmlFor="">Areas of Interest / Stack</label>


              {/* <select name="" id="" onChange={(e) => { setAreaOfInterest(["sgg"]) }} >
                <option value="" >Select</option>
                {aoiAPI.map((aoi, i) => { return <option key={i} value={aoi.id}>{aoi.name}</option> })}
              </select> */}

              <div className={styles.aoi_container}>
                {
                  aoiAPI.map((aoi, i) => {
                    return (
                      <label key={i}>
                        <input value={aoi.id} type="checkbox" onChange={(e) => {
                          e.target.checked ? setAreaOfInterest([...areaOfInterest, aoi.id]) : setAreaOfInterest(areaOfInterest.filter((aois) => aois != aoi.id));
                        }} />
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
              e.preventDefault();
              console.log("submit");
              const options = {
                method: 'POST',
                url: import.meta.env.VITE_BACKEND_URL+'/api/v1/user/register/',
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
              }).catch(function (error) {
                console.error(error);
              });
            }}>Submit</button>
          </div>
        </form>
      </div> : <div>error</div>}
    </div>
  );
};

export default Onboarding;
