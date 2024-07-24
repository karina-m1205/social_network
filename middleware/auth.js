require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = `${process.env.SECRET_KEY}`;

function validateToken(req, res, next) {
    const authorization = req.headers["authorization"];
    if (!authorization) {
        return res.status(401).json({ message: "token is required" });
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, data) => {
        if (err) {
            return res.status(401).json({ message: "invalid token" });
        }
        req.user = data.username;
        return next();
    })
};

module.exports = validateToken;