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
    const columnOrder:ColOrder[] = [
        { column: "title", Label: "Title", isSortable: true },
        { column: "short_url", Label: "Short URL", isSortable: false },
        { column: "long_url", Label: "Long URL", isSortable: false }
    ];

    const toast = useToast();
    const [editBtn, setEditBtn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");
    const [shortUrlData, setShortUrlData] = useState([
        {
            id: "",
            long_url: "",
            short_url: "",
            title: ""
        }
    ]);
    const [hasValidationError, setHasValidationError] = useState({
        error: false,
        message: ""
    });

    const formik = useFormik({
        initialValues: {
            id: "",
            title: "",
            longUrl: "",
            short_url: ""
        },
        onSubmit: values => {
            const urlCreateData = {
                id: values.id,
                title: values.title,
                long_url: values.longUrl,
                short_url: values.short_url
            };
            if (!editBtn) {
                createShortenUrl(
                    toast,
                    urlCreateData,
                    formik,
                    setHasValidationError
                );
                setShortUrlData(prevShortUrlData => [
                    ...prevShortUrlData.filter(item => item.id !== values.id),
                    {
                        ...urlCreateData,
                        short_url:
                            import.meta.env.VITE_BACKEND_URL_AUTH +
                            "/r/" +
                            urlCreateData.short_url
                    }
                ]);
                setTimeout(() => {
                    getShortenUrls(setShortUrlData, 1, perPage, setTotalPages);
                    // formik.handleReset(formik.values);
                }, 500);
                setEditBtn(false);
            } else {
                editShortenUrl(values.id, toast, urlCreateData);
                setShortUrlData(prevShortUrlData => [
                    ...prevShortUrlData.filter(item => item.id !== values.id),
                    {
                        ...urlCreateData,
                        short_url:
                            import.meta.env.VITE_BACKEND_URL_AUTH +
                            "/r/" +
                            urlCreateData.short_url
                    }
                ]);

                formik.handleReset(formik.values);
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
            if (!values.short_url) {
                errors.short_url = "Required";
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
            "short_url",
            shortUrlData
                .filter(item => item.id === id)[0]
                .short_url.replace(
                    import.meta.env.VITE_BACKEND_URL_AUTH + "/r/",
                    ""
                )
        );
        setEditBtn(true);
    };

    const handleDelete = (id: any) => {
        deleteShortenUrl(id.toString(), toast);
        setShortUrlData(shortUrlData.filter(item => item.id !== id));
    };
    const handleCopy = (id: any) => {
        navigator.clipboard.writeText(
            shortUrlData.filter(item => item.id === id)[0].short_url
        );
        console.log(shortUrlData.filter(item => item.id === id)[0].short_url);
        toast({
            title: "Copied",
            status: "success",
            duration: 2000,
            isClosable: true
        });
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
                            <div
                                className={styles.short_url_input_container_div}
                            >
                                <div className={styles.short_url_input}>
                                    <label htmlFor="">mulearn.org/r/</label>
                                    <input
                                        className={styles.short_url}
                                        type="text"
                                        name="short_url"
                                        onChange={formik.handleChange}
                                        value={formik.values.short_url}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter short url"
                                        required
                                    />
                                </div>
                                {formik.touched.short_url &&
                                formik.errors.short_url ? (
                                    <p className={styles.error_message}>
                                        {formik.errors.short_url}
                                    </p>
                                ) : null}
                            </div>
                            <div className={styles.form_btns}>
                                <MuButtonLight
                                    text="Cancel"
                                    style={{
                                        width: "fit-content",
                                        minWidth: "auto",
                                        margin: "20px 0px 0px",
                                        color: "#5570F1",
                                        backgroundColor: "#F3F3F4",
                                    }}
                                    onClick={() => {
                                        formik.handleReset(formik.values);
                                        setEditBtn(false);
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

            {shortUrlData[0].id !== "" && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                    />
                    <Table
                        rows={shortUrlData}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columnOrder}
                        id={["id"]}
                        onEditClick={handleEdit}
                        onDeleteClick={handleDelete}
                        onCopyClick={handleCopy}
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
                </>
            )}
        </>
    );
};

export default UrlShortener;
