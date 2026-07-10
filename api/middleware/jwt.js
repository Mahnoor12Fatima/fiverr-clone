import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      message: "You are not authenticated",
    });
  }

  const token = authHeader.split(" ")[1];

jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
  if (err) {
    return res.status(403).json({
      message: "Token is not valid",
    });
  }

  console.log("JWT Payload:", payload);

  req.userId = payload.id;
  req.isSeller = payload.isSeller;

  console.log("req.isSeller:", req.isSeller);

  next();
});
};