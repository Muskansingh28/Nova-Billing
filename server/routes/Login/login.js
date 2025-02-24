import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../../models/userModel.js";

const router = express.Router();

export default router.post("/api/user/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All field are mandatory!" });
  }

  const user = await Users.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const tokenPayload = {
      User: {
        ID: user._id,
        email: user.email,
        companyName : user.companyName,
      },
    };

    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({success : true, message: "Login Successfull", token : token});
  }

  else{
    return res.status(201).json({success : false, message : "Invalid Credentials!"});
  }
});
