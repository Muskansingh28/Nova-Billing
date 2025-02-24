import React from "react";
import Spotlight from "../components/UI/spotlight/Spotlight.jsx";
import { useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
import PreNavbar from "../components/Navbars/PreNavbar.jsx";
import OpenSource from "../components/Cards/opensource/OpenSource.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { TracingBeamDemo } from "../components/TacingBeam/TracingBeamDemo.jsx";


export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full rounded-md bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden flex flex-col ">
      <PreNavbar />
      <Spotlight
        // className="-top-40 left-0 md:left-60 md:-top-20"
        className="-top-40 left-0 md:left-32 md:-top-20 md:w-[122%]"
        fill="white"
      />
      <div className=" p-4 max-w-7xl h-screen  mx-auto relative z-10  w-full flex flex-col justify-center items-center">
        <h1 className="py-3 text-7xl md:text-6xl md2:text-5xl mobile:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Streamline your invoicing <br /> process effortlessly
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto md2:text-sm mobile:text-xs mobile:text-neutral-400">
          Say goodbye to tedious paperwork and hello to seamless transactions.
          With our intuitive platform, managing invoices has never been easier.
          Stay organized, save time, and focus on what you do best growing your
          business.
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
          className="flex justify-center items-center px-6 py-3 rounded-3xl border border-gray-300 text-gray-50 hover:scale-105 my-6 space-x-3"
        >
          <span className="md2:text-sm mobile:text-xs">View Templates</span>
          <MoveRight size={19} />
        </button>
      </div>

      <TracingBeamDemo />
      <OpenSource />

      <Footer/>
    </div>
  );
}
