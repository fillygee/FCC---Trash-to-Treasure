const Token = require("../models/Token");

async function authenticator(req, res, next) {
  try {
    const extractedToken = req.headers.cookie.split("=")[1];

    if (extractedToken.length === 0) {
      throw new Error();
    } else {
      const validToken = await Token.getOneByToken(extractedToken);
      res.locals.token = extractedToken;
      res.locals.user = validToken.username;
      next();
    }
  } catch (err) {
    res.status(403).redirect("/");
  }
}

module.exports = authenticator;
