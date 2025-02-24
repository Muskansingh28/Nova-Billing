import express from "express";
import Users from "../../models/userModel.js";
import { generateOTP } from "../../services/otpGenerator.js";
import { sendEmail } from "../../services/email.js";

const router = express.Router();
let generatedOTP;

const sendOTP =  async (req, res) => {
    const {email} = req.body;
    if(!email) {
        return res.send(400).json({error : "All field are mandatory!"});
    }

    try {
        const user = await Users.findOne({email});
        if(user){
            return res.status(200).json({message : "Users already registerd."});
        }
        else{
            generatedOTP = generateOTP();
            await sendEmail(generatedOTP, email).catch(console.error);
            res.status(200).json({message : "opt sent successfully"});
        }
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({message : "Internal server error!"});
    }
    
};

const verifyOTP = async (req, res) => {
    const { enteredOTP } = req.body;
    
    if(!enteredOTP){
        return res.send(400).json({error : "All field are mandatory!"});
    }
    try {
        if(enteredOTP === generatedOTP){
            console.log("OTP is veified!!");
            return res.status(200).json({message : "otp verified"});
        }
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({message : "Internal server error!"});
    }
}
 

router.post("/api/user/sendOTP", sendOTP);
router.post("/api/user/verifyOTP", verifyOTP);

export default router;