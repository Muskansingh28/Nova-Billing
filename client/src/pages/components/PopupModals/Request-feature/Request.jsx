import { X, SendHorizontal } from "lucide-react";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import Card from "../../Cards/Welcome/Card";


export default function Request(props) {

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      props.onClose();
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "6f0a59d2-df71-4c9d-b572-411ff85e5371");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      toast.success("Idea Submitted")
    }
  };


  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center select-none z-[100]"
    >
      <div className="mt-10 flex flex-col gap-5 text-white">
        <button onClick={props.onClose} className="place-self-end">
          <X size={30} />
        </button>
        <div className="w-[500px] sm:w-[100%] min-h-72 py-6 px-4 flex flex-col items-center bg-blue-600 rounded-xl space-y-5 shadow-lg shadow-gray-800">
        <Card title={"Got an idea to improve our service?"} subTitle={"We'd love to hear from you! Drop us an message with your suggestions."} roundedFull={true} />

          <form onSubmit={onSubmit} className="w-full space-y-5 flex flex-col items-center">
            <input
              type="text"
              name="ideaTitle"
              placeholder="Give a name to your new unique idea💡..."
              required
              className=" w-[70%] rounded-md shadow-lg p-2 text-black no-arrows border border-gray-300 outline-1 outline-gray-300"
            />
            <textarea 
            placeholder="Describe your idea here... ✨"
            name="ideaDescription" id="" cols="30" rows="5"  className="w-[85%] rounded-md shadow-lg p-2 text-black no-arrows border border-gray-300 outline-1 outline-gray-300"></textarea>

            <button
              className="flex justify-center items-center gap-3 bg-black px-6 py-2 rounded-lg hover:bg-slate-900 hover:focus:ring-1 ring-slate-800 active shadow-sm shadow-slate-800"
            >
              <SendHorizontal /> <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
      <Toaster className="z-[200px]" />
    </div>
  );
}
