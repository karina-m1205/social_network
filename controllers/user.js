require("dotenv").config();
const jwt = require("jsonwebtoken");
const models = require("../models/user.js");
const connectDbModule = require("../config/db.js");
const SECRET_KEY = `${process.env.SECRET_KEY}`;

async function userRegistration(user) {
    const userData = user;
    models.validate(userData);
    return connectDbModule.connectDbForCreateUser(userData);
}

async function userLogin(user) {
    const userData = user;
    models.validate(userData);

    return connectDbModule.connectDbForFindUser(userData).then((found) => {
        const token = jwt.sign({ username: found.username }, SECRET_KEY, { expiresIn: 60 * 60 });
        console.log(`token`, token);
        return token;
    });
}


async function getUserById(userid) {
    const userId = userid;
    let findUser = await connectDbModule.connectDbForFindUserById(userId);
    console.log(`findUser`, findUser);
    return findUser;
}

async function updateUserById(userid, user) {
    const userId = userid;
    const updateData = user;
    const findUser = await connectDbModule.connectDbForFindUserById(userId);
    if (!findUser) {
        console.error("user not found");
        throw new Error("user not found");
    }
    const updatedUser = await connectDbModule.connectDbForUpdateUser(userId, updateData);
    return updatedUser;
}

async function deleteUserById(userid) {
    const userId = userid;

    const findUser = await connectDbModule.connectDbForFindUserById(userId);
    if (!findUser) {
        console.error("user not found");
        throw new Error("user not found");
    }
    const deletedUser = await connectDbModule.connectDbForDeleteUser(userId);    
    return deletedUser;
}

module.exports = {
    userRegistration,
    userLogin,
    getUserById,
    updateUserById,
    deleteUserById
}


