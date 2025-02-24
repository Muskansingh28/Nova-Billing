import Card from "../components/Cards/Welcome/Card.jsx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import blueBack from "../../assets/Images/intro_blue_ball.png";

const baseURL = process.env.REACT_APP_BASE_API_URL;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const forgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}/api/user/forgotPassword`, {
        email
      });

      if(res.data.success){
        toast.success("Reset link has been sent...");
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server Error | Please try again");
    }
  };

  return (
    <div className="min-h-screen w-full  justify-center items-center rounded-md  bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden flex flex-col ">

      <img src={blueBack} alt="blueBall" className="absolute top-0 right-80 opacity-15  w-[500px] sm:right-0" />
        <div className="h-3/4 flex justify-center items-center rounded-2xl">
          <div className="w-[450px] rounded-2xl h-auto border border-gray-700 md:max-w-[350px]">

            <Card title={"Enter your Email"} subTitle={"To get the password reset link."} />

            <div className="px-6 py-5 bg-gray-950 bg-opacity-30 rounded-b-2xl">
              <form className="flex flex-col justify-center items-center space-y-4">
                <div className="w-[80%] space-y-5 ">
                  <div className=" flex flex-col space-y-1">
                    <label htmlFor="email" className="self-start text-white">
                      Email*
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="text"
                      name="email"
                      placeholder="example@gmail.com"
                      required
                      className="bg-gray-700 bg-opacity-35 text-white rounded-xl px-3 py-1 mobile:text-sm"
                    />
                  </div>


                  <button
                    onClick={forgotPassword}
                    className="w-full bg-blue-500 rounded-3xl shadow-lg text-white py-2 hover:bg-blue-600 hover:focus:ring-1 mobile:text-xs"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      <Toaster />
    </div>
  );
}
