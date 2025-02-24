import express from "express";
import Invoices from "../../../../models/invoiceModel.js";
const router = express.Router();

export default router.put("/api/user/OrderStatus", async (req, res) => {
  const {ID, status} = req.body;

  try {
    const invoice = await Invoices.findById(ID);
    if(!invoice){
        return res.status(400).json({success : false});
    }

    invoice.orderStatus = status;
    await invoice.save();
    res.status(200).json({success : true});

  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({ success: false });
  }
});
