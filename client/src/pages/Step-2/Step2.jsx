import NavbarAfterLogin from "../components/Navbars/NavbarAfterLogin";
import DesignsInfo from "../../utils/Designs/DesingsInfo";
import SampleCard from "../components/Cards/Step-2/SampleCard.jsx";
import { useRef } from "react";
import { downloadPDF } from "../components/Download/PDF/pdfConvert.js";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NB001 from "../Templates_designs/NB001.jsx";
import NB002 from "../Templates_designs/NB002.jsx";
import { FileDown } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";


export default function Step2() {
  const location = useLocation();
  const [invoiceDetails, setInvoiceDetails] = useState({
    billedTo: {},
    items: [],
    owner : {},
    grandAmount : 0,
    grandTotal : 0,
    invoiceNo : 0,
    charges : {}
  });
  useEffect(() => {
    if (location.state) {
      const { billedTo, items, owner, grandAmount, grandTotal, invoiceNo, charges } = location.state;
      setInvoiceDetails({ billedTo, items, owner, grandAmount, grandTotal, invoiceNo, charges });
      console.log(location.state);
    }
  }, [location.state]);


  const [invoiceCode, setInvoiceCode] = useState({
    code: "NB001",
    id: 0,
  });
  const invoiceComponents = [
    {
      code: "NB001",
      component: (
        <NB001 invoiceDetails={invoiceDetails} />
      ),
    },
    {
      code: "NB002",
      component: (
        <NB002 invoiceDetails={invoiceDetails} />
      ),
    },
  ];

  const selectedTemplate = invoiceComponents.find(
    (item) => item.code === invoiceCode.code
  );

  const pdfRef = useRef();


  return (
    <div className="bg-img-common">
      <NavbarAfterLogin />

      <div className="w-[95%] h-full rounded-lg bg-gray-500 bg-opacity-50 backdrop-blur-md p-6 mx-auto my-10">
        <div className="flex justify-center items-center gap-7 mx-auto overflow-x-scroll">
        <div className="hidden md2:block md2:flex-none w-80" />
          {DesignsInfo.map((item, index) => (
            <SampleCard
              key={index}
              id={index}
              title={item.title}
              image={item.image}
              selectedID={invoiceCode.id}
              code={(id) =>
                setInvoiceCode({ code: DesignsInfo[id].imgCode, id: id })
              }
            />
          ))}
        </div>

        <div ref={pdfRef} className="md2:hidden mx-7 my-10">
          {selectedTemplate && selectedTemplate.component}
        </div>

        <div className="w-full flex justify-center items-center my-10 md2:hidden">
          <button onClick={() => 
          {
            downloadPDF(pdfRef);
          toast.success("File Downloading!...");
          }} class="flex justify-center items-center space-x-3 relative py-2 px-8 text-black text-base font-semibold nded-full overflow-hidden bg-violet-500 rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 shadow-slate-900">
            <span>
              <FileDown />
            </span>
            <span>Download</span>
          </button>
        </div>
          
          <p className="hidden md2:block rounded-lg text-base bg-white/15 px-4 py-2 w-[60%] text-center mx-auto my-10 text-red-400 transition-all duration-150 animate-pulse">To dowload PDF open site in <b> Desktop Mode  ( if your are in mobile view ) </b>or on larger screen size.</p>
          
      </div>
      <Toaster />
    </div>
  );
}
