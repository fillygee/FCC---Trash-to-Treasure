const path = require("path");
const public = path.join(__dirname, "../static");

// const index = async (req, res) => {
//   res.sendFile(path.join(public, "index.html"));
// };

const register = async (req, res) => {
    res.sendFile(path.join(public, "register.html"));
};

const login = async (req, res) => {
    res.sendFile(path.join(public, "login.html"));
};

const homepage = async (req, res) => {
    res.sendFile(path.join(public, "homepage.html"));
};

module.exports = { register, login, homepage };
