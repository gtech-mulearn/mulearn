import { useEffect, useState } from "react";
import styles from "./Affiliation.module.css";
import {
    getAffiliation,
    createAffiliation,
    editAffiliation,
    deleteAffiliation
} from "../Services/apis";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import { useFormik } from "formik";

import {
    MuButton,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";
import { Blank } from "@/MuLearnComponents/Table/Blank";

type urlData = {
    id: string | number | boolean;
    title: string;
};
const Affiliation = () => {
    const columnOrder: ColOrder[] = [
        { column: "title", Label: "Title", isSortable: true },
        {
            column: "organization_count",
            Label: "No. of Organizations",
            isSortable: false
        },
        { column: "created_by", Label: "Created By", isSortable: false },
        { column: "created_at", Label: "Created At", isSortable: false },
        { column: "updated_by", Label: "Updated By", isSortable: false },
        { column: "updated_at", Label: "Updated At", isSortable: false }
    ];

    const [editBtn, setEditBtn] = useState(false);
    const [createBtn, setCreateBtn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(20);
    const [sort, setSort] = useState("-created_at");
    const [affiliationData, setAffiliationData] = useState<urlData[]>([]);

    const formik = useFormik({
        initialValues: {
            id: "",
            title: ""
        },
        onSubmit: values => {
            const affiliationCreateData = {
                id: values.id,
                title: values.title
            };
            if (!editBtn) {
                createAffiliation(affiliationCreateData, formik).then(
                    result => {
                        if (result) {
                            setTimeout(() => {
                                getAffiliation(
                                    setAffiliationData,
                                    1,
                                    perPage,
                                    setTotalPages
                                );
                            }, 500);
                            setEditBtn(false);
                            setCreateBtn(false);
                        }
                    }
                );
            } else {
                editAffiliation(values.id, affiliationCreateData, formik).then(
                    result => {
                        if (result) {
                            setTimeout(() => {
                                getAffiliation(
                                    setAffiliationData,
                                    1,
                                    perPage,
                                    setTotalPages
                                );
                            }, 500);
                            formik.handleReset(formik.values);
                            setEditBtn(false);
                        }
                    }
                );
            }
        },
        validate: (values: any) => {
            let errors: any = {};
            if (!values.title) {
                errors.title = "Required";
            }
            return errors;
        }
    });

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getAffiliation(setAffiliationData, nextPage, perPage, setTotalPages);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getAffiliation(setAffiliationData, 1, perPage, setTotalPages);
    };

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getAffiliation(
            setAffiliationData,
            1,
            perPage,
            setTotalPages,
            search,
            ""
        );
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getAffiliation(
            setAffiliationData,
            1,
            selectedValue,
            setTotalPages,
            "",
            ""
        );
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getAffiliation(
                setAffiliationData,
                currentPage,
                perPage,
                setTotalPages,
                "",
                `-${column}`,
                setLoading
            );
        } else {
            setSort(column);
            getAffiliation(
                setAffiliationData,
                currentPage,
                perPage,
                setTotalPages,
                "",
                column,
                setLoading
            );
        }
    };

    const handleEdit = (id: string | number | boolean) => {
        formik.setFieldValue("id", id);
        console.log(id);
        formik.setFieldValue(
            "title",
            affiliationData.filter(item => item?.id === id)[0].title
        );
        setEditBtn(true);
    };

    const handleDelete = (id: any) => {
        deleteAffiliation(id.toString());
        setAffiliationData(affiliationData.filter(item => item?.id !== id));
    };

    useEffect(() => {
        getAffiliation(
            setAffiliationData,
            1,
            perPage,
            setTotalPages,
            "",
            sort,
            setLoading
        );
    }, []);

    return (
        <>
            <PowerfulButton
                onClick={() => setCreateBtn(true)}
                style={{
                    width: "fit-content",
                    minWidth: "auto",
                    backgroundColor: "#556FF1",
                    color: "#fff",
                    margin: "auto",
                    marginRight: "3%"
                }}
            >
                Create
            </PowerfulButton>
            {(editBtn || createBtn) && (
                <div className={styles.affiliation_container}>
                    <div className={styles.create_affiliation}>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                className={styles.title}
                                type="text"
                                name="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                onBlur={formik.handleBlur}
                                placeholder="Title"
                                required
                            />
                            {formik.touched.title && formik.errors.title && (
                                <p className={styles.error_message}>
                                    {formik.errors.title}
                                </p>
                            )}

                            <div className={styles.affiliation_input_container}>
                                <div className={styles.form_btns}>
                                    <PowerfulButton
                                        type="reset"
                                        children="Cancel"
                                        variant="secondary"
                                        style={{
                                            width: "fit-content",
                                            minWidth: "auto",
                                            margin: "20px 0px 0px"
                                        }}
                                        onClick={() => {
                                            formik.handleReset(formik.values);
                                            setEditBtn(false);
                                            setCreateBtn(false);
                                        }}
                                    />
                                    <PowerfulButton
                                        type="submit"
                                        style={{
                                            width: "100%",
                                            minWidth: "150px",
                                            margin: "20px 0px 0px"
                                        }}
                                        children={editBtn ? "Edit" : "Create"}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <>
                <TableTop
                    onSearchText={handleSearch}
                    onPerPageNumber={handlePerPageNumber}
                />
                <Table
                    rows={affiliationData}
                    page={currentPage}
                    perPage={perPage}
                    columnOrder={columnOrder}
                    id={["id"]}
                    onEditClick={handleEdit}
                    onDeleteClick={handleDelete}
                    isloading={loading}
                >
                    <THead
                        columnOrder={columnOrder}
                        onIconClick={handleIconClick}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        margin="10px 0"
                        handleNextClick={handleNextClick}
                        handlePreviousClick={handlePreviousClick}
                        onPerPageNumber={handlePerPageNumber}
                        perPage={perPage}
                        setPerPage={setPerPage}
                    />
                    <Blank />
                </Table>
            </>
        </>
    );
};

export default Affiliation;
