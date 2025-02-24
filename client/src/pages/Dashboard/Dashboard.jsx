import FeatureBenefit from "../components/Cards/features/FeatureBenefit.jsx";
import FeaturesBenefit from "../../utils/Dashboard/FeaturesBenefit.js";
import NavbarAfterLogin from "../components/Navbars/NavbarAfterLogin.jsx";
import Features from "../../utils/Dashboard/Features.js";
import blueBack from "../../assets/Images/intro_blue_ball.png";
import Feature from "../components/Cards/features/Feature.jsx";
import Loader from "../components/Loader/Loader.jsx";
import Header from "../components/PageHeaders/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useState } from "react";

export default function Dashboard() {

  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 4000);

  return (
    <div className="min-h-screen w-full  justify-center items-center rounded-md  bg-black/[0.96] antialiased bg-grid-white/[0.025] relative overflow-hidden flex flex-col ">
      <NavbarAfterLogin />
      <img
        src={blueBack}
        alt="blueBall"
        className="absolute top-20 right-96 opacity-15 w-[500px]  md2:right-0 mobile:top-28"
      />

<Header title={"Dashboard"} subTitle={"Powerful features for modern marketing teams"}/>

      <div className="w-full py-10 border-y border-gray-900 bg-black/30 backdrop-blur-sm">
        <div className="w-[80%] flex flex-wrap justify-center items-center mx-auto gap-6">
          {Features.map((item, index) => (
            <Feature
              key={index}
              id={index}
              title={item.title}
              content={item.content}
              svg={item.svg}
              imgLink={item.imgLink}
              btnTxt={item.btnTxt}
              navigateTo={item.navigateTo}
            />
          ))}
        </div>

        <div className="flex justify-center items-center mx-auto flex-wrap my-16 gap-6 ">
          {FeaturesBenefit.map((item, index) => (
            <FeatureBenefit
              key={index}
              id={index}
              svg={item.svg}
              title={item.title}
              subTitle={item.subTitle}
            />
          ))}
        </div>
      </div>
      {loading && <Loader />}
      <Footer />
    </div>
  );
}
