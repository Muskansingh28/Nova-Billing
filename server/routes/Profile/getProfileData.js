import express from "express";
import Users from "../../models/userModel.js";
import Invoices from "../../models/invoiceModel.js";
import { Decryptr } from "../../helpers/Cryptr/Crpytr.js";

const router = express.Router();

export default router.get("/api/user/getProfileData", async (req, res) => {
  const ID = req.user;
  try {
    const user = await Users.findById(ID);
    if (!user) {
      console.log("User not found.");
      return res.status(400).json({ message: "User not found." });
    }

    let montlyRevenue = 0;
    let yearlyRevenue = 0;

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const presentMonthIndex = new Date().getMonth();
    const presentMonth = monthNames[presentMonthIndex];
    const PresentYear = new Date().getFullYear();

    const allInvoices = await Invoices.find({ user: ID });

    montlyRevenue = allInvoices.reduce((acc, item) => {
      if (item.date.split(" ")[1] === presentMonth) {
        acc += item.amount;
      }
      return acc;
    }, 0);

    yearlyRevenue = allInvoices.reduce((acc, item) => {
      if (parseInt(item.date.split(" ")[2]) === PresentYear) {
        acc += item.amount;
      }
      return acc;
    }, 0);

    res.status(200).json({
      success: true,
      companyName : user.companyName,
      fullName: user.fullName,
      photo : user.photo,
      email: user.email,
      address: user.address,
      city: user.city,
      pincode: user.pincode,
      state: user.state,
      phoneNumber: user.phoneNumber,
      bankName: Decryptr(user.bankName),
      accountName: Decryptr(user.accountName),
      accountNumber: Decryptr(user.accountNumber),
      monthlyRevenue: montlyRevenue,
      yearlyRevenue: yearlyRevenue,
    });
  } catch (error) {
    console.log("Error : ", error);
  }
});
