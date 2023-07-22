import { useField } from "formik";
import styles from "./FormComponents.module.css";
import React from "react";
import Select, { Props as SelectProps } from "react-select";

/*
TODO: Verify the Unused Code/Components in this File
TODO: Transition the old inputs to the new one("eg.FormikTextAreaWhite")
*/
export const FormikTextInput = ({ label, ...props }: any) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <div className={styles.inputBox}>
            <span>{label}</span>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export const FormikSelect = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className={styles.inputBox}>
                <span>{label}</span>
                <select {...field} {...props} />
            </div>{" "}
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

export const FormikTextInputWhite = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);
    return (
        <div className={styles.InputSet}>
            <label className={styles.formLabel}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
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
                <div className="error" >{meta.error}</div>
            ) : null}
        </div>
    );
};

export interface Option {
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
        padding: ".3rem .4rem"
    })
};

interface FormikSelectProps extends SelectProps<Option> {
    name: string;
    label: string;
    options: Option[];
}

const FormikReactSelect: React.FC<FormikSelectProps> = ({
    name,
    label,
    options,
    ...rest
}) => {
    const [field, meta, helpers] = useField(name);

    const handleChange = (selectedOption: any) => {
        helpers.setValue(selectedOption ? selectedOption.value : null);
    };

    const handleBlur = () => {
        helpers.setTouched(true);
    };

    const getSelectedOption = () => {
        if (!field.value) return null;
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
                className={styles.reactSelect}
                options={options}
                onChange={handleChange}
                onBlur={handleBlur}
                styles={customStyles}
            />
            {meta.touched && meta.error && (
                <div className="error">{meta.error}</div>
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
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};
