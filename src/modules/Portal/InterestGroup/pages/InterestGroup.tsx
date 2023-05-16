import Pagination from "../../../../Components/MuComponents/Pagination";
import THead from "../../../../Components/MuComponents/Table/THead";
import Table from "../../../../Components/MuComponents/Table/Table";
import { privateGateway } from "../../../../services/apiGateways";

type Data = {
  id: number;
  name: string;
  description: string;
  type?:string
};

function InterestGroup() {
  const data: Data[] = [
    { id: 1, name: 'Item 1', description: 'This is item 1', type: 'jenin'},
    { id: 2, name: 'Item 2', description: 'This is item 2', type: 'jenin'},
    { id: 3, name: 'Item 3', description: 'This is item 3', type: 'jenin'}
  ];

  const columns = [
    'HEAD1',
    'HEAD2',
    'HEAD3',
    'HEAD4'
  ];

	const IG_GET_URL = '/api/v1/dashboard/ig/'

	// const getInterestGroups = async () => {
	// 	try {
	// 		const response = await privateGateway.get(IG_GET_URL,
	// 				{
	// 					headers: { 
	// 						'Content-Type': 'application/json',
	// 						'Authorization': 'Bearer ' + access
	// 					}
	// 				}
	// 		);
	// 		const todo:any = (response?.data)
	// 		console.log(todo)
	// 		setTasks(todo);
		
	// 	} 
	// 	catch (err: unknown) {
	// 		const error = err as AxiosError;
	// 		if (error?.response) {
	// 			console.log(error.response)
	// 			//notify3();
	// 		}
	// 	}
	// }





  return (
    <>
			<Table rows={data} >
				<THead columns={columns} />
				<Pagination currentPage={1} totalPages={10} margin="10px 0" />
				{/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
			</Table>    
		</>
  );
}

export default InterestGroup;