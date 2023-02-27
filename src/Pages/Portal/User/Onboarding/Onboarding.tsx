import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./Onboarding.module.css";
type Props = {};

const Onboarding = (props: Props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState(0)
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [role, setRole] = useState('')
  const [college, setCollege] = useState('')
  const [company, setCompany] = useState('')
  const [district, setDistrict] = useState('')


  const [newCompany, setNewCompany] = useState('')
  const [newCollege, setNewCollege] = useState('')
  const [newDomain, setNewDomain] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  return (
    <div className={styles.onboarding_page}>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent margin="1rem">
          <ModalHeader>{`Create your ${role === "Student" ? "College" : "Company"}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>{`${role === "Student" ? "College" : "Company"} name`}</FormLabel>
              <Input ref={initialRef} placeholder='Company' onChange={(e) => { setNewCompany(e.target.value) }} />
            </FormControl>

            {role === "Mentor" ?
              <FormControl mt={4}>
                <FormLabel>Company domain</FormLabel>
                <Input placeholder='Domain' onChange={(e) => { setNewDomain(e.target.value) }} />
              </FormControl>
              : null
            }

            <FormControl mt={4}>
              <FormLabel>District</FormLabel>
              <Input placeholder='Select' onChange={(e) => { setDistrict(e.target.value) }} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={"facebook"} mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className={styles.form_container}>
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
                <input type="text" placeholder="First name" className={styles.input} onChange={(e) => { setFirstName(e.target.value) }} />
              </div>
              <div className={styles.input_container}>
                <label htmlFor=""></label>
                <input type="text" placeholder="Last name" className={styles.input} onChange={(e) => { setLastName(e.target.value) }} />
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
                <input type="email" placeholder="username@domain.com" className={styles.input} onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className={styles.input_container}>
                <label htmlFor="">Phone number</label>
                <div className={styles.grouped_inputs}>
                  <select style={{ width: "20%", textAlign: "center" }} name="" id="">
                    <option value="+91">🏳️‍🌈 +91</option>
                  </select>
                  <input style={{ width: "78%" }} type="text" placeholder="8023456789" onChange={(e) => { setPhone(e.target.valueAsNumber) }} />
                </div>
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input_container}>
                <div className={styles.grouped_inputs}>
                  <div style={{ width: "49%" }} className={styles.input_container}>
                    <label htmlFor="">Gender</label>
                    <select name="" id="" onChange={(e) => { setGender(e.target.value) }}>
                      <option value="+91"><span className={styles.gender}>♂</span> Male</option>
                    </select>
                  </div>
                  <div style={{ width: "49%" }} className={styles.input_container}>
                    <label htmlFor="">Date of Birth</label>
                    <input type="date" placeholder="dd/mm/yyyy" className={styles.input} onChange={(e) => { setDob(e.target.value) }} />
                  </div>
                </div>
              </div>
              <div className={styles.input_container}>
                <label htmlFor="">Role</label>
                <select name="" id="" onChange={(e) => { setRole(e.target.value) }}>
                  <option value="">Select</option>
                  <option value="Student">Student</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Enablers">Enablers</option>
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
              {
                role == "Student" || role == "Enablers" ?

                  <div className={styles.input_container}>
                    <label htmlFor="">College</label>
                    <div className={styles.grouped_inputs}>
                      <select style={{ width: "78%" }} name="" id="" onChange={(e) => { setCollege(e.target.value) }}>
                        <option value="">Select</option>
                      </select>
                      <input style={{ width: "20%" }} type="button" value="ADD" onClick={onOpen} />
                    </div>
                  </div>
                  :
                  <div className={styles.input_container}>
                    <label htmlFor="">Company</label>
                    <div className={styles.grouped_inputs}>
                      <select style={{ width: "78%" }} name="" id="" onChange={(e) => { setCompany(e.target.value) }}>
                        <option value="">Select</option>
                      </select>
                      <input style={{ width: "20%" }} type="button" value="ADD" onClick={onOpen} />
                    </div>
                  </div>
              }
              <div className={styles.input_container}>
                <label htmlFor="">District</label>
                <select name="" id="" onChange={(e) => { setDistrict(e.target.value) }}>
                  <option value="">Select</option>
                </select>
              </div>
            </div>
            <div className={styles.inputs}>
              {/* <div className={styles.input_container}> */}
              <label htmlFor="">Areas of Interest</label>
              <input type="text" />
              {/* </div> */}
            </div>
          </div>
          <div className={styles.form_buttons}>
            <button type="reset">Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
