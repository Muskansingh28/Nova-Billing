import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnection.js";
import signup from "./routes/Signup/signup.js";
import login from "./routes/Login/login.js";
import Verification from "./routes/Verification/sendOTP.js";
import Authentication from "./middleware/Auth.js";
import getProfileData from "./routes/Profile/getProfileData.js";
import updateProfile from "./routes/Profile/updateProfile.js";
import invoiceRouteAdd from "./routes/Invoice/Add/invoice.js";
import invoiceRouteGet from "./routes/Invoice/Get/invoice.js";
import paymentStatus from "./routes/Invoice/Update/PaymentStatus/paymentStatus.js";
import orderStatus from "./routes/Invoice/Update/OrderStatus/orderStatus.js";
import invoiceCount from "./routes/Invoice/Get/Count/invoice.js";
import ReportData from "./routes/Invoice/Get/Report/invoice.js";
import uploadLogo from "./routes/Profile/uploadLogo.js";
import GetLogo from "./routes/Navbar/GetLogo/Navbar.js";
import ForgotPassword from "./routes/ForgotPassword/ForgotPassword.js";
import ResetPassword from "./routes/ResetPassword/ResetPassword.js";
// import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDB();
const app = express();
const port = 8000;
app.use(express.json({ limit: '99mb' }));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));




app.use(cors()); // use on deployment mode
// app.use(cors({ // on production mode
//     origin: `${process.env.REACT_APP_BASE_URL}`,
//     optionsSuccessStatus: 200 // Some legacy browsers choke on 204
// }));

app.get("/", (req,res)=>{
    res.status(200).json({message : "PayFlow is a Invoice generator."});
})
app.use(signup);
app.use(login);
app.use(Verification);
app.use(ForgotPassword);
app.use(Authentication, getProfileData);
app.use(Authentication, updateProfile);
app.use(Authentication, invoiceRouteAdd);
app.use(Authentication, invoiceRouteGet);
app.use(Authentication, paymentStatus);
app.use(Authentication, orderStatus);
app.use(Authentication, invoiceCount);
app.use(Authentication, ReportData);
app.use(Authentication, uploadLogo);
app.use(Authentication, GetLogo);
app.use(Authentication, ResetPassword);

// app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

