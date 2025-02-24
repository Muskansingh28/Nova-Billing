import React, { useEffect, useState } from "react";
import NavbarAfterLogin from "../components/Navbars/NavbarAfterLogin.jsx";
import Loader from "../components/Loader/Loader.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import blueBack from "../../assets/Images/intro_blue_ball.png";
import Header from "../components/PageHeaders/Header.jsx";
import { useNavigate as navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const baseURL = process.env.REACT_APP_BASE_API_URL;

export default function Report() {
  const [containerHeight, setContainerHeight] = useState(627);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState({
    monthly: [],
    yearly: [],
  });
  const [isMonth, setIsMonth] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        const token = Cookies.get("nb_token");

        if (!token) {
          navigate("/");
          return;
        }

        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          navigate("/login");
          return;
        }

        setLoading(true);
        const PresentYear = new Date().getFullYear();
        const response = await axios.get(`${baseURL}/api/user/getReport`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          const ReportData = response.data.ReportData;

          const monthlyData = ReportData.reduce((acc, entry) => {
            if (PresentYear === parseInt(entry.month.split(" ")[2])) {
              const entryMonth = entry.month.split(" ")[1];
              const existingEntry = acc.find(
                (item) => item.month === entryMonth
              );
              if (existingEntry) {
                existingEntry.amount += entry.amount;
              } else {
                acc.push({ month: entryMonth, amount: entry.amount });
              }
            }
            return acc;
          }, []);

          const yearlyData = ReportData.reduce((acc, entry) => {
            const entryYear = entry.month.split(" ")[2];
            const existingEntry = acc.find((item) => item.month === entryYear);
            if (existingEntry) {
              existingEntry.amount += entry.amount;
            } else {
              acc.push({ month: entryYear, amount: entry.amount });
            }
            return acc;
          }, []);

          setReportData((prev) => ({
            ...prev,
            monthly: monthlyData.reverse(),
          }));
          setReportData((prev) => ({ ...prev, yearly: yearlyData.reverse() }));
          setLoading(false);
        } else {
          toast.error("please try again!");
        }
      } catch (error) {
        console.log(error);
        toast.error("Internal server error!");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = () => {
    setIsMonth(!isMonth);
    console.log("toggled boolean = ", isMonth);
  };

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth > 0 && window.innerWidth <= 380){
        setContainerHeight(200);
      }
      else if (window.innerWidth > 380 && window.innerWidth <= 627) {
        setContainerHeight(300);
      } else {
        setContainerHeight(500);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className=" scroll-smooth h-auto pb-96 min-h-screen w-full justify-start items-center bg-black/[0.96] antialiased bg-grid-white/[0.025]  overflow-hidden flex flex-col ">
      <NavbarAfterLogin />

      <img
        src={blueBack}
        alt="blueBall"
        className="absolute top-0 right-80 opacity-20 w-[1000px] "
      />

      <Header
        title={"Maximize your business efforts with proper statistics"}
        subTitle={
          "Track your statistics in different ways - As per | year | month |"
        }
        MARGIN={true}
      />

      <ResponsiveContainer
        width="90%"
        height={containerHeight}
        className="mt-20 px-4 pt-10 text-center bg-correct-black-light text-white bg-opacity-50 backdrop-filter backdrop-blur-lg backdrop-saturate-200 rounded-lg"
      >
        <LineChart data={isMonth ? reportData.monthly : reportData.yearly} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex justify-center items-center space-x-2">
        <p className="text-white text-lg  md2:text-sm">Present FY</p>
        <div className="mt-10 ">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              value=""
              type="checkbox"
              onChange={handleChange}
            />
            <div className="group peer ring-2  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600  rounded-full outline-none duration-1000 after:duration-300 w-20 h-8 sm:h-[1.35rem] sm:w-[68px] shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:[background:#0D2B39]   peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-6 sm:after:h-[0.85rem] after:w-6 sm:after:w-[0.85rem] after:top-1 after:left-1   peer-checked:after:translate-x-12 peer-hover:after:scale-125"></div>
          </label>
        </div>
        <p className="text-white text-lg md2:text-sm">Overall</p>
      </div>

      {loading && <Loader />}
      <Toaster />
    </div>
  );
}
