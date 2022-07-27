const jwt = require("jsonwebtoken");
const User = require("../ ");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    const decoded = jwt.verify(token, "arandomstring");
    const user = await User.findOne({ _id: decoded._id });
  } catch (e) {
    res.status(401).send({ error: "Please auth" });
  }
};
module.exports = auth;
