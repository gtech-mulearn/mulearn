
import TableChat from "../../../../components/MuComponents/Table/TableChat";
type Data = {
  id: number;
  name: string;
  description: string;
  type?:string
};

type THeadProps = {
  columns: string[];
};

type TRowProps = {
  data: Data[];
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

  return (
    <>
			<TableChat columns={columns} rows={data} />    
		</>
  );
}

export default InterestGroup;