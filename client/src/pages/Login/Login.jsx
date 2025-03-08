import Card from "../components/Cards/Welcome/Card.jsx";
import Cookies from "js-cookie";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blueBack from "../../assets/Images/intro_blue_ball.png";
import Loader from "../components/Loader/Loader.jsx";

const baseURL = process.env.REACT_APP_BASE_API_URL;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/api/user/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        Cookies.set("nb_token", res.data.token);
        setLoading(false);
        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setLoading(false);
        toast.error("Invalid Credentials!");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error("Incorrect Credentials | Server Error");
    }
  };

  return (
    <div className="min-h-screen w-full  justify-center items-center rounded-md  bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden flex flex-col ">
      <img
        src={blueBack}
        alt="blueBall"
        className="absolute top-0 right-80 opacity-15  w-[500px] sm:right-0"
      />
      <div className="h-3/4 flex justify-center items-center rounded-2xl z-10">
        <div className="w-[450px] rounded-2xl h-auto border border-gray-700 md:max-w-[350px]">
          <Card
            title={"Sign in to PayFlow"}
            subTitle={"Start creating your invoice for your business."}
          />

          <div className="px-6 py-5 bg-gray-950 bg-opacity-30 rounded-b-2xl">
            <form className="flex flex-col justify-center items-center space-y-4">
              <div className="w-[80%] space-y-5 ">
                <div className=" flex flex-col space-y-1">
                  <label htmlFor="email" className="self-start text-white">
                    Email*
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formData.email}
                    type="text"
                    name="email"
                    placeholder="example@gmail.com"
                    required
                    className="bg-gray-700 bg-opacity-35 text-white rounded-xl px-3 py-1 mobile:text-sm"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="password" className="self-start text-white">
                    Password*
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formData.password}
                    type="password"
                    name="password"
                    placeholder="123456"
                    required
                    className="bg-gray-700 bg-opacity-35 text-white rounded-xl px-3 py-1  mobile:text-sm"
                  />
                </div>
                <p
                  onClick={() => navigate("/forgotPassword")}
                  className="text-gray-500 text-xs text-right hover:text-gray-400 cursor-pointer"
                >
                  Forgot Password?
                </p>

                <button
                  onClick={login}
                  className="w-full bg-blue-500 rounded-3xl shadow-lg text-white py-2 hover:bg-blue-600 hover:focus:ring-1 mobile:text-xs"
                >
                  Login
                </button>

                <p
                  onClick={() => navigate("/signup")}
                  className="text-white text-sm cursor-pointer select-none mobile:text-xs"
                >
                  Not yet registered?{" "}
                  <span className="text-blue-600 text-xs">
                    Create an Account
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading && <Loader />}
      <Toaster />
    </div>
  );
}
