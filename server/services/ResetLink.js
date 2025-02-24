import nodeMailer from "nodemailer";
import mailgen from "mailgen";
import dotevn from "dotenv";
dotevn.config();


async function sendResetLink(token, email) {
  try {
    const cred = {
      service : "gmail",
      auth : {
        user : process.env.SENDER_MAIL,
        pass : process.env.SENDER_PASS 
      }
    }
    
    let transporter = nodeMailer.createTransport(cred);
    
    let MailGenerator = new mailgen({
      theme : "default",
      product : {
        name : "Mailgen",
        link : "https://mailgen.js"
      }
    })
    
    
    let message = {
      from : process.env.SENDER_MAIL,
      to : email,
      subject : "Reset Password link - NovaBills",
      html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="${process.env.REACT_APP_BASE_URL}/reset-password/${token}">${process.env.REACT_APP_BASE_URL}/reset-password/${token}</a>
    <br/>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>
    <h2>From NovaBills</h2>
    `,
    }
    
    await transporter.sendMail(message)
    console.log("Reset link sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }

}

export { sendResetLink };