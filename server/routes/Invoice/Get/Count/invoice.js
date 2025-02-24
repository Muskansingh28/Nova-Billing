import express from "express";
import Invoices from "../../../../models/invoiceModel.js";
const router = express.Router();

export default router.get("/api/user/getInvoiceCount", async (req, res) => {
  const ID = req.user;

  try {

    const invoiceCount = await Invoices.countDocuments({user : ID});
    res.status(200).json({count : invoiceCount, success : true});

  } catch (error) {

    console.log("Error : ", error);
    res.status(500).json({ success: false });

  }
});
