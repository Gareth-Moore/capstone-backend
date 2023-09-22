import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  console.log(userId, "start token");
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1);

  res.cookie("jwt", token, {
    httpOnly: false,
    path: "/",
    secure: true,
    // secure: process.env.NODE_ENV !== "development",
    sameSite: "none",
    domain: ".onrender.com",
    expires: expiryDate,
  });
  console.log(userId, "end token");
};

export default generateToken;
