export default function Header(props) {
    return (
        <div className="w-[80%] flex flex-col justify-center items-start text-white h-[300px] mobile:h-[200px] space-y-4 sm:mt-10">
        <p className={`text-5xl mobile:text-4xl font-bold from-orange-700 to-orange-400 bg-gradient-to-r bg-clip-text text-transparent ${props?.MARGIN ? "text-3xl" : ""}`}>{props.title}</p>
        <p className="text-gray-500 text-lg mobile:text-base">
          {props.subTitle}
        </p>
      </div>
    )
}