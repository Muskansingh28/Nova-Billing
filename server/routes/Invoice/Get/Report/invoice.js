import express from "express";
import Invoices from "../../../../models/invoiceModel.js";
const router = express.Router();

export default router.get("/api/user/getReport", async (req, res) => {
    const ID = req.user;

    try {
        const allInvoices = await Invoices.find({user : ID})
            .populate("user")
            .then(items => {
                const filteredItems = items.map(item => {
                    const { user, ...rest} = item.toObject();
                    const singleData = {
                        month : rest.date,
                        amount : rest.amount,
                    }
                    return singleData;
                });
                res.status(200).json({success : true, ReportData : filteredItems});
            })
            
    } catch (error) {
        console.log("Error : ", error);
        res.status(500).json({ success: false });
    }
})