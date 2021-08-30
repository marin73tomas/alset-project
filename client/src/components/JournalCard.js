import React, {useState} from "react";
import { MDBCard, MDBCol } from "mdbreact";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import '../style.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const JournalCard = ({ path }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  console.log(`http://localhost:5000/${path.split("files/")[1]}`);
  return (
    <MDBCol className="my-4" lg="12">
      <MDBCard className="mx-auto">
        <Document
          file={`http://localhost:5000/${path.split("files/")[1]}`}
          onLoadSuccess={onDocumentLoadSuccess}
          width="600px"
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </MDBCard>
    </MDBCol>
  );
};
export default JournalCard;
