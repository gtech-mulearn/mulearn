import React, { useEffect, useRef, useState } from "react";
import styles from "./UrlShortener.module.css";
import {
    getShortenUrls,
    createShortenUrl,
    editShortenUrl,
    deleteShortenUrl
} from "../Services/apis";

import { useNavigate } from "react-router-dom";
import TableTop from "../../../../../components/MuComponents/TableTop/TableTop";
import Table from "../../../../../components/MuComponents/Table/Table";
import THead from "../../../../../components/MuComponents/Table/THead";
import Pagination from "../../../../../components/MuComponents/Pagination/Pagination";
import { roles } from "../../../../../services/types";
import { hasRole } from "../../../../../services/common_functions";
import { useFormik } from "formik";
import { useToast } from "@chakra-ui/react";

const UrlShortener = () => {
    const columns = [];
    const [shortUrlData, setShortUrlData] = useState<any[]>([]);
    const [editBtn, setEditBtn] = useState(false);
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    const firstFetch = useRef(true)

    const [hasValidationError, setHasValidationError] = useState({
        error: false,
        message: ""
    });

    // const columnOrder = ["title","short_url", "long_url"];
    const columnOrder = [
        { column: "title", Label: "Title", isSortable: true },
        { column: "short_url", Label: "Short URL", isSortable: false },
        { column: "long_url", Label: "Long URL", isSortable: false }
    ];

    const editableColumnNames = ["Title", "Short URL", "Long URL"];
    useEffect(() => {
        if (firstFetch.current) {

            if (!hasRole([roles.ADMIN])) navigate("/404");
            getShortenUrls(setShortUrlData, 1, perPage, setTotalPages);
        }
        firstFetch.current = false;
    }, []);

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getShortenUrls(setShortUrlData, nextPage, perPage);
    };
    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getShortenUrls(setShortUrlData, prevPage, perPage);
    };

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getShortenUrls(setShortUrlData, 1, perPage, setTotalPages, search, "");
    };
    const handleEdit = (id: string | number | boolean) => {
        //console.log(formik.values.id);

        // navigate(`/interest-groups/edit/${id}`);
        formik.values.id = id.toString();
        formik.values.long_url = shortUrlData.filter(
            item => item.id === id
        )[0].long_url;
        formik.values.short_url = shortUrlData.filter(
            item => item.id === id
        )[0].short_url;
        formik.values.title = shortUrlData.filter(
            item => item.id === id
        )[0].title;
        setEditBtn(true);
    };
    const handleDelete = (id: string | number | boolean) => {
        deleteShortenUrl(id.toString(), toast);
        getShortenUrls(setShortUrlData, 1, perPage, setTotalPages);
    };
    const handlePerPageNumber = (selectedValue: number) => {
        setPerPage(selectedValue);
        setCurrentPage(1);
        getShortenUrls(
            setShortUrlData,
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
            getShortenUrls(
                setShortUrlData,
                1,
                perPage,
                setTotalPages,
                "",
                `-${column}`
            );
        } else {
            setSort(column);
            getShortenUrls(
                setShortUrlData,
                1,
                perPage,
                setTotalPages,
                "",
                column
            );
        }
        //console.log(`Icon clicked for column: ${column}`);
    };

    // formik
    const initialValues = {
        id: "",
        title: "",
        long_url: "",
        short_url: ""
    };

    const onSubmit = async (values: any, { setErrors, resetForm }: any) => {
        const urlEditedData = {
            title: values.title,
            long_url: values.long_url,
            short_url: values.short_url
        };
        //console.log(urlEditedData);
        createShortenUrl(
            toast,
            urlEditedData,
            formik,
            setHasValidationError
            // userData,
            // navigate
        );
        getShortenUrls(setShortUrlData, 1, perPage, setTotalPages);
    };

    const onSubmitEdit = async (values: any, { setErrors, resetForm }: any) => {
        const urlData = {
            shortUrlNew: values.short_url
        };
        //console.log(urlData);
        editShortenUrl(
            values.id,
            toast,
            urlData,
            formik,
            setHasValidationError
        );
        getShortenUrls(setShortUrlData, 1, perPage, setTotalPages);
        !hasValidationError.error ? setEditBtn(false) : null;
    };

    const validate = (values: any) => {
        //console.log(values);

        let errors: any = {};
        if (values.title === "" || values.title === undefined) {
            errors.title = "Required";
        }
        if (values.long_url === "" || values.long_url === undefined) {
            errors.long_url = "Required";
        }
        if (values.short_url === "" || values.short_url === undefined) {
            errors.short_url = "Required";
        }
        return errors;
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });
    // useEffect(() => {
    //     setEditBtn(false);
    // }, [formik.handleChange]);
    // console.log(hasValidationError.error);

    return (
        <>
            <div className={styles.url_shortener_container}>
                {hasValidationError.error ? (
                    <div className={styles.validation_error_message}>
                        <p>{hasValidationError.message}</p>
                    </div>
                ) : (
                    ""
                )}
                <div className={styles.create_new_url}>
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            className={styles.title}
                            type="text"
                            name="title"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            placeholder="Title"
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <p className={styles.error_message}>
                                {formik.errors.title}
                            </p>
                        ) : null}
                        <input
                            className={styles.long_url}
                            type="url"
                            name="long_url"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.long_url}
                            placeholder="Paste long url"
                            required
                        />
                        {formik.touched.long_url && formik.errors.long_url ? (
                            <p className={styles.error_message}>
                                {formik.errors.long_url}
                            </p>
                        ) : null}
                        <div className={styles.short_url_input}>
                            <input
                                className={styles.short_url}
                                type="url"
                                name="short_url"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.short_url}
                                placeholder="Enter short url"
                                required
                            />
                            {!editBtn ? (
                                <input
                                    className={styles.submit}
                                    type="submit"
                                    value="Create"
                                    onClick={e => {
                                        e.preventDefault();
                                        validate(formik.values);
                                        if (
                                            formik.values.title &&
                                            formik.values.long_url &&
                                            formik.values.short_url
                                        ) {
                                            onSubmit(
                                                formik.values,
                                                formik.resetForm
                                            );
                                            getShortenUrls(
                                                setShortUrlData,
                                                1,
                                                perPage,
                                                setTotalPages
                                            );
                                        } else {
                                            validate(formik.values);
                                            console.log("error");
                                        }
                                    }}
                                ></input>
                            ) : (
                                <input
                                    className={styles.submit}
                                    type="submit"
                                    value="Edit"
                                    onClick={e => {
                                        e.preventDefault();
                                        validate(formik.values);
                                        if (
                                            formik.values.title &&
                                            formik.values.long_url &&
                                            formik.values.short_url
                                        ) {
                                            onSubmitEdit(
                                                formik.values,
                                                formik.resetForm
                                            );
                                            getShortenUrls(
                                                setShortUrlData,
                                                1,
                                                perPage,
                                                setTotalPages
                                            );
                                            // formik.handleReset(formik.values);
                                        } else {
                                            validate(formik.values);
                                            console.log("error");
                                        }
                                    }}
                                ></input>
                            )}
                        </div>
                        {formik.touched.short_url && formik.errors.short_url ? (
                            <p className={styles.error_message}>
                                {formik.errors.short_url}
                            </p>
                        ) : null}
                    </form>
                </div>
            </div>
            <TableTop
                onSearchText={handleSearch}
                onPerPageNumber={handlePerPageNumber}
            />
            {shortUrlData && (
                <Table
                    rows={shortUrlData}
                    page={currentPage}
                    perPage={perPage}
                    columnOrder={columnOrder}
                    id={["id"]}
                    onEditClick={handleEdit}
                    onDeleteClick={handleDelete}
                >
                    <THead
                        columnOrder={columnOrder}
                        // editableColumnNames={editableColumnNames}
                        onIconClick={handleIconClick}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        margin="10px 0"
                        handleNextClick={handleNextClick}
                        handlePreviousClick={handlePreviousClick}
                    />
                    {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                </Table>
            )}
        </>
    );
};

export default UrlShortener;
