import styles from "./table.module.css";

type Props = {
    columns: string[]
}

const THead = (props: Props) => {
    return (
        <thead>
            {props.columns.map((column: string, index: number) => (
              <th className={styles.th} key={index}>
                {column}
              </th>
            ))}
        </thead>
    )
}

export default THead