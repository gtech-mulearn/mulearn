import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { addOrganizer, getOrganizers } from "../services/HackathonApis";
import { useEffect, useState } from "react";
import { HackList } from "../services/HackathonInterfaces";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import { Blank } from "@/MuLearnComponents/Table/Blank";

type Props = {};

export const HackathonOrganizers = (props: Props) => {
    const [data, setData] = useState("data");
    const toast = useToast();
    const { id } = useParams();
    const columnOrder = [
        { column: "name", Label: "Name", isSortable: true },
        { column: "user_ig_link_ig", Label: "Members", isSortable: false },
        { column: "updated_by", Label: "Updated By", isSortable: false },
        { column: "created_by", Label: "Created By", isSortable: false },
        { column: "created_at", Label: "Created On", isSortable: false }
    ];

	useEffect(() => {
		getOrganizers(setData, id)
	}, [])
	

    const handleNothing = () => {
        console.log("clicked nothing");
    };

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>ORGANIZERS</h1>
                <Formik
                    initialValues={{
                        muid: ""
                    }}
                    validationSchema={Yup.object({
                        muid: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required")
                    })}
                    onSubmit={values => {
                        console.log(values.muid);
                        addOrganizer(id, values.muid, toast);
                    }}
                >
                    <Form className={styles.inputContainer}>
                        <FormikTextInput
                            label="Mu ID"
                            name="muid"
                            type="text"
                            placeholder="Enter Mu ID"
                        />

                        <PowerfulButton
                            text={"Add Organizer"}
                            type={"submit"}
                            margin="23px 0 0 0"
                        ></PowerfulButton>
                    </Form>
                </Formik>
            </div>
            <>
                {/* <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        CSV={dashboardRoutes.getIgList}
                    /> */}
                {data && (
                    <Table
                        rows={columnOrder}
                        page={1}
                        perPage={50}
                        columnOrder={columnOrder}
                        id={["id"]}
                    >
                        <THead
                            columnOrder={columnOrder}
                            onIconClick={handleNothing}
                        />
                        <Blank />
                    </Table>
                )}
            </>
        </div>
    );
};
