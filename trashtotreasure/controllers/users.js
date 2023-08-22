const bcrypt = require("bcrypt");

const User = require("../models/User");
const Token = require("../models/Token");



function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


const getAll = async (req, res) => {
  try {
    return res.send((await User.getAllUsers()).rows);
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
};

const getOne = async (req, res) => {
  try {
    const result = (await User.getById(parseInt(req.params.id))).rows;
    if (result.length === 0) {
      throw new Error("User was not found");
    }
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
    console.log(user)
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
    res.status(302).redirect("/login");
  } catch (error) {}
}

const deleteOne = async (req, res) => {
  try {
    return res.send((await User.delete(parseInt(req.params.id))).rows);
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
