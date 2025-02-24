import React from "react";
import Spotlight from "../components/UI/spotlight/Spotlight.jsx";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import PreNavbar from "../components/Navbars/PreNavbar.jsx";
import OpenSource from "../components/Cards/opensource/OpenSource.jsx";
import Footer from "../components/Footer/Footer.jsx";


export default function Nopage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full rounded-md md:items-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden flex flex-col ">
      <PreNavbar />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl h-screen  mx-auto relative z-10  w-full flex flex-col justify-center items-center">
        <h1 className="text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          404 - Page not found
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          You are missing most amazing features, click on the below button to experience.
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="flex justify-center items-center px-6 py-3 rounded-3xl border border-gray-300 text-gray-50 hover:scale-105 my-6 space-x-3 "
        >
          <span>Go back</span>
          <MoveLeft size={19} />
        </button>
      </div>
      <OpenSource />

      <Footer/>
    </div>
  );
}
