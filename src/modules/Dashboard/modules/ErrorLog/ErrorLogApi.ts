import axios from "axios";

export const getCSV = async () => {
  try {
    const response = await axios.get(
      'https://api.covidtracking.com/v1/us/daily.csv',//dummy api
      
      { responseType: 'blob' } // Specify responseType as 'blob' to get binary data
    );

    // Create a Blob object from the API response data
    const blob = new Blob([response.data], { type: 'text/csv' });

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute('download', 'covid_data.csv');

    // Trigger a click event to start the download
    downloadLink.click();

    console.log("File downloaded successfully");
  } catch (err) {
    console.error("Error getting CSV:", err);
  }
};
