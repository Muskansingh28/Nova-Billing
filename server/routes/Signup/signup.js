import express from "express";
import zod from "zod";
import bcrypt from "bcrypt";
import Users from "../../models/userModel.js";

const router = express.Router();
const schema = zod.string().email();

export default router.post("/api/user/signup", async (req, res) => {
    const {companyName, email, password} = req.body;

    if(!companyName || !email || !password){
        return res.send(400).json({error : "All field are mandatory!"});
    }

    const user = await Users.findOne({email});
    if(user){
        return res.status(200).json({message : "Users already registerd."});
    }
    else{
        const response = schema.safeParse(email);
        if(response.success){
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await Users.create({
                companyName,
                email,
                password : hashedPassword,
                fullName : "",
                address : "",
                city : "",
                pincode : "",
                state : "",
                phoneNumber : "",
                bankName : "",
                accountName : "",
                accountNumber : "",
                photo : "",
            });
            console.log("User signedUp successfully.");
            return res.status(200).json({message : "User signedUp successfully."});
        }
        else{
            console.log("Invalid email");
            return res.status(400).json({message : "Entered email is invalid."});
        }
    }
})