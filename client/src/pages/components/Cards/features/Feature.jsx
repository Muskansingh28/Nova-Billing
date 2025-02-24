import { useNavigate } from "react-router-dom";

export default function Feature(props) {

    const navigate = useNavigate();

  return (
    <div className="w-80 mobile:w-72 h-[400px] mobile:h-auto p-4 bg-stone-50/10 backdrop-blur-2xl rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img
        className="w-full h-40 object-cover rounded-lg mobile:h-32"
        alt="feature use options"
        src={props.imgLink}
      />
      <div className="p-4 space-y-3 flex flex-col justify-between">
        <h2 className="text-xl font-semibold text-white mobile:text-lg">{props.title}</h2>
        <p className="text-gray-500 mobile:text-sm">{props.content}</p>
      </div>
      <div className="m-4">
        <button
          onClick={() => navigate(`${props.navigateTo}`)}
          className="border px-4 py-1  mobile:text-sm rounded-lg border-gray-500 text-gray-300 flex justify-center items-center space-x-2 "
        >
          {props.svg}
          <span>{props.btnTxt}</span>
        </button>
      </div>
    </div>
  );
}
