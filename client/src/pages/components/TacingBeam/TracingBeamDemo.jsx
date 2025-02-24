import React from "react";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../UI/tracingBeam/tracing-beam";
import completeProfile from "../../../assets/Images/CompleteProfileDetails.jpg";
import enterInvoiceDetails from "../../../assets/Images/EnterInvoiceDetails.jpg";
import downloadPDF from "../../../assets/Images/downloadToPDF.jpg";
import finance from "../../../assets/Images/finance.jpg";
import report from "../../../assets/Images/report.jpg";

export function TracingBeamDemo() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative sm:pl-14">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">

            <p className={twMerge("text-xl font-semibold tracking-wide mb-4 text-white")}>
              {item.title}
            </p>

            <div className="text-sm prose prose-sm">
              {item?.image && (
                <img
                  src={item.image}
                  alt="blog thumbnail"
                  className="rounded-lg mb-10 object-cover"
                  style={{ height: "auto", width: "250px" }}
                />
              )}
              <p className="text-neutral-300 w-[50%]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
    {
      title: "Complete profile registration",
      description: (
        <>
          <p>
              Set up your business profile by entering essential details like company name, logo, and bank information to start generating professional invoices.
          </p>
        </>
      ),
      image: completeProfile,
    },
    {
      title: "Enter invoice details",
      description: (
        <>
          <p>
          Quickly add customer order information, including items, prices, and other specifics, to create a detailed and accurate invoice.
          </p>
        </>
      ),
      image: enterInvoiceDetails,
    },
    {
      title: "Select your preferred PDF template and download",
      description: (
        <>
          <p>
          Choose from beautifully designed templates to customize your invoice's look and feel, then download it instantly for sending to your clients.
          </p>
        </>
      ),
      image: downloadPDF,
    },
    {
      title: "Manage finances and order statuses",
      description: (
        <>
          <p>
          Keep track of payments by marking invoices as paid or unpaid, and easily review, update, or cancel orders from one central dashboard.
          </p>
        </>
      ),
      image: finance,
    },
    {
      title: "Analyze reports with interactive graphs",
      description: (
        <>
          <p>
          Gain insights into your business performance with monthly and yearly financial reports displayed in interactive graphs, helping you make informed decisions.
          </p>
        </>
      ),
      image: report,
    },
  ];