const bcrypt = require("bcrypt");

function validate(user) {
    const userData = user;
    if (userData.userName == "" || userData.password == "") {
        return "{message: incomplete user's credentials}";
    }
    return userData;
}


//возвращает промис
async function hashPassword(password) {
    const userPassword = password;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPass = await bcrypt.hash(userPassword, salt);
    // console.log(hashPass);
    return hashPass;
}

// module.exports = {
//     validate,
//     heshPassword
// };
module.exports.validate = validate;
module.exports.hashPassword = hashPassword;