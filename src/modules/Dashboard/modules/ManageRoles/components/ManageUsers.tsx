import { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import mustyles from "@/MuLearnComponents/MuButtons/MuButton.module.css";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import {
    MuButton,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";
import FormikReactSelect, {
    FormikTextInput
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { addUsers, deleteUser, getUser } from "../apis";
import { AiOutlineDelete } from "react-icons/ai";
import { Option } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { roles } from "@/MuLearnServices/types";
import { style } from "d3";
import { BiUserMinus, BiUserPlus } from "react-icons/bi";

export type role = {
    title: string;
    id: string;
};
export type roleUsers = {
    value: string;
    label: string;
};
type Props = {
    onClose: any;
    roles: role[];
    currRole: { title: string; id: string };
};

const ManageUsers = (props: Props) => {
    const [selectedUsers, setSelectedUsers] = useState<roleUsers[]>([]);
    const [unselectedUsers, setUnselectedUsers] = useState<roleUsers[]>([]);
    const [search, setSearch] = useState("");
    const { currRole } = props;
    const [mode, setMode] = useState<"add" | "remove">("remove");

    const errorHandler = (msg: string) => {
        toast.error(msg);
    };
    const successHandler = (msg: string) => {
        toast.success(msg);
    };
    const handleUserDelete = async (userId: string) => {
        deleteUser(userId, currRole.id, errorHandler, msg => {
            successHandler(msg);
            setSelectedUsers(users =>
                users.filter(user => user.value !== userId)
            );
        });
    };

    useEffect(() => {
        // (async () => {
        //     if (!!currRole.id) {
        //         if (mode === "remove")
        //             setSelectedUsers((await getUser(currRole.id)) ?? []);
        //         if (mode === "add")
        //             setUnselectedUsers(
        //                 (await getUser(currRole.id, false)) ?? []
        //             );
        //     }
        // })();
        setSearch("");
    }, [mode]);
    useEffect(() => {
        const handleSearch = async () => {
            if (search.length < 3) return;

            if (mode === "remove")
                setSelectedUsers((await getUser(currRole.id, search)) ?? []);
            if (mode === "add") {
                const addUsers =
                    (await getUser(currRole.id, search, false)) ?? [];
                setUnselectedUsers(users => [...users, ...addUsers]);
            }
        };
        const timeout = setTimeout(handleSearch, 1000);

        return () => clearTimeout(timeout);
    }, [search]);

    console.log(search);
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                users: []
            }}
            onSubmit={values => {
                addUsers(values.users, currRole.id, errorHandler, msg => {
                    successHandler(msg);
                    setMode("remove");
                });
            }}
            validationSchema={Yup.object({
                users: Yup.array().required("users required")
            })}
        >
            <Form className={styles.Form}>
                <div className={styles.flex}>
                    {mode === "remove" && (
                        <>
                            <FormikTextInput
                                name="search"
                                placeholder="Search..."
                                value={search}
                                onChange={e => {
                                    setSearch(e.target.value);
                                }}
                            />

                            <button
                                className={`${styles.modeBtn}`}
                                type="button"
                                onClick={() => setMode("add")}
                                title="Add Users"
                            >
                                <BiUserPlus size={28} />
                            </button>
                        </>
                    )}
                </div>
                {mode === "remove" ? (
                    !!currRole.id && (
                        <ul className={styles.userList}>
                            {selectedUsers
                                .filter(user => user.label.startsWith(search))
                                .map(user => (
                                    <li>
                                        <span>
                                            {`${user.label.substring(0, 20)}
                                        ${user.label.length > 10 ? "..." : ""}`}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleUserDelete(user.value)
                                            }
                                            className={styles.deleteBtn}
                                        >
                                            <AiOutlineDelete />
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    )
                ) : (
                    <div className={styles.flexEnd}>
                        <FormikReactSelect
                            name="users"
                            options={unselectedUsers}
                            label=""
                            placeholder="Select the users to be added"
                            maxMenuHeight={150}
                            isClearable
                            isSearchable
                            isMulti
                            isDisabled={!currRole.id}
                            onInputChange={changedValue =>
                                setSearch(changedValue)
                            }
                            inputValue={search}
                        />
                        <button
                            className={`${styles.modeBtn}`}
                            type="button"
                            onClick={() => setMode("remove")}
                            title="Remove Users"
                        >
                            <BiUserMinus size={28} />
                        </button>
                    </div>
                )}

                <div className={styles.ButtonContainer}>
                    <PowerfulButton
                        type="button"
                        className={`${mustyles.btn} ${styles.Decline}`}
                        onClick={() => {
                            props.onClose(null);
                        }}
                    >
                        Close
                    </PowerfulButton>
                    {mode === "add" && (
                        <PowerfulButton
                            className={`${mustyles.btn} ${styles.Confirm}`}
                            type="submit"
                            disabled={!currRole.id}
                        >
                            Add Users
                        </PowerfulButton>
                    )}
                </div>
                <span className={styles.note}>
                    Submission is not required for user deletion
                </span>
            </Form>
        </Formik>
    );
};

export default ManageUsers;
