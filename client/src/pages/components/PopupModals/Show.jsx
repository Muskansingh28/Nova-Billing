import { X } from "lucide-react";
import { useRef } from "react";

export default function OTPModal(props) {
  
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      props.onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center select-none"
    >
      <div className="mt-10 flex flex-col gap-5 text-white mobile:mx-6">
        <button onClick={props.onClose} className="place-self-end">
          <X size={30} />
        </button>
        <div className="max-w-[500px] max-h-72 py-6 px-4 flex flex-col items-center  bg-blue-600 rounded-xl space-y-5 shadow-lg shadow-gray-800">
          <h1 className="text-2xl md2:text-lg mobile:text-sm font-extrabold text-center font-mono">
            Complete your invoice by below steps...
          </h1>
            <ul className="text-center font-semibold text-2xl space-y-7 flex flex-col justify-start items-start">
              <StepDescription
                stepNo={"1"}
                description={"Fill the invoice details."}
              />
              <StepDescription
                stepNo={"2"}
                description={"Choose template design."}
              />
              <StepDescription
                stepNo={"3"}
                description={"Download your invoice."}
              />
            </ul>
        </div>
      </div>
    </div>
  );
}

const StepDescription = (props) => {
  return (
    <li className="space-x-3 flex justify-center items-center">
      <div className="rounded-full relative border w-8 h-8 md2:w-6 md2:h-6 flex justify-center items-center">
        <span className="absolute text-sm md2:text-xs">{props.stepNo}</span>
      </div>
      <span className="text-gray-900 text-lg md2:text-sm mobile:text-xs tracking-wider">
        {props.description}
      </span>
    </li>
  );
};
