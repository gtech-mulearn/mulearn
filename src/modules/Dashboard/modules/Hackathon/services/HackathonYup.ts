import * as Yup from "yup";

export const HackApplicationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(30, "Too Long!"),
    gender: Yup.string()
        .oneOf(["male", "female"], "Available options: 'male', 'female'"),
    email: Yup.string().required("Required").email(),
    mobile: Yup.number().required().min(1000000000, "Min 10 digits").max(9999999999, "Max 10 digits"),
    bio: Yup.string()
        .min(2, "Too Short!")
        .max(150, "Too Long!"),
    college: Yup.string()
        .min(2, "Too Short!")
        .max(40, "Too Long!"),
    experience: Yup.string()
        .min(2, "Too Short!")
        .max(200, "Too Long!"),
    github: Yup.string()
        .min(2, "Too Short!")
        .max(100, "Too Long!"),
    linkedin: Yup.string()
        .min(2, "Too Short!")
        .max(100, "Too Long!")
});
