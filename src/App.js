import * as xlsx from "xlsx/xlsx.mjs";
import "./App.css";
import React from "react";
import Table from "./Table";

function App() {
  const [json, setJson] = React.useState(null);

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setJson(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  return (
    <div className="App">
      <form>
        <label htmlFor="upload">Upload File</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </form>

      <div>
        {json && <Table theadData={getHeadings(json)} tbodyData={json} />}
      </div>
    </div>
  );
}

export default App;
