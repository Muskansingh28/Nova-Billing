import { X, Save } from "lucide-react";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_API_URL;


export default function UpdateProfileModal(props) {
  const obj = props.obj;
  const updatingField = props.updateOption;

  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      props.onClose();
    }
  };

  const initialFormData = Object.keys(obj[updatingField]).reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const UpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("nb_token");
      const response = await axios.put(
        `${baseURL}/api/user/updateProfile`,
        formData,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Beared ${token}`,
          },
        }
      );
      console.log(response);
      toast.success("Updated Successfully.");
      setTimeout(() => {
        props.onUpdate();
      }, 2000);
    } catch (error) {
      console.log("error : ", error);
      toast.error("Inter server error!");
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center select-none"
    >
      <div className="mt-10 flex flex-col gap-5 text-white">
        <button onClick={props.onClose} className="place-self-end">
          <X size={30} />
        </button>
        <div className="max-w-[500px] py-6 px-20 flex flex-col items-center  bg-blue-600 rounded-xl space-y-5 shadow-lg shadow-gray-800 sm:px-7">
          <h1 className="uppercase text-2xl md2:text-lg mobile:text-sm font-extrabold text-center ">Edit Details</h1>
          <form className="space-y-5 flex flex-col items-center">
            {Object.keys(obj[updatingField]).map((key, index) => (
              <div key={index} className="flex flex-col justify-start items-start">
                <label htmlFor={key} className="text-black font-medium  sm:text-sm">
                  {key}
                </label>{" "}
                <input
                  onChange={handleInputChange}
                  value={formData[key]}
                  key={index}
                  id={index}
                  type={obj[updatingField][key].type}
                  name={obj[updatingField][key].name}
                  placeholder={obj[updatingField][key].name}
                  className="rounded-md shadow-lg p-2 text-black no-arrows border border-gray-300 outline-1 outline-gray-300 sm:text-sm sm:py-1"
                />
              </div>
            ))}

            <button
              onClick={UpdateProfile}
              className="flex justify-center items-center gap-3 bg-black px-6 py-2 rounded-lg hover:bg-slate-900 hover:focus:ring-1 ring-slate-800 active shadow-sm shadow-slate-800"
            >
              <Save /> <span>Save</span>
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
