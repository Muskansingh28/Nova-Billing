import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logos/logo.png";
import Hover from "../../../utils/Navbar/Hover/Hover";
import { useState } from "react";
import { ChevronDown, Ban, Menu, X } from "lucide-react";

export default function PreNavbar() {
  const navigate = useNavigate();
  const [MouseNav, setFeatureNav] = useState({
    feature: false,
    blog: false,
    pricing: false,
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="w-[70%] lg:w-[90%] mt-6 mx-auto flex justify-between px-6 text-white items-center">
      <div className="flex justify-center items-center space-x-16">
        <div className="flex space-x-4 items-center">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
          <p className="font-bold text-2xl tracking-wide relative">NovaBills</p>
        </div>
        <div>
          <ul className="md:hidden flex space-x-16 cursor-pointer select-none text-gray-300 text-base">
            <li
              onMouseEnter={() =>
                setFeatureNav((prev) => ({ ...prev, feature: true }))
              }
              onMouseLeave={() =>
                setFeatureNav((prev) => ({ ...prev, feature: false }))
              }
              className="hover:text-white  relative flex justify-center items-center space-x-2"
            >
              <span>Features</span>
              <span>
                <ChevronDown
                  className={`mt-1 transition-all duration-300 ${
                    MouseNav.feature && "rotate-180"
                  } `}
                  size={17}
                />
              </span>
            </li>
            <li
              onMouseEnter={() =>
                setFeatureNav((prev) => ({ ...prev, blog: true }))
              }
              onMouseLeave={() =>
                setFeatureNav((prev) => ({ ...prev, blog: false }))
              }
              className="hover:text-white relative"
            >
              Blog {MouseNav.blog && <NotLaunched />}
            </li>
            <li
              onMouseEnter={() =>
                setFeatureNav((prev) => ({ ...prev, pricing: true }))
              }
              onMouseLeave={() =>
                setFeatureNav((prev) => ({ ...prev, pricing: false }))
              }
              className="hover:text-white relative"
            >
              Pricing {MouseNav.pricing && <NotLaunched />}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <ul className="md:hidden flex space-x-6 cursor-pointer select-none text-gray-300 text-base">
          <li
            onClick={() => navigate("/login")}
            className="hover:text-white rounded-3xl px-3 py-1 bg-slate-100 bg-opacity-10 backdrop-blur-lg"
          >
            Log in
          </li>
          <li
            onClick={() => navigate("/signup")}
            className="bg-white rounded-3xl text-black px-3 py-1 text-sm tracking-wide hover:border hover:bg-transparent hover:border-white hover:text-white"
          >
            Sign Up
          </li>
        </ul>

        <div onClick={() => setShowMobileMenu(!showMobileMenu)} className="hidden md:block md:relative cursor-pointer transition-all duration-300 ease-in-out">
          {!showMobileMenu ? <Menu /> : <X/> }
        </div>
        {showMobileMenu && (
          <div className="absolute z-50 cursor-pointer right-16 shadow-sm shadow-white/20 md:block bg-white w-[150px] mobile:top-15 mobile:right-10 text-black rounded-lg border border-slate-600 p-4">
            <ul className="space-y-3">
              {/* <li className="opacity-50" >Feature</li> */}
              {/* <li className="opacity-50" >Blog</li>
              <li className="opacity-50" >Pricing</li> */}
              <li onClick={() => navigate("/login")}>Log in</li>
              <li onClick={() => navigate("/signup")}>Sign up</li>
            </ul>
          </div>
        )}
      </div>

      {MouseNav.feature && (
        <div className="absolute top-20 left-96">
          <div className="bg-white/30 rounded-xl grid grid-cols-2 gap-3 py-3 px-4 border border-white/35 shadow-md shadow-white/10">
            {Hover.map((feature, index) => (
              <FeaturesHoverCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                subTitle={feature.subTitle}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

const FeaturesHoverCard = (props) => {
  return (
    <div className="flex justify-center items-start flex-col bg-white/5 rounded-lg px-4 py-3 space-y-2 ">
      <p className="text-white text-base flex justify-center items-center space-x-2">
        <span>{props.icon}</span>
        <span>{props.title}</span>
      </p>
      <p className="overflow-hidden text-sm text-white/55">{props.subTitle}</p>
    </div>
  );
};

const NotLaunched = () => {
  return (
    <div className="bg-white/30 rounded-xl px-4 py-3 border-white/35 shadow-md shadow-white/10 absolute top-8 ">
      <p className="text-red-500 font-semibold flex justify-center items-center space-x-2 w-28">
        <span>
          <Ban size={14} />
        </span>
        <span className="text-red-200 animate-pulse text-xs">Not Updated</span>
      </p>
    </div>
  );
};
