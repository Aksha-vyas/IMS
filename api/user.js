
require('./models/db')
const UserDAO = require('./models/user')
const {  UserInputError } = require('apollo-server-express');




async function loginVerify(_, { user }) {
    var filter = { userId: "", password:"" };
    console.log("user  ____"+JSON.stringify(user))
        filter.userId = user.userId;
        filter.password = user.password;
        console.log("user filter  ____"+JSON.stringify(filter));
        const loggedinuser = await UserDAO.findOne({userId:user.userId, password: user.password})
        console.log("response  ____"+JSON.stringify(loggedinuser));
        console.log("response  ____"+loggedinuser);
        return loggedinuser;
}

module.exports = { loginVerify };