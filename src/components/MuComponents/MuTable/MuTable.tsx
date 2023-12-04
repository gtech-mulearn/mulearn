type Props = {};

const MuTable = (props: Props) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                        <th>Column 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Row 1 Cell 1</td>
                        <td>Row 1 Cell 2</td>
                        <td>Row 1 Cell 3</td>
                    </tr>
                    <tr>
                        <td>Row 2 Cell 1</td>
                        <td>Row 2 Cell 2</td>
                        <td>Row 2 Cell 3</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MuTable;
