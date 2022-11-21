require('./db')
const userType = require('./userType')
const user = require('./user')

function aaa_userType() {
    const userTypes = [
        {
            role: "Admin",
        },
        {
            role: "Associate",
        },
        {
            role: "Supervisor",
        }
    ]
    console.log("aaa");
    userType.insertMany(userTypes);
}
function aaa_users() {
    const users = [
        {
            userId: "emy", password: "password", userType:"637070793aafddfee001c908"
        },
        {
            userId: "sharan", password: "password", userType:"637070793aafddfee001c90a"
        },
        {
            userId: "aksha", password: "password", userType:"637070793aafddfee001c909"
        }
    ]
    user.insertMany(users);
}

function aaa(){
    console.log("aaa is empty")
}

module.exports = { aaa };