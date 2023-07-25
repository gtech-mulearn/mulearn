import React, { useEffect, useRef, useState } from "react";
import styles from "./UrlShortener.module.css";
import {
    getShortenUrls,
    createShortenUrl,
    editShortenUrl,
    deleteShortenUrl
} from "../Services/apis";
// import { useNavigate } from "react-router-dom";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
// import { roles } from "@/MuLearnServices/types";
// import { hasRole } from "@/MuLearnServices/common_functions";
// import { useFormik } from "formik";
import { useToast } from "@chakra-ui/react";
import { MuButtonLight } from "@/MuLearnComponents/MuButtons/MuButton";

//TODO: Complete work rework
const UrlShortener = () => {
    // const columns = [];
    // const firstFetch = useRef(true);

    // const [hasValidationError, setHasValidationError] = useState({
    //     error: false,
    //     message: ""
    // });

    // const editableColumnNames = ["Title", "Short URL", "Long URL"];
    // useEffect(() => {
    //     if (firstFetch.current) {
    //         if (!hasRole([roles.ADMIN])) navigate("/404");
    //         getShortenUrls(setShortUrlData, 1, perPage, setTotalPages);
    //     }
    //     firstFetch.current = false;
    // }, []);

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
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

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
        //console.log(`Icon clicked for column: ${column}`);
    };

    const handleEdit = (id: string | number | boolean) => {
        //console.log(formik.values.id);
        setId(id.toString());
        setTitle(shortUrlData.filter(item => item.id === id)[0].title);
        setLongUrl(shortUrlData.filter(item => item.id === id)[0].long_url);
        setShortUrl(
            shortUrlData.filter(item => item.id === id)[0].short_url.slice(12)
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
                    <form>
                        <input
                            className={styles.title}
                            type="text"
                            name="title"
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                            placeholder="Title"
                            required
                        />
                        {/* {formik.touched.title && formik.errors.title ? (
                            <p className={styles.error_message}>
                                {formik.errors.title}
                            </p>
                        ) : null} */}
                        <input
                            className={styles.long_url}
                            type="url"
                            name="long_url"
                            onChange={e => {
                                setLongUrl(e.target.value);
                                setEditBtn(false);
                            }}
                            value={longUrl}
                            placeholder="Paste long url"
                            required
                        />
                        {/* {formik.touched.long_url && formik.errors.long_url ? (
                            <p className={styles.error_message}>
                                {formik.errors.long_url}
                            </p>
                        ) : null} */}
                        <div className={styles.short_url_input_container}>
                            <div className={styles.short_url_input}>
                                <label htmlFor="">mulearn.org/</label>
                                <input
                                    className={styles.short_url}
                                    type="text"
                                    name="short_url"
                                    onChange={e => setShortUrl(e.target.value)}
                                    value={shortUrl}
                                    placeholder="Enter short url"
                                    required
                                />
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
                                        setTitle("");
                                        setLongUrl("");
                                        setShortUrl("");
                                        setEditBtn(false);
                                    }}
                                />

                                {!editBtn ? (
                                    <input
                                        className={styles.submit}
                                        type="submit"
                                        value="Create"
                                        onClick={async e => {
                                            e.preventDefault();
                                            if (title && longUrl && shortUrl) {
                                                const urlCreateData = {
                                                    id: "",
                                                    title: title,
                                                    long_url: longUrl,
                                                    short_url:
                                                        "mulearn.org/" +
                                                        shortUrl
                                                };
                                                await createShortenUrl(
                                                    toast,
                                                    urlCreateData
                                                );
                                                setShortUrlData([
                                                    ...shortUrlData,
                                                    urlCreateData
                                                ]);
                                                setTimeout(() => {
                                                    getShortenUrls(
                                                        setShortUrlData,
                                                        1,
                                                        perPage,
                                                        setTotalPages
                                                    );
                                                }, 500);
                                                setEditBtn(false);
                                            } else {
                                                console.log("error");
                                            }
                                        }}
                                    />
                                ) : (
                                    <input
                                        className={styles.submit}
                                        type="button"
                                        value="Edit"
                                        onClick={e => {
                                            e.preventDefault();

                                            if (
                                                shortUrlData.some(
                                                    item =>
                                                        item.short_url ===
                                                        "mulearn.org/" +
                                                            shortUrl
                                                ) &&
                                                shortUrlData.some(
                                                    item => item.title === title
                                                )
                                            ) {
                                                toast({
                                                    title: "Short URL already exists.",
                                                    status: "error",
                                                    duration: 3000,
                                                    isClosable: true
                                                });
                                            } else {
                                                if (
                                                    title &&
                                                    longUrl &&
                                                    shortUrl
                                                ) {
                                                    const urlEditData = {
                                                        id: id,
                                                        title: title,
                                                        long_url: longUrl,
                                                        short_url:
                                                            "mulearn.org/" +
                                                            shortUrl
                                                    };
                                                    editShortenUrl(
                                                        id,
                                                        toast,
                                                        urlEditData
                                                    );
                                                    setShortUrlData([
                                                        ...shortUrlData.filter(
                                                            item =>
                                                                item.id !== id
                                                        ),
                                                        urlEditData
                                                    ]);
                                                } else {
                                                    console.log("error");
                                                }
                                            }
                                        }}
                                    ></input>
                                )}
                            </div>
                        </div>
                        {/* {formik.touched.short_url && formik.errors.short_url ? (
                            <p className={styles.error_message}>
                                {formik.errors.short_url}
                            </p>
                        ) : null} */}
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
