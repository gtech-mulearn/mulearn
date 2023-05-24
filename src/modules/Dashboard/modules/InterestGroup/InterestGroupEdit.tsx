import Form from "../../../../components/MuComponents/Form/Form";
import { editInterestGroups } from "./apis";

type Props = {};

const InterestGroupEdit = (props: Props) => {

	const handleSubmit = (input:string) => {
		let id = localStorage.getItem('id');
		editInterestGroups(input, id);
    };
    return (
		<div>
			<Form title={"Edit Name of Interest Group"} input={'Enter the new name'} handleSubmitClick={handleSubmit} />
		</div>
	)
};

export default InterestGroupEdit;

