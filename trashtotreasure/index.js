require("dotenv").config();
const api = require("./app");
const PORT = process.env.PORT || 8080;

api.listen(PORT, () => {
    console.log("App is listening on port " + PORT);
});
