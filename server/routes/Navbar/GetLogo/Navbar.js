import express from "express";
import Users from "../../../models/userModel.js";

const router = express.Router();

export default router.get("/api/user/getLogo", async (req, res) => {
  const ID = req.user;
  try {
    const user = await Users.findById(ID);
    if (!user) {
      console.log("User not found.");
      return res.status(400).json({ message: "User not found." });
    }

    res.status(200).json({
      success: true,
      photo : user.photo,
      companyName : user.companyName
    });
  } catch (error) {
    console.log("Error : ", error);
  }
});
