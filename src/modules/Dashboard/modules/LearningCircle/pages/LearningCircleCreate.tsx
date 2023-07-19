import styles from "./LearningCircle.module.css";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import {FormikSelect, FormikTextInput} from '@/MuLearnComponents/FormikComponents/FormikComponents'
type Props = {};

const LearningCircleCreate = (props: Props) => {
    
    const createLearningCircleSchema = Yup.object().shape({
        circle_name: Yup.string()
            .required("Required")
            .min(2, "Too Short!")
            .max(30, "Too Long!"),
        interest_group: Yup.string()
            .required("Required")
            .min(2, "Too Short!")
            .max(50, "Too Long!"),
    })

    return (
        <>
            <div className={styles.LearningCircleCreateContent}>

                <div className={styles.LearningCircleCreateMain}>
                    <img src="https://i.ibb.co/RhT8b3z/image-24.png" alt="" />

                    <div className={styles.LearningCircleCreateHeading}>
                        <div>
                            <b>Create a Learning circle</b>
                            <p>Connect, Collaborate, and Learn Together!</p>
                        </div>

                        
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    circle_name:"",
                                    interest_group:""
                                }}
                                validationSchema={createLearningCircleSchema}
                                onSubmit={(values,{resetForm}) =>{
                                    console.log(values.circle_name,values.interest_group)
                                    resetForm()
                                }}
                            >
                                <Form>
                                    <div className={styles.LearningCircleCreateForm}>
                                        <FormikTextInput 
                                            type="text"
                                            name="circle_name" 
                                            placeholder="Learning circle name"
                                        />
                                        <FormikSelect 
                                            name="interest_group" 
                                            placeholder="Interest group"
                                        >
                                            <option value="">Select an option</option>
                                        </FormikSelect>
                                    </div>
                                    <button type="submit">Create</button>
                                </Form>
                            </Formik>
                            
                            {/* <input type="text" placeholder="Learning circle name" />
                            <input type="text" placeholder="Interest group" /> */}
                        

                        
                    </div>
                </div>

            </div>
        </>
    );
}

export default LearningCircleCreate;