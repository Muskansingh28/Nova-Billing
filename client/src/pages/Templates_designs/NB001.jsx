import { useState, useEffect } from "react";
import BrandLogo from "../../assets/Logos/brandLogo.png";
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.REACT_APP_BASE_API_URL;

export default function NB001(props) {

  const [logo, setLogo] = useState("");
  const [company, setCompany] = useState("");
  const { billedTo, items, owner, grandAmount, grandTotal, invoiceNo, charges } = props.invoiceDetails || {};
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });


  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const token = Cookies.get("nb_token");
        const response = await axios.get(`${baseURL}/api/user/getLogo`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if(response.data.success){
          setLogo(response.data.photo);
          setCompany(response.data.companyName);
        }
      } catch (error) {
        console.log("Server error!");
      }
    };

    fetchLogo();
  }, []);
  
  return (
    <div className="flex justify-center item-center mx-auto">

      {/* main card */}
      <div className="bg-white  w-[999px] min-h-[1000px] py-16 px-14 relative">
        <img src={logo ? `${logo}` : BrandLogo} alt="Brand Logo" className="w-80 h-80 opacity-15 absolute inset-0 m-auto transform   -translate-y-1" />
        {/* div containing logo Invoice title, billed to details, invoiceNO, date */}
        <div className="flex flex-col justify-center items-center space-y-7">
          <div className="w-full flex justify-between items-center mx-auto ">
          <div className="flex justify-center items-center gap-4 flex-row-reverse">
              <div className="text-right space-y-0">
                <p className="font-bold tracking-wide">{company}</p>
                <p></p>
              </div>
              <img src={logo ? `${logo}` : BrandLogo} alt="Brand Logo" className="w-16 h-16" />
            </div>            <p className="text-5xl font-mono tracking-wide uppercase">
              Invoice
            </p>
          </div>

          <div className="w-full flex justify-between items-center mx-auto">
            <ul>
              <li>
                <p className="font-semibold uppercase mb-1">Billed TO:</p>
              </li>
              <li>
                <p>{billedTo ? billedTo.client : ''}</p>
              </li>
              <li>
                <p>{billedTo ? billedTo.phoneNumber : ''}</p>
              </li>
              <li>
                <p>{billedTo ? billedTo.address : ''}</p>
              </li>
            </ul>

            <ul className="text-right">
              <li>Invoice No. 000{invoiceNo}</li>
              <li>{currentDate}</li>
            </ul>
          </div>
        </div>

        <table className="table-auto w-full mt-20">
          <thead>
            <tr className="text-left border-y-2 border-black">
              <th className="py-3 px-2">Item</th>
              <th className="py-3 text-center">Quantity</th>
              <th className="py-3 text-center">Unit Price</th>
              <th className="py-3 text-center">Unit Total</th>
            </tr>
          </thead>
          <tbody className="border-b-2 border-black ">
            { items &&
              items.map((row, index) => (
                <tr key={index}>
                <td className="pb-2 px-2">{row.itemName}</td>
                <td className="text-center">{row.qty}</td>
                <td className="text-center">
                  <span>{row.rate}/-</span>
                </td>
                <td className="text-center">
                  <span>{row.amount}/-</span>
                </td>
              </tr>
              ))
            }
          </tbody>
        </table>

        {/* Subtotal, total, shipping charges */}
        <div className="float-right min-w-[20%] mt-6 space-y-4 mb-32  ">
          <p className="flex justify-between items-center">
            <span className="font-semibold">Subtotal</span>
            <span>{grandAmount}/-</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-semibold">GST</span>
            <span>{charges.gstCalculated}/-</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-semibold text-sm">Shipping Charges</span>
            <span>{charges.shippingCharges}/-</span>
          </p>
          <div className="h-0.5 bg-black"></div>
          <p className="flex justify-between items-center font-bold text-xl">
            <span>Total</span>
            <span>{grandTotal}/-</span>
          </p>
        </div>

        <div className="mt-6">
          <div className="w-full flex justify-between items-center">
            <div>
              <p className="text-2xl font-mono mb-20">Thankyou!</p>
              <p className="uppercase font-semibold">payment information</p>
              <p>Bank Name : {owner ? owner.bankName : ''}</p>
              <p>UPI ID: 19324709127@oksbi</p>
              <p>Account Holder Name : {owner ? owner.accountName : ''}</p>
              <p>Account Number : {owner ? owner.accountNumber : ''}</p>
            </div>
            <div className="self-end">
              <p className="font-serif text-xl">{owner ? owner.fullName : ''}</p>
              <p>{owner ? owner.mail : ''}</p>
              <p>{owner ? owner.address : ''}, {owner ? owner.city : ''}, {owner ? owner.pincode : ''}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
