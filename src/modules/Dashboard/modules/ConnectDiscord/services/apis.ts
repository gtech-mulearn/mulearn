import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";

type muid = UseStateFunc<string>

export const getInfo = (setMuid?: muid,onComplete?:Function) => {
  privateGateway
    .get(dashboardRoutes.getInfo)
    .then((response: APIResponse<UserInfo>) => {
      localStorage.setItem("userInfo", JSON.stringify(response.data.response));
      if(setMuid)setMuid(response.data.response.muid);
      if(onComplete)onComplete()
    })
    .catch((error) => {
      console.log(error);
    });
};
