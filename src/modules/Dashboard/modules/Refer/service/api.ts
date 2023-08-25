import { privateGateway } from "@/MuLearnServices/apiGateways";

import { dashboardRoutes } from "@/MuLearnServices/urls";


export const getReferredUserList = async () =>{
    const response  = (await privateGateway
                    .get(dashboardRoutes.referredUsersList))
                    .data.response                    
    return (response)
}
