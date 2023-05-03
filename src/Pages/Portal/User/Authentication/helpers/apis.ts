import { ToastId, UseToastOptions } from "@chakra-ui/react";
import apiGateway from "../../../../../services/apiGateway";
import { authRoutes } from "../../../../../services/urls";

type setSuccess = React.Dispatch<React.SetStateAction<boolean>>;
type setError = React.Dispatch<React.SetStateAction<string>>;

export const forgetPassword = (
  muid: string,
  setSuccess: setSuccess,
  setError: setError
) => {
  apiGateway
    .post(authRoutes.forgetPassword, { muid })
    .then((response) => {
      console.log(response.data);
      setSuccess(true);
    })
    .catch((error) => {
      setSuccess(false);
      setError(error.response?.data?.message?.general[0]);
    });
};
