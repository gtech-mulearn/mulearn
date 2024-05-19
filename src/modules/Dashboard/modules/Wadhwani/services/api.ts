import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
export const getWadhwaniClientToken = async () => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.getWadhwaniClientToken
        );
        const message: WadhwaniTokenResponse = response?.data?.response;
        return { response: message, error: null };
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        } else {
            return { response: null, error: error.message };
        }
    }
};

export const getWadhwaniCourses = async (clientToken: string) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.getWadhwaniCourses,
            {
                "Client-Auth-Token": clientToken
            },
            {
                maxBodyLength: Infinity
            }
        );
        const message: wadhwaniCourseResponse[] =
            response?.data?.response?.data;
        return { response: message, error: null };
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        } else {
            return { response: null, error: error.message };
        }
    }
};

export const getWadhwaniCourseLink = async (
    clientToken: string,
    courseId: string
) => {
    const toastId=toast.loading("Fetching course link...")
    try {
        const response = await privateGateway.post(
            dashboardRoutes.getWadhwaniCourseLink,
            {
                "Client-Auth-Token": clientToken,
                course_root_id: courseId
            },
            {
                maxBodyLength: Infinity
            }
        );
        const message: wadhwaniCourseRedirectResponse = response?.data?.response;
        if (message.data?.error?.code) {
            return { response: null, error: message.data.error.description };
        }else{
            toast.success("Course link opened successfully!",{id:toastId})
        }
        return { response: message, error: null };
    } catch (err: unknown) { 
        toast.error("Please try again later.",{id:toastId})
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
           
        } else {
            return { response: null, error: error.message };
        }
    }
};

// const axios = require('axios');
// const FormData = require('form-data');
// let data = new FormData();
// data.append('course_root_id', '64931a5571b86329790efb76');
// data.append('Client-Auth-Token', 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyekdBUjZCX0dpU21zRFJZT2syczZXOE0xSnlUckpPUGd0bFQwVGZSVGswIn0.eyJleHAiOjE3MTQyMTg4MjMsImlhdCI6MTcxNDIxODIyMywianRpIjoiYjkxZDU0OWYtYzg2ZC00ZDBhLTljZjEtYmNmODBmZTgzZDZhIiwiaXNzIjoiaHR0cHM6Ly93b2Rldi5pYW0ud2ZnbG9iYWwub3JnL2F1dGgvcmVhbG1zL3dmLW9wcG9ydHVuaXR5IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImJkMDhiNWM4LWMxNjUtNDQzNi05NjVmLWEwY2U3ODYxNTkyMiIsInR5cCI6IkJlYXJlciIsImF6cCI6Im11bGVhcm4iLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtd2Ytb3Bwb3J0dW5pdHkiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRJZCI6Im11bGVhcm4iLCJjbGllbnRIb3N0IjoiNDMuMjA1LjEwNi4xMzkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtbXVsZWFybiIsImNsaWVudEFkZHJlc3MiOiI0My4yMDUuMTA2LjEzOSJ9.jOE2n-5Ig2IlxU2wONqd7E202mvOvH_Ifhv9Iz_A80JKzMx29um2_kj6e0tadC-UDWBKi6oxkekPXKKpJNrl0JRXZysSoWQHK47zCaKDo9oP6MGEewQgpSAzf1NGWsPiOQN36MGoijR-VE9p5CWfDmgSHiUKxlMx3t2ORYg15bfkSeOmt6vVb4pdJsJQfaCmQH5xDV5dVRRisGYqnv7QRTRzLKkLbd-MIc8YSAsAXWMv5msIiiFEsjIyU2R-OKSinCxThP6RszkHz0Ek_HI5DXJEDfxIRjDiqKRmIJnP0c6f_8tqq5UA9Y_Dbgt-ffkGBBvkNWTkxeDhnDbdwj23NQ');

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'https://dev.mulearn.org/api/v1/integrations/wadhwani/user-login/',
//   headers: {
//     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlZDlmNjFlLTY3YzUtNDBiMy1iYTkyLWRmN2Q4NzEyNzA5MCIsIm11aWQiOiJhZG5hbmthdHRla2FkZW5AbXVsZWFybiIsInJvbGVzIjpbIlpvbmFsIENhbXB1cyBMZWFkIiwiRGlzdHJpY3QgQ2FtcHVzIExlYWQiLCJTdHVkZW50IiwiQWRtaW5zIiwiQWRtaW5zIiwiQ2FtcHVzIExlYWQiXSwiZXhwaXJ5IjoiMjAyNC0wNC0yNyAxNDo0MzowMCswMDowMCIsInRva2VuVHlwZSI6ImFjY2VzcyJ9.85KZ1PIldLS2awJi66CHCd754pUrcwbwomZw6xORe7w',
//     ...data.getHeaders()
//   },
//   data : data
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });
