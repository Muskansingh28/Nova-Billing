import NavbarAfterLogin from "../components/Navbars/NavbarAfterLogin";
import {
  Ban,
  CircleCheck,
  Ellipsis,
  SquareX,
  Pencil,
  SendToBack,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import blue_gradient from "../../assets/Images/blue-gradient.jpg";
import Loader from "../components/Loader/Loader.jsx";
import { jwtDecode } from "jwt-decode";


const baseURL = process.env.REACT_APP_BASE_API_URL;

export default function Finances() {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState([]);
  const [moreVisibleIndex, setMoreVisibleIndex] = useState(null);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tableColumns, setTableColumns] = useState(700);
  const [HeadTitles, setHeadTitles] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        const token = Cookies.get("nb_token");
        if (!token) {
          navigate("/");
          return;
        }

        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          navigate("/login");
          return;
        }

        setLoading(true);
        const response = await axios.get(`${baseURL}/api/user/getInvoice`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setInvoiceData(response.data.invoiceData.reverse());
          setLoading(false);
        } else {
          toast.error("Error in retriving data!");
        }
      } catch (error) {
        console.log(error);
        toast.error("Internal server error!");
      }
    };

    fetchData();
  }, [navigate]);

  const handleUpdateStatus = async (
    ID,
    status,
    endpoint,
    successMessage,
    errorMessage
  ) => {
    try {
      const token = Cookies.get("nb_token");
      const response = await axios.put(
        `${baseURL}/api/user/${endpoint}`,
        {
          ID,
          status,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(`${successMessage}`);
      } else {
        toast.error(`${errorMessage}`);
      }
    } catch (error) {
      console.log(Error);
      toast.error("Internal Server Error!");
    }
  };

  const toggleMoreVisible = (index) => {
    setMoreVisibleIndex(index === moreVisibleIndex ? null : index);
  };

  const toggleExpandedRow = (index) => {
    setExpandedRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEditOrder = (item) => {
    navigate("/invoiceinput", {
      state: {
        invoiceID: item._id,
        billedTo: item.billedTo,
        items: item.items,
      },
    });
  };

  useEffect(() => {
    if (window.innerWidth > 700) {
      setHeadTitles([
        "Client",
        "Billed Date",
        "Invoice No",
        "Amount",
        "Status",
        "",
      ]);
    } else {
      setHeadTitles(["Invoice No", "Status", ""]);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      let currentWindowSize = window.innerWidth;
      setTableColumns(currentWindowSize);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="scroll-smooth  pb-96 min-h-screen h-full w-full  justify-center items-center bg-black/[0.96] antialiased bg-grid-white/[0.025] relative overflow-hidden flex flex-col ">
      <NavbarAfterLogin />

      <div className="mt-20 relative flex justify-center items-center">
        <img
          src={blue_gradient}
          alt="blue"
          className="w-[90%]  min-h-[300vh] mx-auto relative saturate-200 opacity-60 rounded-3xl card-fade-2"
        />

        <div className="my-10 w-3/4 mx-auto absolute top-0 left-1/2 transform -translate-x-1/2 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-left w-fit text-3xl lg2:text-2xl my-5 font-bold drop-shadow-md tracking-wide text-white">
              Finances
            </p>
            <p className="w-fit TableBench:hidden text-black/70 text-lg lg2:text-base drop-shadow-md">
              Products sold to Clients /
              <span className="text-white/70"> History</span>
            </p>
          </div>

          <div className="rounded-xl shadow-lg shadow-gray-800 w-full">
            <GridHead info={HeadTitles} />
            {invoiceData.map((item, index) => (
              <>
                <div className="grid grid-cols-7 TableBench:grid-cols-4 border-b border-white border-opacity-25">
                  {tableColumns > 700 && 
                    <GridRow
                    key={index}
                    txt={item?.billedTo?.client}
                    item={item}
                    client={true}
                    />
                }
                {tableColumns > 700 && 
                  <GridRow txt={item.date} item={item} />
                }

                <GridRow txt={item.invoiceNo} item={item} />

                {tableColumns > 700 && 
                    <GridRow txt={item.amount} item={item} />
                }
                  
                  <RowStatus item={item} />
                  <StatusHandleButton
                    item={item}
                    index={index}
                    invoiceData={invoiceData}
                    setInvoiceData={setInvoiceData}
                    handleUpdateStatus={handleUpdateStatus}
                    type={item.status ? "Unpaid" : "Paid"}
                  />
                  <MoreButton
                    index={index}
                    toggleMoreVisible={toggleMoreVisible}
                  />

                  {moreVisibleIndex === index && (
                    <MoreDetails
                      index={index}
                      item={item}
                      invoiceData={invoiceData}
                      setInvoiceData={setInvoiceData}
                      handleUpdateStatus={handleUpdateStatus}
                      toggleMoreVisible={toggleMoreVisible}
                      toggleExpandedRow={toggleExpandedRow}
                      handleEditOrder={handleEditOrder}
                    />
                  )}

                  <ExpandedRow
                    index={index}
                    expandedRowIndex={expandedRowIndex}
                    toggleExpandedRow={toggleExpandedRow}
                    item={item}
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      {loading && <Loader />}
      <Toaster />
    </div>
  );
}

const GridHead = ({ info }) => {
  return (
    <div className="text-center grid grid-cols-7 TableBench:grid-cols-4 bg-correct-black-light w-full bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-200 border-b border-white border-opacity-25 rounded-t-lg">
      {info.map((head, index) => (
        <p key={index} className="text-txt-dark font-semibold text-lg lg2:text-sm p-5">
          {head}
        </p>
      ))}
    </div>
  );
};

const GridRow = ({ txt, item, client }) => {
  return (
    <p
      className={`p-6 text-center bg-correct-black-light text-white bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-200 flex justify-center items-center lg2:text-xs  md:text-sm md:py-4  ${
        client && "font-semibold"
      } ${!item.orderStatus ? "order-cancel" : ""}`}
    >
      {txt}
    </p>
  );
};

const RowStatus = ({ item }) => {
  return (
    <div
      className={`p-6 text-center bg-correct-black-light text-white bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-200 flex justify-center items-center  ${
        !item.orderStatus ? "order-cancel" : ""
      }`}
    >
      <span
        className={`px-3 py-1 rounded-xl lg2:text-xs lg2:px-2  ${
          item.status ? "bg-green-400" : "bg-yellow-400"
        } text-white font-semibold`}
      >
        {item.status ? "Paid" : "Unpaid"}
      </span>
    </div>
  );
};

const StatusHandleButton = ({
  item,
  index,
  invoiceData,
  setInvoiceData,
  handleUpdateStatus,
  type,
}) => {
  return (
    <div
      onClick={() => {
        const updatedData = [...invoiceData];
        updatedData[index].status = !item.status;
        setInvoiceData(updatedData);
        handleUpdateStatus(
          item._id,
          item.status,
          "PaymentStatus",
          "Status Updated",
          "Issue in the updating status."
        );
      }}
      className={`cursor-pointer flex flex-col justify-center items-center p-6 text-center bg-correct-black-light text-white bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-200    ${
        item.status ? "hover:text-green-400" : "hover:text-yellow-400"
      } `}
    >
      {!item.status ? <CircleCheck /> : <Ban size={22} />}
      <p className="text-sm md:text-xs">Mark {type}</p>
    </div>
  );
};

const MoreButton = ({ index, toggleMoreVisible }) => (
  <div
    onClick={() => toggleMoreVisible(index)}
    className="relative flex justify-center items-center flex-col text-gray-100  p-6 text-center bg-correct-black-light bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-200 cursor-pointer hover:text-white"
  >
    <Ellipsis />
    <p className="text-sm">More</p>
  </div>
);

const ExpandedRow = ({ index, expandedRowIndex, toggleExpandedRow, item }) => (
  <>
    {expandedRowIndex === index && (
      <div className="col-span-7 text-gray-100 self-end p-6 text-center bg-correct-black-light bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-200 ring ring-white/5 space-y-4">
        <div className="flex justify-center items-center">
          <p className="text-lg text-gray-200 w-full">
            Client's order details are :
          </p>
          <X
            onClick={() => toggleExpandedRow(index)}
            className="float-right bg-gray-400 bg-opacity-50 rounded-full p-1 hover:scale-125 cursor-pointer"
            size={25}
          />
        </div>
        <div className="w-[50&] h-px border border-gray-400 border-opacity-40"></div>
        {item.items.map((details, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-center "
          >
            <p className="w-[33%]">{details.itemName}</p>
            <p className="w-[33%]">x{details.qty}</p>
            <p className="w-[33%]">${details.amount}</p>
          </div>
        ))}
        <div className="w-[50&] h-px border border-gray-400 border-opacity-40"></div>
        
        <p>Client : {item.billedTo.client}</p>
        <p>Amount : {item.amount}</p>
        <p>Date of billing : {item.date}</p>

      </div>
    )}
  </>
);

const MoreDetails = ({
  index,
  item,
  invoiceData,
  setInvoiceData,
  handleUpdateStatus,
  toggleMoreVisible,
  toggleExpandedRow,
  handleEditOrder,
}) => (
  <div className="w-[150px] absolute h-auto right-14 z-[100] bg-white rounded-md px-1 py-2 text-black mr-12 mt-10">
    <X
      onClick={() => {
        toggleMoreVisible(index);
      }}
      size={18}
      className="float-right mr-1 mb-4 hover:text-gray-800 cursor-pointer"
    />
    <ul className="space-y-2">
      <li
        onClick={() => {
          const updatedData = [...invoiceData];
          updatedData[index].orderStatus = !item.orderStatus;
          setInvoiceData(updatedData);
          handleUpdateStatus(
            item._id,
            item.status,
            "OrderStatus",
            "Order Cancled!",
            "Issue in the cancling order."
          );
        }}
        className="hover:bg-gray-200 w-full px-3 py-1 hover:scale-105 hover:font-medium text-sm flex justify-start items-center space-x-2"
      >
        <span className="text-gray-600">
          <SquareX size={17} />
        </span>
        <span> Cancel Order</span>
      </li>
      <li
        onClick={() => handleEditOrder(item)}
        className="hover:bg-gray-200 w-full px-3 py-1 hover:scale-105 hover:font-medium text-sm flex justify-start items-center space-x-2"
      >
        <span className="text-gray-600">
          <Pencil size={17} />
        </span>
        <span> Edit Order</span>
      </li>
      <li
        onClick={() => toggleExpandedRow(index)}
        className="hover:bg-gray-200 w-full px-3 py-1 hover:scale-105 hover:font-medium text-sm flex justify-start items-center space-x-2 "
      >
        <span className="text-gray-600">
          <SendToBack size={17} />
        </span>
        <span> View Order Details</span>
      </li>
    </ul>
  </div>
);
