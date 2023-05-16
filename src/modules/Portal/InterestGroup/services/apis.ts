import { AxiosError } from "axios";
import { privateGateway } from "../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../services/urls";

export const getInterestGroups = async (setData:any, page:number, setTotalPages?:any) => {
	try {
		const response = await privateGateway.get(dashboardRoutes.getIgData,
				{
					params: {
						perPage: 5,
						page: page
					}
				}
		);
		const interestGroups:any = (response?.data)
		// localStorage.setItem('count', interestGroups.response.dataCount)
		console.log(interestGroups)
		setData(interestGroups.response.interestGroups)
		setTotalPages(Math.ceil(interestGroups.response.dataCount/5))
		console.log(interestGroups.response.dataCount)
	} 
	catch (err: unknown) {
		const error = err as AxiosError;
		if (error?.response) {
			console.log(error.response)
		}
	}
}
