import axios from "axios"

function SheetAPI(spreadsheetId, sheetName, setData) {
    if (spreadsheetId === undefined || sheetName === undefined) {
        return undefined
    }
    const API = "https://opensheet.elk.sh/"
    if (spreadsheetId?.length >= 83) {
        try {
            axios.get(`${API + spreadsheetId.split("/")[5]}/${sheetName}`)
                .then(res => res.data)
                .then(result => {
                    setData(result)
                })
        }
        catch (err) {
            console.error(err)
        }
    }
}
export default SheetAPI