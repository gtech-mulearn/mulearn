import axios from "axios"

function OpenElkAPICall(spreadsheetId,sheet,setData) {
    const API = "https://opensheet.elk.sh/"
    if (spreadsheetId.length >= 83) {
        try {
            axios.get(`${API + spreadsheetId.split("/")[5]}/${sheet}`)
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
export default OpenElkAPICall