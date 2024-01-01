import { useEffect, useState } from "react";
import styles from "./Channels.module.css";
import {
    getChannels,
    createChannel,
    editChannel,
    deleteChannel
} from "../Services/apis";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
    MuButton,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";
import { Blank } from "@/MuLearnComponents/Table/Blank";

type channelData = {
    id: string;
    name: string;
    discord_id: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
};

type channelCreate = {
    id: string;
    name: string;
    discord_id: string;
};

const Channels = () => {
    const columnOrder: ColOrder[] = [
        { column: "name", Label: "Name", isSortable: true },
        { column: "discord_id", Label: "Discord ID", isSortable: true },
        { column: "created_by", Label: "Created By", isSortable: true },
        { column: "created_at", Label: "Created At", isSortable: true },
        { column: "updated_by", Label: "Updated By", isSortable: true },
        { column: "updated_at", Label: "Updated At", isSortable: true }
    ];

    const [editBtn, setEditBtn] = useState(false);
    const [createBtn, setCreateBtn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(20);
    const [sort, setSort] = useState("-created_at");
    const [channelsData, setChannelsData] = useState<channelData[]>([]);

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            discord_id: ""
        },
        onSubmit: values => {
            const channelCreateData = {
                id: values.id,
                name: values.name,
                discord_id: values.discord_id
            };
            if (!editBtn) {
                createChannel(channelCreateData, formik).then(result => {
                    if (result) {
                        setTimeout(() => {
                            getChannels(
                                setChannelsData,
                                1,
                                perPage,
                                setTotalPages
                            );
                        }, 500);
                        setEditBtn(false);
                        setCreateBtn(false);
                    }
                });
            } else {
                editChannel(values.id, channelCreateData, formik).then(
                    result => {
                        if (result) {
                            setTimeout(() => {
                                getChannels(
                                    setChannelsData,
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
            if (!values.name) {
                errors.name = "Required";
            }
            if (!values.discord_id) {
                errors.discord_id = "Required";
            }
            return errors;
        }
    });

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getChannels(setChannelsData, nextPage, perPage, setTotalPages);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getChannels(setChannelsData, 1, perPage, setTotalPages);
    };

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getChannels(setChannelsData, 1, perPage, setTotalPages, search, "");
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getChannels(setChannelsData, 1, selectedValue, setTotalPages, "", "");
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getChannels(
                setChannelsData,
                currentPage,
                perPage,
                setTotalPages,
                "",
                `-${column}`,
                setLoading
            );
        } else {
            setSort(column);
            getChannels(
                setChannelsData,
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
        formik.setFieldValue(
            "name",
            channelsData.filter(item => item?.id === id)[0].name
        );
        formik.setFieldValue(
            "discord_id",
            channelsData.filter(item => item?.id === id)[0].discord_id
        );
        setEditBtn(true);
    };

    const handleDelete = (id: any) => {
        deleteChannel(id.toString());
        setChannelsData(channelsData.filter(item => item?.id !== id));
    };
    const handleCopy = (id: any) => {
        navigator.clipboard.writeText(
            channelsData.filter(item => item?.id === id)[0].name
        );
        console.log(channelsData.filter(item => item?.id === id)[0].name);
        toast.success("Success");
    };

    useEffect(() => {
        getChannels(
            setChannelsData,
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
                <div className={styles.channelsContainer}>
                    <div className={styles.createChannel}>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                className={styles.name}
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                placeholder="Name"
                                required
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className={styles.errorMessage}>
                                    {formik.errors.name}
                                </p>
                            )}
                            <input
                                className={styles.discord_id}
                                type="text"
                                name="discord_id"
                                onChange={formik.handleChange}
                                value={formik.values.discord_id}
                                onBlur={formik.handleBlur}
                                placeholder="Discord ID"
                                required
                            />
                            {formik.touched.discord_id &&
                                formik.errors.discord_id && (
                                    <p className={styles.errorMessage}>
                                        {formik.errors.discord_id}
                                    </p>
                                )}

                            <div className={styles.channelsInputContainer}>
                                <div className={styles.formBtns}>
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
                    rows={channelsData}
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

export default Channels;
