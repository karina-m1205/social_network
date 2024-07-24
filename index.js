require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const routes = require("./routes/user.js");
const auth = require("./middleware/auth.js")
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/registration", routes.registrationRouter);
app.use("/login", routes.loginRouter);
app.use("/user", auth, routes.getUserByIdRouter);
app.use("/user", auth, routes.updateUserByIdRouter);
app.use("/user", auth, routes.deleteUserByIdRouter);

app.listen(PORT, () => {
    console.log(`application run on http://localhost:${PORT}`);
})

