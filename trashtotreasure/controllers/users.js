const bcrypt = require("bcrypt");

const User = require("../models/User");
const Token = require("../models/Token");

const getAll = async (req, res) => {
  try {
    return res.send((await User.getAllUsers()).rows);
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
};

const getOne = async (req, res) => {
  try {
    const result = await User.getById(parseInt(req.params.id));
    return res.send(result);
  } catch (error) {
    return res
      .status(404)
      .send("Could not find specified user with specified id!");
  }
};

async function register(req, res) {
  try {
    const data = req.body;

    // Generate a salt with a specific cost
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    // Hash the password
    data["password"] = await bcrypt.hash(data["password"], salt);

    data["isAdmin"] = false;
    //console.log(data)
    const result = await User.create(data);

    return res.status(201).send(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const data = req.body;
    const user = await User.getOneByUsername(data.username);
    console.log(user);
    const authenticated = await bcrypt.compare(data.password, user["password"]);

    if (!authenticated) {
      throw new Error("Incorrect credentials.");
    } else {
      const token = await Token.create(user.user_id);
      res
        .cookie("authorization", token.token, { httpOnly: false })
        .status(200)
        .json({ authorized: true });
    }
  } catch (error) {
    res.status(403).json({ error: "Unauthorized" });
  }
}

async function logout(req, res) {
  try {
    Token.deleteByToken(res.locals.token);
    res.clearCookie("authorization");
    res.status(302).redirect("/");
  } catch (error) {}
}

const deleteOne = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    const result = await user.delete();
    return res.status(204).send(result);
  } catch (error) {
    return res.status(500).send("Could not add delete user with specified id!");
  }
};

const loggedInCheck = async (req, res) => {
  res.status(302).json({ status: "authorized" });
};

module.exports = {
  getAll,
  getOne,
  register,
  deleteOne,
  login,
  logout,
  loggedInCheck,
};
