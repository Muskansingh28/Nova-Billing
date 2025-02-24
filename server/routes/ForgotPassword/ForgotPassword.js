import express from "express";
import jwt from "jsonwebtoken";
import Users from "../../models/userModel.js";
import { sendResetLink } from "../../services/ResetLink.js";

const router = express.Router();

export default router.post("/api/user/forgotPassword", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "All field are mandatory!" });
  }

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const tokenPayload = {
      User : {
        ID : user._id,
      }
    }
  
    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET, {
      expiresIn: "10m",
    });
    await sendResetLink(token, email).catch(console.error);
    res.status(200).json({success : true, message : "Reset link sent successfully."});

  } catch (error) {
    console.log("Error : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }

});
