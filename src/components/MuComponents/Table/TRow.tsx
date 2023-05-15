const Td = (props:{item:any}) =>{
	return(
		<td
          style={{
            padding: "12px 16px",
            textAlign: "left",
            borderTop: "1px solid rgba(1, 75, 178, .5)",
            color: "rgba(1, 75, 178, 1)",
          }}
        >
          {props.item}
        </td>
	)
}

const TRow = (props: { data: any }) => {
  return props.data.map((item: any, i: any) => {
    return (
      <tr key={i}>
        <Td item={item.id}/>
        <Td item={item.name}/>
        <Td item={item.description}/>
      </tr>
    );
  });
};

export default TRow;
