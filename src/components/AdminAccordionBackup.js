import React from "react";
import Accordion from "react-bootstrap/Accordion";
import * as XLSX from 'xlsx';

import FileSaver from "file-saver";
import { useState } from "react";

const AdminAccordionBackup = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonResult = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setJsonData(jsonResult);
        console.log("JSON Data:", jsonResult);//!JSON data is in here
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleDownloadJSON = () => {
    if (jsonData) {
      const jsonBlob = new Blob([JSON.stringify(jsonData)], {
        type: "application/json",
      });
      FileSaver.saveAs(jsonBlob, "data.json");
    }
  };
  return (
    <Accordion defaultActiveKey="1" className="dark-accordion myAccordion d-none" >
      <Accordion.Item eventKey="0">
        <Accordion.Header className="sidebar-accordion-heading">
          <i className="fa-solid fa-upload me-4"></i>Backup
        </Accordion.Header>
        <Accordion.Body>
          <div className="row">
            <div className="col-12 col-sm-4 col-md-6 col-lg-4">
              <input type="file" accept=".xlsx" onChange={handleFileChange} />
              <button onClick={handleDownloadJSON}>
                Download JSON
              </button>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdminAccordionBackup;
