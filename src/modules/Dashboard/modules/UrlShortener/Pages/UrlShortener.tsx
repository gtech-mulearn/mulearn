import React, { useEffect, useState } from "react";
import styles from "./UrlShortener.module.css";
import {
    getShortenUrls,
    createShortenUrl,
    editShortenUrl,
    deleteShortenUrl
} from "../Services/apis";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import { useFormik } from "formik";
import { useToast } from "@chakra-ui/react";
import { MuButtonLight } from "@/MuLearnComponents/MuButtons/MuButton";

const UrlShortener = () => {
    // const [hasValidationError, setHasValidationError] = useState({
    //     error: false,
    //     message: ""
    // });

    const columnOrder = [
        { column: "title", Label: "Title", isSortable: true },
        { column: "short_url", Label: "Short URL", isSortable: false },
        { column: "long_url", Label: "Long URL", isSortable: false }
    ];

    const toast = useToast();
    const [editBtn, setEditBtn] = useState(false);
    const [shortUrlData, setShortUrlData] = useState([
        {
            id: "",
            long_url: "",
            short_url: "",
            title: ""
        }
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [columns, setColumns] = useState(columnOrder);
    const [sort, setSort] = useState("");

    const formik = useFormik({
        initialValues: {
            id: "",
            title: "",
            longUrl: "",
            shortUrl: ""
        },
        onSubmit: values => {
            const urlCreateData = {
                id: values.id,
                title: values.title,
                long_url: values.longUrl,
                short_url: "mulearn.org/r/" + values.shortUrl
            };
            if (!editBtn) {
                createShortenUrl(toast, urlCreateData);
                setShortUrlData([...shortUrlData, urlCreateData]);
                setTimeout(() => {
                    getShortenUrls(setShortUrlData, 1, perPage, setTotalPages);
                }, 500);
                setEditBtn(false);
            } else {
                if (
                    shortUrlData.some(
                        item =>
                            item.short_url ===
                            "mulearn.org/r/" + values.shortUrl
                    ) &&
                    shortUrlData.some(item => item.title === values.title)
                ) {
                    toast({
                        title: "Short URL already exists.",
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    });
                } else {
                    editShortenUrl(values.id, toast, urlCreateData);
                    setShortUrlData([
                        ...shortUrlData.filter(item => item.id !== values.id),
                        urlCreateData
                    ]);
                }
            }
        },
        validate: (values: any) => {
            let errors: any = {};
            if (!values.title) {
                errors.title = "Required";
            }
            if (!values.longUrl) {
                errors.longUrl = "Required";
            }
            if (!values.shortUrl) {
                errors.shortUrl = "Required";
            }
            return errors;
        }
    });

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getShortenUrls(setShortUrlData, 1, perPage, setTotalPages);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getShortenUrls(setShortUrlData, 1, perPage, setTotalPages);
    };
    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getShortenUrls(setShortUrlData, 1, perPage, setTotalPages, search, "");
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
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
    };

    const handleEdit = (id: string | number | boolean) => {
        formik.setFieldValue("id", id);
        formik.setFieldValue(
            "title",
            shortUrlData.filter(item => item.id === id)[0].title
        );
        formik.setFieldValue(
            "longUrl",
            shortUrlData.filter(item => item.id === id)[0].long_url
        );
        formik.setFieldValue(
            "shortUrl",
            shortUrlData.filter(item => item.id === id)[0].short_url.slice(14)
        );
        setEditBtn(true);
    };

    const handleDelete = (id: any) => {
        deleteShortenUrl(id.toString(), toast);
        setShortUrlData(shortUrlData.filter(item => item.id !== id));
    };

    useEffect(() => {
        getShortenUrls(setShortUrlData, 1, perPage, setTotalPages);
    }, []);

    return (
        <>
            <div className={styles.url_shortener_container}>
                <div className={styles.create_new_url}>
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
                        {formik.touched.title && formik.errors.title ? (
                            <p className={styles.error_message}>
                                {formik.errors.title}
                            </p>
                        ) : null}
                        <input
                            className={styles.long_url}
                            type="url"
                            name="longUrl"
                            onChange={formik.handleChange}
                            value={formik.values.longUrl}
                            onBlur={formik.handleBlur}
                            placeholder="Paste long url"
                            required
                        />
                        {formik.touched.longUrl && formik.errors.longUrl ? (
                            <p className={styles.error_message}>
                                {formik.errors.longUrl}
                            </p>
                        ) : null}
                        <div className={styles.short_url_input_container}>
                            <div className={styles.short_url_input_container_div}>
                                <div className={styles.short_url_input}>
                                    <label htmlFor="">mulearn.org/r/</label>
                                    <input
                                        className={styles.short_url}
                                        type="text"
                                        name="shortUrl"
                                        onChange={formik.handleChange}
                                        value={formik.values.shortUrl}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter short url"
                                        required
                                    />
                                </div>
                                {formik.touched.shortUrl &&
                                formik.errors.shortUrl ? (
                                    <p className={styles.error_message}>
                                        {formik.errors.shortUrl}
                                    </p>
                                ) : null}
                            </div>
                            <div className={styles.form_btns}>
                                <MuButtonLight
                                    text="Cancel"
                                    style={{
                                        width: "fit-content",
                                        minWidth: "auto",
                                        margin: "20px 0px 0px"
                                    }}
                                    onClick={() => {
                                        formik.handleReset(formik.values);
                                    }}
                                />

                                {!editBtn ? (
                                    <input
                                        className={styles.submit}
                                        type="submit"
                                        value="Create"
                                    />
                                ) : (
                                    <input
                                        className={styles.submit}
                                        type="submit"
                                        value="Edit"
                                    ></input>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <TableTop
                onSearchText={handleSearch}
                onPerPageNumber={handlePerPageNumber}
                // CSV={`${dashboardRoutes.getShortUrlData}/csv`}
            />
            {shortUrlData && (
                <Table
                    rows={shortUrlData.filter((item, index) => item.id !== "")}
                    page={currentPage}
                    perPage={perPage}
                    columnOrder={columns}
                    id={["id"]}
                    onEditClick={handleEdit}
                    modalTypeContent="error"
                    modalDeleteContent={`Are you sure you want to delete this organization?`}
                    onDeleteClick={handleDelete}
                >
                    <THead
                        columnOrder={columns}
                        onIconClick={handleIconClick}
                        // action={true}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        margin="10px 0"
                        handleNextClick={handleNextClick}
                        handlePreviousClick={handlePreviousClick}
                    />
                </Table>
            )}
        </>
    );
};

export default UrlShortener;
