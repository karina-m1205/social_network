const express = require("express");
const controllers = require("../controllers/user.js");
const registrationRouter = express.Router();
const loginRouter = express.Router();
const getUserByIdRouter = express.Router();
const updateUserByIdRouter = express.Router();
const deleteUserByIdRouter = express.Router();


registrationRouter.post("/", (req, res) => {
    const { username, password } = { ...req.body };
    if (!username || !password) {
        return res.status(400).json({ message: "fields required" });
    }
    const user = {
        username: username,
        password: password,
    };

    (async () => {
        try {
            let userId = await controllers.userRegistration(user);
            return res.status(200).json({ id: userId, message: "User registered successfully" });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })();
})

loginRouter.post("/", (req, res) => {
    const { username, password } = { ...req.body };
    if (!username || !password) {
        return res.status(400).json({ message: "fields required" });
    }
    const user = {
        username: username,
        password: password,
    };

    (async () => {
        try {
            let token = await controllers.userLogin(user);
            return res.status(200).json({ message: token });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })();
})

getUserByIdRouter.get("/:id", (req, res) => {
    const userId = req.params.id;
    (async () => {
        try {
            const user = await controllers.getUserById(userId);
            return res.status(200).json({ message: user });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })();
})

updateUserByIdRouter.put("/:id", (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    (async () => {
        try {
            const changedUser = await controllers.updateUserById(userId, userData);
            return res.status(200).json({ mesage: changedUser });
        } catch (err) {
            return res.status(400).json({ message: err.mesage });
        }
    })();
})

deleteUserByIdRouter.delete("/:id", (req, res) => {
    const userId = req.params.id;
    (async () => {
        try {
            const deletedUser = await controllers.deleteUserById(userId);
            return res.status(200).json({ message: deletedUser });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })();
})


module.exports = {
    registrationRouter,
    loginRouter,
    getUserByIdRouter,
    updateUserByIdRouter,
    deleteUserByIdRouter
}