const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;
const models = require("../models/user.js");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

// async function createDb() {
//     await client.connect();
//     try {
//         console.log('Connected to MongoDB');
//         const usersDb = await client.db("usersDb"); 
//         const usersCollection = await usersDb.createCollection("usersCollection");
//         console.log(await client.db().admin().listDatabases());
//         return await client.db().admin().listDatabases();
//     } finally {
//         await client.close();
//         console.log('Disconnected from MongoDB');
//     }
// }
// createDb().catch(console.log);

async function connectDb() {
    await client.connect();
    try {
        console.log("Connected to MongoDB");
        const dataBase = await client.db("usersDb");
        return dataBase;
    } catch (err) {
        throw new Error(err);
    }
}

async function connectDbForCreateUser(user) {
    const usersDb = await connectDb();
    try {
        const userName = user.username;
        const userpassword = user.password;
        const usersCollection = await usersDb.collection("usersCollection");
        let findUser = await usersCollection.findOne({ username: userName });
        if (findUser) {
            console.error("User already exist: ", findUser);
            throw new Error("User already exist");
        }
        const userPasswordHesh = await models.hashPassword(userpassword);
        let result = await usersCollection.insertOne({ username: userName, password: `${userPasswordHesh}` });
        return result.insertedId;
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
};


async function connectDbForFindUser(user) {
    const usersDb = await connectDb();
    try {
        const userName = user.username;
        const usersCollection = await usersDb.collection("usersCollection");
        let findUser = await usersCollection.findOne({ username: userName });
        console.log(`connectDbForFindUser:`, findUser)
        if (!findUser) {
            console.error("user not found");
            throw new Error("user not found");
        }
        return findUser;
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
};

async function connectDbForFindUserById(userid) {
    const usersDb = await connectDb();
    try {
        const userId = new ObjectId(userid);
        const usersCollection = await usersDb.collection("usersCollection");
        let findUser = await usersCollection.findOne({ _id: userId });
        if (!findUser) {
            console.error("user not found");
            throw new Error("user not found");
        }
        return findUser;
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

async function connectDbForUpdateUser(userid, user) {
    const usersDb = await connectDb();
    try {
        const userId = new ObjectId(userid);
        const updateData = user;
        const usersCollection = await usersDb.collection("usersCollection");
        let updatedUser = await usersCollection.updateOne({ _id: userId }, { $set: updateData });
        return updatedUser;
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

async function connectDbForDeleteUser(userid) {
    const usersDb = await connectDb();
    try {        
        const userId = new ObjectId(userid);        
        const usersCollection = await usersDb.collection("usersCollection");
        let deletedUser = await usersCollection.deleteOne({ _id: userId });
        return deletedUser;
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

// async function connectDbForCreateUser(user) {
//     await client.connect();
//     try {
//         const userName = user.username;
//         const userpassword = user.password;
//         console.log('Connected to MongoDB');
//         const usersDb = await client.db("usersDb");
//         const usersCollection = await usersDb.collection("usersCollection");
//         let findUser = await usersCollection.findOne({ username: userName });
//         if (findUser) {
//             console.error("User already exist: ", findUser);
//             throw new Error("User already exist");
//         }
//         const userPasswordHesh = await models.hashPassword(userpassword);
//         let result = await usersCollection.insertOne({ username: userName, password: `${userPasswordHesh}` });
//         return result.insertedId;
//     } finally {
//         await client.close();
//         console.log('Disconnected from MongoDB');
//     }
// };

// async function connectDbForFindUser(user) {
//     await client.connect();
//     try {
//         const userName = user.username;
//         console.log('Connected to MongoDB');
//         const usersDb = await client.db("usersDb");
//         const usersCollection = await usersDb.collection("usersCollection");
//         let findUser = await usersCollection.findOne({ username: userName });
//         console.log(`connectDbForFindUser:`, findUser)
//         if (!findUser) {
//             console.error("user not found");
//             throw new Error("user not found");
//         }
//         return findUser;
//     } finally {
//         await client.close();
//         console.log('Disconnected from MongoDB');
//     }
// };

// async function connectDbForFindUserById(userid) {
//     await client.connect();
//     try {
//         const userId = new ObjectId(userid);
//         console.log('Connected to MongoDB');
//         const usersDb = await client.db("usersDb");
//         const usersCollection = await usersDb.collection("usersCollection");        
//         let findUser = await usersCollection.findOne({ _id: userId });
//         if (!findUser) {
//             console.error("user not found");
//             throw new Error("user not found");
//         }
//         return findUser;
//     } finally {
//         await client.close();
//         console.log('Disconnected from MongoDB');
//     }
// }

// async function connectDbForUpdateUser(userid, user) {
//     await client.connect();
//     try {
//         console.log('Connected to MongoDB');
//         const userId = new ObjectId(userid);
//         const updateData = user;
//         const usersDb = await client.db("usersDb");
//         const usersCollection = await usersDb.collection("usersCollection");
//         let updatedUser = await usersCollection.updateOne({ _id: userId }, { $set: updateData });
//         return updatedUser;
//     } finally {
//         await client.close();
//         console.log('Disconnected from MongoDB');
//     }
// }

// async function connectDbForDeleteUser(userid) {
//     await client.connect();
//     try {
//         console.log('Connected to MongoDB');
//         const userId = new ObjectId(userid);
//         const usersDb = await client.db("usersDb");
//         const usersCollection = await usersDb.collection("usersCollection");
//         let deletedUser = await usersCollection.deleteOne({ _id: userId });
//         return deletedUser;
//     } finally {
//         await client.close();
//         console.log('Disconnected from MongoDB');
//     }
// }

module.exports = {
    connectDbForCreateUser,
    connectDbForFindUser,
    connectDbForFindUserById,
    connectDbForUpdateUser,
    connectDbForDeleteUser
};