import express from "express";
import Users from "../../models/userModel.js";


const router = express.Router();

export default router.post("/api/user/uploadLogo", async (req, res) => {
  const ID = req.user;
  const { base64 } = req.body;
  try {
    const user = await Users.findById(ID);

    if (user) {
        user.photo = base64;
        await user.save();
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log("Error : ", error);
    return res
      .status(500)
      .json({ success: true, message: "Internal server error" });
  }
});
