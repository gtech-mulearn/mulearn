import React, { useEffect, useRef, useState } from 'react'
import styles from "./Modal.module.css"
import mustyles from "@/MuLearnComponents/MuButtons/MuButtons.module.css"

import * as Yup from "yup";
import { Formik, Form,FormikProps } from 'formik'
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import FormikReactSelect from '@/MuLearnComponents/FormikComponents/FormikComponents';
import {addUsers, deleteUser, getUser} from "../apis"
import { AiOutlineDelete } from "react-icons/ai";

import { Option } from '@/MuLearnComponents/FormikComponents/FormikComponents';

export type role={ 
    title: string
    id: string 
}
export type roleUsers = {
    value:string,
    label:string,
}
type Props = {
    onClose:any
    roles:role[]
}

const ManageUsers = (props:Props) => {
    
    const [selectedUsers,setSelectedUsers] = useState<roleUsers[]>([])
    const [allUsers,setAllUsers] = useState<roleUsers[]>([])
    const [currRole,setCurrRole] = useState<role>({ 
        title: "",
        id: "" 
    })

    const handleUserDelete = async (userId:string)=>{
        try{
            await deleteUser(userId,currRole.id)
            setSelectedUsers(selectedUsers.filter(user=>user.value!==userId))
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        (async()=>{
            try {
                setAllUsers(await getUser())
            } catch (error) {
                console.log(error)
            }
        })()
    },[])
    useEffect(()=>{
        (async()=>{
            if(!!currRole.id)
            setSelectedUsers(await getUser(currRole.id))
        })()
    },[currRole])
    return (
        <Formik
        enableReinitialize={true}
        initialValues={{
            users:[],
            role:""
        }}
        onSubmit={values=>{
            addUsers(
                values.users,
                values.role
            )
            props.onClose(null)
        }}
        validationSchema={Yup.object({
            role: Yup.string()
                .required("Role required"),
            users:Yup.array()
                .required("users required")
                
        })}
        >
            <Form className={styles.Form}>
                <FormikReactSelect
                    name="role"
                    options={
                        props.roles.map(obj=>
                            {return({label:obj.title,value:obj.id})
                        })
                    }
                    label=''
                    placeholder="Select the role"
                    isClearable
                    isSearchable
                    addOnChange={(obj:Option)=>{
                        if(obj)
                        setCurrRole({title:obj.label,id:obj.value.toString()})
                        else
                        setCurrRole({title:"",id:""})
                    }}
                />
                <FormikReactSelect
                    name="users"
                    options={allUsers!
                        .filter(obj=>(//remove selected users ie users of currRole
                            !selectedUsers
                            .map(user=>user.value)
                            .includes(obj.value)
                        ))
                        .map(obj => {
                        return { value: obj.value, label: obj.label };
                        })
                    }
                    label=""
                    placeholder="Select the user"
                    isClearable
                    isSearchable
                    isMulti
                    isDisabled={!currRole.id}
                />
                {!!currRole.id && 
                <ul className={styles.userList}>
                    {selectedUsers.map((user)=>
                        <li>
                            <span>
                                {`${user.label.substring(0,10)}
                                ${user.label.length>10?'...':''}`}
                            </span>
                            <button 
                                type="button"
                                onClick={
                                    ()=>handleUserDelete(user.value)
                                }
                            >
                                <AiOutlineDelete/>
                            </button>
                        </li>
                    )}
                </ul>}
                <div className={styles.ButtonContainer}>
                    <MuButton
                        type="button"
                        className={`${mustyles.btn} ${styles.Decline}`}
                        text={"Decline"}
                        onClick={() => {
                            props.onClose(null)
                        }}
                    />
                    <MuButton
                        className={`${mustyles.btn} ${styles.Confirm}`}
                        text="Add Users"
                        type="submit"
                    />
                </div>
                <span className={styles.note}>Submission is not required for user deletion</span>
            </Form>
        </Formik>
    )
}

export default ManageUsers