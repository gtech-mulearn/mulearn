import * as XLSX from "xlsx";

const fetchOfficeHours = async () => {
  try {
    const response = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTgTqndq_TnRlqBxCDAMEPfmgQ1Qg6SidS8JdkazhUZGm08wN-hrhljgA_W7Mxkqb-arf8Hd4IZK8Nx/pub?output=ods"
    );
    const arrayBuffer = await response.arrayBuffer();

    // Read the ODS file
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0]; 
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });

    return jsonData;
  } catch (error) {
    console.error("Error fetching or parsing ODS data:", error);
    throw error;
  }
};

export default fetchOfficeHours;
