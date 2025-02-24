import NavbarAfterLogin from "../components/Navbars/NavbarAfterLogin.jsx";
import { Pencil, SquarePen } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import UpdateProfileModal from "../components/PopupModals/UpdateProfileModal.jsx";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import updateProfile from "../../utils/Profile/UpdatableInfo.js";
import blueBack from "../../assets/Images/intro_blue_ball.png";
import Loader from "../components/Loader/Loader.jsx";
import { jwtDecode } from "jwt-decode";

const baseURL = process.env.REACT_APP_BASE_API_URL;

export default function Profile() {
  const navigate = useNavigate();
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [updateOption, setUpdateOption] = useState("Address");
  const [loading, setLoading] = useState(false);
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [image, setImage] = useState("");

  const fetchData = useCallback(async () => {
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

      const response = await axios.get(`${baseURL}/api/user/getProfileData`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setProfileData(response.data);
        setLoading(false);
      } else {
        toast.error("Server Error!");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error : ", error);
      toast.error("Internal server error! | Session Expired");
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditMode = (e) => {
    e.preventDefault();
    setProfileEditMode(true);
  };

  const convertToBase64 = (e) => {
    // console.log(e);
    const file = e.target.files[0];
    const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB
    // console.log("file size - ", file.size);
    if (file && file.size > maxSizeInBytes) {
      toast.error(
        "File size exceeds the limit (1MB). Please select a smaller file."
      );
      e.target.value = "";
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      //console.log(reader.result); //converts into base64
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error :", error);
    };
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = Cookies.get("nb_token");
      const response = await axios.post(
        `${baseURL}/api/user/uploadLogo`,
        { base64: image },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Uploaded successfully");
        fetchData();
      } else {
        toast.error("Error in uploading!!");
      }
    } catch (error) {
      console.log("Error : ", error);
      toast.error("Internal server error! | Session Expired");
    }
    setLoading(false);
    setProfileEditMode(false);
  };

  return (
    <div className="min-h-screen w-full  justify-center items-center rounded-md  bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden flex flex-col ">
      <NavbarAfterLogin />

      <img
        src={blueBack}
        alt="blueBall"
        className="absolute top-0 right-80 opacity-20 w-[1000px] "
      />

      <div className="space-y-7 my-7 py-7 w-full border-y border-gray-900 bg-black/30 backdrop-blur-sm">
        <div className="w-[60%] sm:w-[90%] grid grid-cols-2 mx-auto gap-6 md:grid-cols-1">
          <div className="bg-stone-50/10 h-[500px] sm:h-[345px] p-6 space-y-5 flex flex-col justify-center items-center rounded-lg relative ">
            <SquarePen
              onClick={(e) => handleEditMode(e)}
              size={20}
              className="float-right self-end absolute text-white/70 top-6 hover:scale-105 cursor-pointer hover:drop-shadow-2xl"
            />
            <div className="w-24 h-24 bg-slate-200 rounded-full shadow-lg shadow-gray-700 mx-auto relative flex justify-center items-center">
              {profileData.photo !== "" ? (
                <img
                  src={profileData.photo}
                  alt="User Business Logo"
                  className="absolute w-full p-2 rounded-full drop-shadow-2xl"
                />
              ) : (
                <p className="text-5xl font-mono drop-shadow-xl">
                  {profileData.companyName[0]}
                </p>
              )}
            </div>
            {profileEditMode && (
              <div className="flex justify-center items-center gap-3 lg:flex-col">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="brandLogo"
                  onChange={(e) => convertToBase64(e)}
                  className="rounded-lg"
                />
                <button
                  onClick={(e) => handleSave(e)}
                  className="bg-white rounded-lg px-3 py-1 text-sm drop-shadow-md"
                >
                  Upload
                </button>
              </div>
            )}

            <div className="space-y-2 text-center ">
              <p className="text-3xl sm:text-2xl font-semibold text-white text-center antialiased tracking-wide drop-shadow-md">
                {profileData.companyName}
              </p>
              {/* <p className="text-base sm:text-sm text-gray-300">Company Type</p>
              <p className="text-base sm:text-sm text-gray-400">
                Enter your desired text here, this is the sample text.
              </p> */}
            </div>

            {/* {profileEditMode && 
                <button onClick={(e) => handleSave(e)} className="bg-black rounded-xl px-3 py-1 text-white absolute bottom-6 ">Save</button>
            } */}
          </div>

          <div className="bg-stone-50/10 h-[500px] sm:h-[345px] p-6 space-y-5 flex flex-col justify-center items-center rounded-lg ">
            <div>
              <p className="text-2xl sm:text-xl text-white font-semibold self-start tracking-wide">
                Revenue Track Record
              </p>
              <p className="text-gray-400 text-base text-left sm:text-xs">
                Here is your Monthly and Yearly sales.
              </p>
            </div>
            <RevenueTrack
              revenue={profileData.monthlyRevenue}
              txt={"This Month's Revenue"}
            />
            <RevenueTrack
              revenue={profileData.yearlyRevenue}
              txt={"This Year's Revenue"}
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 md:flex-col">
          <div className="relative drop-shadow-xl w-96 sm:w-[90%] h-72 sm:h-80 overflow-hidden rounded-xl bg-stone-50/10 ">
            <div className="absolute flex flex-col space-y-3 items-start py-6 px-4 justify-start text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-opacity-45 ">
              <div className="flex flex-col justify-between h-full w-full">
                <div className="space-y-4">
                  <p className="text-xl font-bold drop-shadow-md sm:text-base">
                    Address :{" "}
                  </p>
                  <div className="h-px bg-gray-400 w-full"></div>
                </div>
                <div className="space-y-1 font-mono sm:text-sm">
                  <p>
                    Full Name: <span>{profileData.fullName}</span>{" "}
                  </p>
                  <p>
                    Phone Number: <span>{profileData.phoneNumber}</span>{" "}
                  </p>
                  <p>
                    Address: <span>{profileData.address}</span>{" "}
                  </p>
                  <p>
                    City: <span>{profileData.city}</span>{" "}
                  </p>
                  <p>
                    Pincode: <span>{profileData.pincode}</span>{" "}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setUpdateOption("Address");
                  setShowUpdateProfileModal(!showUpdateProfileModal);
                }}
                className="px-4 py-1 rounded-lg border flex justify-center items-center space-x-1 hover:focus:ring-1 self-stretch"
              >
                <Pencil size={15} /> <span>Edit</span>
              </button>
            </div>
          </div>

          <div className="relative drop-shadow-xl w-96 sm:w-[90%] h-72 sm:h-80 overflow-hidden rounded-xl bg-stone-50/10 ">
            <div className="absolute flex flex-col space-y-3 items-start py-6 px-4 justify-start text-white z-[1] opacity-90 rounded-xl inset-0.5  bg-opacity-45">
              <div className="flex flex-col justify-between h-full w-full">
                <div className="space-y-4">
                  <p className="text-xl font-bold drop-shadow-md sm:text-base">
                    Account Details :
                  </p>
                  <div className="h-px bg-gray-400 w-full"></div>
                </div>
                <div className="space-y-1 font-mono sm:text-sm">
                  <p>
                    Bank Name: <span>{profileData.bankName}</span>{" "}
                  </p>
                  <p>
                    Account Name: <span>{profileData.accountName}</span>{" "}
                  </p>
                  <p>
                    Account No: <span>{profileData.accountNumber}</span>{" "}
                  </p>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setUpdateOption("Account");
                      setShowUpdateProfileModal(!showUpdateProfileModal);
                    }}
                    className="px-4 py-1 w-full rounded-lg border flex justify-center items-center space-x-1 hover:focus:ring-1 self-stretch"
                  >
                    <Pencil size={15} /> <span>Edit</span>
                  </button>
                  <p className="text-sm text-neutral-400 text-wrap">
                    Note: These Details are Encrypted for security Purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showUpdateProfileModal && (
        <UpdateProfileModal
          onClose={() => setShowUpdateProfileModal(false)}
          updateOption={updateOption}
          obj={updateProfile}
          onUpdate={fetchData}
        />
      )}
      <Toaster />
      {loading && <Loader />}
    </div>
  );
}

const RevenueTrack = (props) => {
  return (
    <div className="rounded-lg bg-white/5 w-full flex justify-between items-center py-4 px-5 space-x-4">
      <p className="text-4xl text-white font-bold sm:text-2xl ">
        {props.revenue}$
      </p>
      <p className="text-stone-50 drop-shadow-xl sm:text-xs">{props.txt}</p>
    </div>
  );
};
