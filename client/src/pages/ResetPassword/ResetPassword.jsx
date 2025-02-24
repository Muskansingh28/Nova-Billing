import Card from "../components/Cards/Welcome/Card.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import blueBack from "../../assets/Images/intro_blue_ball.png";

const baseURL = process.env.REACT_APP_BASE_API_URL;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loginBtn, setLoginBtn] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      const token = window.location.pathname.split("/").pop();

      if (formData.password !== formData.confirmPassword) {
        console.log("Password is not Mismatch.");
        toast.error("Kindy re-check your both passwords");
      } else {
        await axios
          .post(
            `${baseURL}/api/user/reset-password/${token}`,
            {
              password: formData.password,
            },
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data.message);
            toast.success(res.data.message);
            setLoginBtn(true);
          });
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid server error");
    }
  };

  const resetpasswordInfo = [
    {
      title: "Password*",
      type: "password",
      name: "password",
      placeholder: "******",
    },
    {
      title: "Confirm Password*",
      type: "password",
      name: "confirmPassword",
      placeholder: "******",
    },
  ];

  return (
    <div className="min-h-screen w-full  justify-center items-center rounded-md  bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden flex flex-col ">
      <img
        src={blueBack}
        alt="blueBall"
        className="absolute top-0 right-80 opacity-15 w-[500px] sm:right-0"
      />
      <div className="h-3/4 flex flex-col justify-center items-center">
        <div className="w-[450px] rounded-2xl h-auto border border-gray-700 md:max-w-[350px]">
          <Card title={"Enter your New Password"} subTitle={"below..."} />

          <div className="px-6 py-5 bg-gray-950 bg-opacity-30 rounded-b-2xl">
            <form className="flex flex-col justify-center items-center space-y-4">
              <div className="w-[80%] space-y-5">
                {resetpasswordInfo.map((item, index) => (
                  <div key={index} className=" flex flex-col space-y-1">
                    <LabelTag title={item.title} name={item.name} />
                    <InputTag
                      formData={formData}
                      change={handleInputChange}
                      type={item.type}
                      name={item.name}
                      placeholder={item.placeholder}
                    />
                  </div>
                ))}
                <button
                  onClick={resetPassword}
                  className="w-full bg-blue-500 rounded-3xl shadow-lg text-white py-2 hover:bg-blue-600 hover:focus:ring-1 mobile:text-xs"
                >
                  Set
                </button>
              </div>
            </form>
          </div>
        </div>
        {loginBtn && (
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
            className="flex justify-center items-center px-6 py-3 rounded-3xl border border-gray-300 text-gray-50 hover:scale-105 my-6 space-x-3 shadow-sm shadow-white/20"
          >
            <span className="md2:text-sm mobile:text-xs">
              Login with new password
            </span>
          </button>
        )}
      </div>
      <Toaster />
    </div>
  );
}

const LabelTag = (props) => {
  return (
    <label htmlFor={props.name} className="self-start text-white">
      {props.title}
    </label>
  );
};

const InputTag = (props) => {
  return (
    <input
      onChange={(e) => props.change(e)}
      value={props.formData[props.name]}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      autoComplete=""
      required
      className="bg-gray-700 bg-opacity-35 text-white rounded-xl px-3 py-1  mobile:text-sm"
    />
  );
};
