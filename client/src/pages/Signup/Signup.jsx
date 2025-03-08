import Card from "../components/Cards/Welcome/Card.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import OTPModal from "../components/PopupModals/OTPModal";
import blueBack from "../../assets/Images/intro_blue_ball.png";


const baseURL = process.env.REACT_APP_BASE_API_URL;

export default function Signup() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const requestOTP = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    const callBack = async () => {
      await axios
        .post(`${baseURL}/api/user/sendOTP`, {
          email: formData.email,
        })
        .then((res) => {
          console.log(res.data.message);
          setShowModal(!showModal);
          return res.status;
        });
    };
    await toast.promise(callBack(), {
      loading: "Sending otp!",
      success: "OTP sent!",
      error: "facing issue!",
    });
  };

  const signup = async (e) => {
    e.preventDefault();

    try {
      if (formData.password !== formData.confirmPassword) {
        console.log("Password is not Mismatch.");
        toast.error("Kindy re-check your both passwords");
      } else {
        await axios
          .post(`${baseURL}/api/user/signup`, {
            companyName: formData.companyName,
            email: formData.email,
            password: formData.password,
          })
          .then((res) => {
            console.log(res.data.message);
            toast.success(res.data.message);
            toast("Redirecting you to login page!", {
              icon: "⚠️",
            });
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          });
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid format, kindly check your email format.");
    }
  };

  const signupInfo = [
    {
      title: "Company Name*",
      type: "text",
      name: "companyName",
      placeholder: "payflow",
    },
    {
      title: "Email*",
      type: "text",
      name: "email",
      placeholder: "example@gmail.com",
    },
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
      <div className="h-3/4 flex justify-center items-center z-10">
        <div className="w-[450px] rounded-2xl h-auto border border-gray-700 md:max-w-[350px]">
          <Card
            title={"Create Your PayFlow account"}
            subTitle={"Get started for free."}
          />

          <div className="px-6 py-5 bg-gray-950 bg-opacity-30 rounded-b-2xl  z-10">
            <form className="flex flex-col justify-center items-center space-y-4">
              <div className="w-[80%] space-y-5">
                {signupInfo.map((item, index) => (
                  <div key={index} className="flex flex-col space-y-1">
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
                  onClick={requestOTP}
                  className="w-full bg-blue-500 rounded-3xl shadow-lg text-white py-2 hover:bg-blue-600 hover:focus:ring-1 mobile:text-xs"
                >
                  SignUp
                </button>
                <p
                  onClick={() => navigate("/login")}
                  className="text-white cursor-pointer select-none text-sm mobile:text-xs"
                >
                  Already have an account!{" "}
                  <span className="text-blue-600 text-xs">Login</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
      {showModal && (
        <OTPModal
          onClose={() => setShowModal(false)}
          onVerify={(e) => signup(e)}
        />
      )}
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
