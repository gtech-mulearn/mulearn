import { FieldConfig, useField } from "formik";
import styles from "./FormComponents.module.css";
import React, { CSSProperties, ClassAttributes, HTMLAttributes, TextareaHTMLAttributes } from "react";
import Select, { Props as SelectProps } from "react-select";
import { propNames } from "@chakra-ui/react";

/*
TODO: Verify the Unused Code/Components in this File
TODO: Transition the old inputs to the new one("eg.FormikTextAreaWhite")
*/
type InputFormik = TextareaHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> & FieldConfig<HTMLInputElement>
export const FormikTextInput:FC<InputFormik & {label?:string}> = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <div className={styles.inputBox}>
            <span>{label}</span>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export const FormikTextInputWithoutLabel = ({...props }: InputFormik) => {
    const [field, meta] = useField(props);
    return (
        <>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? <span className="formikErrorSpan">{meta.error}</span> : null}
        </>
    );
};

export const FormikSelect = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);
    return (
        <div className={styles.inputBox}>
            <span>{label}</span>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export const FormikTextInputWhite = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);
    return (
        <div className={styles.InputSet}>
            <label className={styles.formLabel}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export const FormikTextAreaWhite = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);
    return (
        <div className={styles.InputSet}>
            <label className={styles.formLabel}>{label}</label>
            <textarea className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export type Option = {
    label: string;
    value: string | boolean | number;
}

const customStyles: any = {
    control: (provided: any) => ({
        ...provided,
        backgroundColor: "white",
        border: ".1px solid #CFD3D4",
        borderRadius: "10px",
        width: "100%",
        padding: ".3rem .4rem",
        minWidth: "200px"
    })
};

interface FormikSelectProps extends SelectProps<Option> {
    name: string;
    label: string;
    options: Option[];
    addOnChange?: Function;
    addStyles?: CSSProperties;
}

const FormikReactSelect: React.FC<FormikSelectProps> = ({
    name,
    label,
    options,
    addOnChange = () => {},
    addStyles,
    ...rest
}) => {
    const [field, meta, helpers] = useField(name);
    const handleChange = (selectedOption: any) => {
        addOnChange(selectedOption);
        if (rest.isMulti)
            helpers.setValue(selectedOption.map((obj: any) => obj.value));
        else helpers.setValue(selectedOption ? selectedOption.value : null);
    };

    const handleBlur = () => {
        helpers.setTouched(true);
    };

    const getSelectedOption = () => {
        if (!field.value) {
            return null;
        }
        if (rest.isMulti) {
            return (
                options.filter(option => field.value.includes(option.value)) ||
                null
            );
        }
        return options.find(option => option.value === field.value) || null;
    };
    return (
        <div className={styles.InputSet}>
            <label className={styles.formLabel} htmlFor={name}>
                {label}
            </label>
            <Select
                {...rest}
                name={name}
                id={name}
                value={getSelectedOption()}
                isSearchable
                isClearable
                className={styles.reactSelect}
                options={options}
                onChange={handleChange}
                onBlur={handleBlur}
                styles={{ ...customStyles, ...addStyles }}
            />
            {meta.touched && meta.error && (
                <div className={styles.error}>{meta.error}</div>
            )}
        </div>
    );
};

export default FormikReactSelect;

interface ImageFormProps {
    name: string;
    label: string;
}

export const FormikImageComponent: React.FC<ImageFormProps> = ({
    label,
    ...props
}: any) => {
    const [field, meta] = useField(props);
    return (
        <div className={styles.InputSet}>
            <label className={styles.formLabel}>{label}</label>
            <input
                className={styles.image_input}
                type="file"
                accept="image/*"
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};

interface FormikSelectWithoutLabelProps extends SelectProps<Option> {
    name: string;
    options: Option[];
    onchangeFunction: any;
}

export const FormikReactSelectCustom: React.FC<
    FormikSelectWithoutLabelProps
> = ({ name, options, onchangeFunction, ...rest }) => {
    const [field, meta, helpers] = useField(name);

    const handleChange = (selectedOption: any) => {
        helpers.setValue(selectedOption ? selectedOption.value : null);
        console.log(selectedOption.value);
        onchangeFunction(selectedOption.value);
    };

    const handleBlur = () => {
        helpers.setTouched(true);
    };

    const getSelectedOption = () => {
        if (!field.value) {
            return null;
        }
        return options.find(option => option.value === field.value) || null;
    };

    const customStyles: any = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: "#F3F3F4",
            border: "none",
            borderRadius: "10px",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#000",
            width: "100%",
            padding: ".3rem .4rem"
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: "#000" // Specify your desired color here
        }),
        indicatorSeparator: (provided: any) => ({
            ...provided,
            display: "none" // Hide the indicator separator
        })
    };

    return (
        <>
            <Select
                {...rest}
                name={name}
                id={name}
                value={getSelectedOption()}
                isSearchable
                options={options}
                onChange={handleChange}
                onBlur={handleBlur}
                styles={customStyles}
            />
            {meta.touched && meta.error && (
                <div className="error">{meta.error}</div>
            )}
        </>
    );
};
