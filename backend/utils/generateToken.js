import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  console.log(userId, "start token");
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    // secure: process.env.NODE_ENV !== "development",
    sameSite: "none",
    domain: "https://back-for-seconds.onrender.com",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  console.log(userId, "end token");
};

export default generateToken;
