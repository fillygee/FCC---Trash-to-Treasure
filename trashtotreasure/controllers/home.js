const path = require("path");
const staticPath = path.join(__dirname, "../static");

// const index = async (req, res) => {
//   res.sendFile(path.join(staticPath, "index.html"));
// };

const register = async (req, res) => {
  res.sendFile(path.join(staticPath, "register.html"));
};

// const login = async (req, res) => {
//     res.sendFile(path.join(staticPath, "login.html"));
// };

const homepage = async (req, res) => {
  res.sendFile(path.join(staticPath, "posts.html"));
};

module.exports = { register, homepage };
