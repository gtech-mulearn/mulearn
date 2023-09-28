import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { addOrganizer, getOrganizers } from "../services/HackathonApis";
import { useEffect, useState } from "react";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Table, { Data } from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import { Blank } from "@/MuLearnComponents/Table/Blank";

type Props = {};

export const HackathonOrganizers = (props: Props) => {
    const [data, setData] = useState<Data[]>([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const columnOrder = [
        { column: "full_name", Label: "Name", isSortable: false },
        { column: "email", Label: "Email", isSortable: false },
        { column: "muid", Label: "Mu ID", isSortable: false },
    ];

    useEffect(() => {
        getOrganizers(setData, id);
    }, []);

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
                        addOrganizer(id, values.muid);
                        getOrganizers(setData, id);
                        setTimeout(() => {
                            getOrganizers(setData, id);
                            navigate(`/dashboard/hackathon/organizers/${id}`);
                        }, 2000);
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
                            children="Add Organizer"
                            type="submit" style={{ margin: "23px 0 0 0" }}
                        />
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
                        rows={data}
                        page={1}
                        perPage={50}
                        columnOrder={columnOrder}
                        id={["id"]}
                    >
                        <THead
                            columnOrder={columnOrder}
                            onIconClick={() => { }}
                        />
                        <Blank />
                    </Table>
                )}
            </>
        </div>
    );
};
