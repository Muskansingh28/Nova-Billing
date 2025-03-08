import Logo from "../../../assets/Logos/logo.png";
import userLogoBlue from "../../../assets/Logos/user-blue-logo.png";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Request from "../PopupModals/Request-feature/Request";
import { User, CircleUserRound, Sun, CircleChevronLeft } from "lucide-react";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_API_URL;


export default function NavbarAfterLogin() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [logo, setLogo] = useState("");

  const handleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    const token = Cookies.get("nb_token");
    if (!token) {
      navigate("/");
    } else {
      try {
        const decodeToken = jwtDecode(token);
        setUser(decodeToken);
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("nb_token");
        const response = await axios.get(`${baseURL}/api/user/getLogo`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if(response.data.success){
          setLogo(response.data.photo);
        }
      } catch (error) {
        console.log("Server error!");
      }
    };

    fetchData();
  }, []);

  const handleLogout = (e) => {
    Cookies.remove("nb_token", { expires: new Date(0) });
    navigate("/");
  };

  return (
    <nav className={`w-full p-6 flex justify-between text-white items-center`}>
      <div className="flex space-x-4 items-center">
        <CircleChevronLeft
          onClick={() => navigate("/dashboard")}
          className="hidden sm:block text-gray-400 z-10 cursor-pointer"
        />
        <img src={Logo} alt="Logo" className="w-10 h-10 sm:w-8 sm:h-8" />
        <p className="font-semibold text-xl sm:text-base">PayFlow</p>
      </div>
      <div>
        <ul className="flex space-x-7 font-medium justify-center items-center">
          <li className="hidden bg-gray-500 text-gray-400 bg-opacity-35 rounded-full p-2">
            <Sun size={20} />
          </li>
          <li
            onClick={() => navigate("/dashboard")}
            className="sm:hidden border border-gray-500 rounded-md px-4 py-2 text-sm md2:text-xs hover:scale-105 cursor-pointer"
          >
            Return to Dashboard
          </li>
          <li>
            <CircleUserRound
              size={28}
              strokeWidth={1.25}
              onClick={handleMenu}
              className="text-gray-400 cursor-pointer"
            />

            {menuVisible && (
              <div className="w-[300px] absolute right-8 sm:right-7 top-16 bg-white border border-gray-300 rounded-lg shadow-md p-2 z-[100] space-y-6 px-3 py-4">
                <div className="flex justify-start items-center space-x-4">
                  <img
                    src={logo ? `${logo}` : userLogoBlue}
                    alt="user Business logo"
                    className="w-11 h-11 md:w-9 md:h-9 rounded-full"
                  />
                  <div>
                    <p className="text-xl font-semibold text-black md:text-base">
                      {user.User.companyName}
                    </p>
                    <p className="text-sm font-medium text-slate-600 md:text-xs w-[80%] truncate overflow-hidden whitespace-nowrap">
                      {user.User.email}
                    </p>
                  </div>
                </div>
                <div className="w-full px-4 py-2 bg-slate-300 bg-opacity-55 rounded-lg space-y-1">
                  <p className="text-slate-800 tracking-wide text-sm md:text-xs">
                    Missing out on a feature? We'd love to know!
                  </p>
                  <p
                    onClick={() => setShowModal(!showModal)}
                    className="text-blue-500 space-x-2 cursor-pointer hover:scale-105 font-semibold drop-shadow-md flex justify-start items-center md:text-sm"
                  >
                    <span>Request a Feature</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fillRule="currentColor"
                      className="bi bi-box-arrow-up-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                      />
                      <path
                        fillRule="evenodd"
                        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                      />
                    </svg>
                  </p>
                </div>
                <ul className="text-gray-500 space-y-3">
                  <li
                    onClick={() => navigate("/profile")}
                    className="hover:scale-110 hover:cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-gray-700 px-2 py-1 flex justify-start items-center space-x-4"
                  >
                    <span>
                      <User size={20} />
                    </span>
                    <span>Profile</span>
                  </li>
                  <li
                    onClick={handleLogout}
                    className="hover:scale-110 hover:cursor-pointer text-red-500 hover:bg-gray-100 hover:text-red-500 px-2 py-1 flex justify-start items-center space-x-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fillRule="currentColor"
                      className="bi bi-box-arrow-in-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                      />
                    </svg>
                    <span>Log Out</span>
                  </li>
                </ul>
                <ul className="flex justify-center items-center space-x-5 text-gray-500 text-xs">
                  <li>Blog</li>
                  <li>.</li>
                  <li>About</li>
                  <li>.</li>
                  <li>Privacy</li>
                  <li>.</li>
                  <li>FAQs</li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
      {showModal && <Request onClose={() => setShowModal(false)} />}
    </nav>
  );
}
