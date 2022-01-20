import jwt from "jsonwebtoken";
const auth = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decoded_data;
    if (token && isCustomAuth) {
      decoded_data = jwt.verify(token, "test");
      req.userId = decoded_data?.id;
    } else {
      decoded_data = jwt.decode(token);
      req.userId = decoded_data?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
