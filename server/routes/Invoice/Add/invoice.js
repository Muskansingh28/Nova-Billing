import express from "express";
import Invoices from "../../../models/invoiceModel.js";

const router = express.Router();

export default router.post("/api/user/addInvoice", async (req, res) => {
  const ID = req.user;
  const { invoiceNo, billedTo, amount, items, invoiceEditID, total } = req.body;

  try {
    let currentDate = new Date().toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if(invoiceEditID){
      const invoice = await Invoices.findById(invoiceEditID);

      invoice.date = currentDate;
      invoice.billedTo = billedTo;
      invoice.amount = amount;
      invoice.items = items;
      invoice.total = total;

      await invoice.save();
      return res.status(200).json({success : true});
    }
    else{
      const newInvoice = new Invoices({
        date: currentDate,
        invoiceNo,
        billedTo,
        amount,
        total,
        items,
        user: ID,
      });

      const savedInvoice = await newInvoice.save();
      return res.status(200).json({ success: true });
    }

  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({ success: false });
  }
});
