import React, { FC } from "react";
import styles from "./table.module.css";
import Pagination from "../../../Components/MuComponents/Pagination";

type Data = {
  id: number;
  name: string;
  description: string;
};

type Row = {
  [key: string]: string | number;
};

type TableProps = {
  columns: string[];
  rows: Data[];
  margin?: string;
};

const TableChat: FC<TableProps> = ({ columns, rows }) => {
  return (
    <>
      <div className={styles.table}>
        <table className={styles.tableActual}>
          <thead>
            {columns.map((column: string, index: number) => (
              <th className={styles.th} key={index}>
                {column}
              </th>
            ))}
          </thead>
          <tbody>
            {rows.map((row: any, index: number) => (
              <tr key={index}>
                {Object.keys(row).map((key: string) => (
                  <td className={styles.td} key={`${row.id}-${key}`}>
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.page}>
          <Pagination currentPage={1} totalPages={10} margin="10px 0" />
        </div>
      </div>
    </>
  );
};

export default TableChat;
