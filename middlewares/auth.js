import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload.userId;
    next();
  } catch (error) {
    res.status(400).send({
      success: false,
      error: `Sorry you don't have permission to view or perform such actions`,
    });
  }
};

export default auth;
