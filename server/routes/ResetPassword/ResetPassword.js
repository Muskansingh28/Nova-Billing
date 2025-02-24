import express from "express";
import Users from "../../models/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

export default router.post("/api/user/reset-password/:token", async (req, res) => {
  const ID = req.user;
  const { password } = req.body;

  try {
    const user = await Users.findById(ID);
    if (!user) {
      return res.status(401).send({success : false, message: "no user found" });
    }
  
    const newPassword = await bcrypt.hash(password, 10);;
    user.password = newPassword;
    await user.save();
    res.status(200).json({success : true, message : "Password changed successfully."});

  } catch (error) {
    console.log("Error : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }

});
