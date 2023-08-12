import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { createInterestGroups, editInterestGroups, getIGDetails } from "./apis";

type Props = {};

interface IgDetails{
    name:string,
    code:string,
    icon:string,
}

const InterestGroupCreate = (props: Props) => {
    const toast = useToast();
    const navigate = useNavigate();
    const { id } = useParams();
    const [input, setInput] = useState<IgDetails>({
        name:'',
        code:'',
        icon:'',
    });
    const [hasError,setHasError] = useState(false)

    useEffect(() =>{
        if (id){
     getIGDetails(id,setInput);
    }
    },[id]);

console.log('id',input)
    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>{!id ? "CREATE IG GROUP" : "EDIT IG GROUP"}</h1>
                <Formik
                    initialValues={{
                        igName: input.name,
						igCode: input.code,
						igIcon: input.icon,
                    }}
                    enableReinitialize
                    validationSchema={Yup.object({
                        igName: Yup.string()
                            .max(50, "Must be 50 characters or less")
                            .required("Required"),
                        igCode: Yup.string()
                            .max(10, "Must be 10 characters or less")
                            .required("Required"),
                        igIcon: Yup.string()
                            .max(10, "Must be 10 characters or less")
                            .required("Required")
                    })}
                    onSubmit={values => {
                        console.log(values);
                        if(!id){
                            
                            createInterestGroups(values.igName, values.igCode, values.igIcon, toast)
                            setTimeout(() => {
                                navigate(`/dashboard/interest-groups`);
                            }, 1000);
                        }else{
                            editInterestGroups(
                                values.igName,
                                id,
                                values.igCode,
                                values.igIcon,
                                setHasError,
                                toast
                              );
                              
                             setTimeout(() => {
                                navigate(`/dashboard/interest-groups`);
                             },200);
                        }
                    }}
                >
                    <Form className={styles.inputContainer}>
                        <FormikTextInput
                            label="IG Name"
                            name="igName"
                            type="text"
                            placeholder="Enter IG Name"
                        />
                        <FormikTextInput
                            label="IG Code"
                            name="igCode"
                            type="text"
                            placeholder="Enter IG Code"
                        />
                        <FormikTextInput
                            label="IG Icon"
                            name="igIcon"
                            type="text"
                            placeholder="Enter IG Icon"
                        />

                        <PowerfulButton
                            text={"Submit"}
                            type={"submit"}
                            margin="23px 0 0 0"
                        ></PowerfulButton>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default InterestGroupCreate;
