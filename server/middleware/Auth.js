import jwt from "jsonwebtoken";

export default async function Authentication(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authentication failed: Missing token" });
    }
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.redirect("/login");
    }

    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = data.User.ID;
    next();
    
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Authentication failed: Invalid token" });
  }
}
