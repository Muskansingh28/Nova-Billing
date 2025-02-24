import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadPDF = (pdfRef) => {
  const input = pdfRef.current;
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4", true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width; 
    const imgX = 0; 
    const imgY = (pdfHeight - imgHeight) / 2; 
    pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight);
    pdf.save("invoice.pdf");
  });
};
