import * as yup from "yup";

export const hackathonSchema = yup.object().shape({
    title: yup
        .string()
        .min(2, "Too Short!")
        .max(50, "Too Long!"),
    tagline: yup.string().min(2, "Too Short!").max(100, "Too Long!"),
    orgId: yup.string().min(2, "Too Short!"),
    place: yup.string().min(2, "Too Short!"),
    districtId: yup.string().min(2, "Too Short!"),
    type: yup.string().min(2, "Too Short!"),
    isOpenToAll: yup.boolean(),
    description: yup.string().min(5, "Too Short!"),
    participantCount: yup
        .number()
        .positive("Number of users should be a positive value")
        .max(999999, "Should not exceed 6 digits")
        .truncate(),
    website: yup.string().min(3, "Too Short!").max(200, "Too Long!"),
    event_logo: yup
        .mixed()
        .test(
            "fileSize",
            "File size is too large, maximum size is 1MB",
            (value: any) => {
                if (value) {
                    const maxSize = 1 * 1024 * 1024; // 1MB
                    return value.size <= maxSize;
                }
                return true; // No file selected, so it passes validation
            }
        )
        .test(
            "fileType",
            "Invalid file format, only image formats are supported",
            (value: any) => {
                if (value) {
                    const supportedFormats = [
                        "image/jpeg",
                        "image/png",
                        "image/gif"
                    ];
                    return supportedFormats.includes(value.type);
                }
                return true; // No file selected, so it passes validation
            }
        ),

    banner: yup
        .mixed()
        .test(
            "fileSize",
            "File size is too large, maximum size is 1MB",
            (value: any) => {
                if (value) {
                    const maxSize = 1 * 1024 * 1024; // 1MB
                    return value.size <= maxSize;
                }
                return true; // No file selected, so it passes validation
            }
        )
        .test(
            "fileType",
            "Invalid file format, only image formats are supported",
            (value: any) => {
                if (value) {
                    const supportedFormats = [
                        "image/jpeg",
                        "image/png",
                        "image/gif"
                    ];
                    return supportedFormats.includes(value.type);
                }
                return true; // No file selected, so it passes validation
            }
        )
});
