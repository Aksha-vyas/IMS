
require('./models/db')
const UserDAO = require('./models/user')
const {  UserInputError } = require('apollo-server-express');




async function loginVerify(_, { user }) {
    var filter = { userId: "", password:"" };
    console.log("user  ____"+JSON.stringify(user))
        filter.userId = user.userId;
        filter.password = user.password;
        console.log("user filter  ____"+JSON.stringify(filter));
        const loggedinuser = await UserDAO.findOne({userId:user.userId, password: user.password}).populate('userType')
        // loggedinuser.userType = await UserDAO.findOne({userId:user.userId, password: user.password}).populate('userType')
        console.log("response  ____"+JSON.stringify(loggedinuser));
        console.log("response  ____"+loggedinuser);
        return loggedinuser;
}

async function userList()
{
    const users = await UserDAO.find({}).populate('userType')
    .then((users)=> {
        return users;
    })
    console.log("users.... "+JSON.stringify(users))
    return users;
}
async function addUser(_, { user }) {
    const newUser = new UserDAO(user);
    const userCreated = await (await newUser.save()).populate("userType");
    console.log('created user... ', userCreated);
    return userCreated;
}

/*

async function maxId()
{
    // const id = await EmployeeDAO.findOne({$query:{},$orderby:{id:1}})
    const id = await EmployeeDAO.findOne({}).sort({ id: -1 })
    .then((response)=> {
        console.log(JSON.stringify("id inside the ql  "+response.id))
        return !response?0:response.id;
    });
    return id;
}


function validateIssue(employee) {
    console.log(employee)
    const errors = [];
    if (employee.age < 20) {
        errors.push('Age should be greater than 20')
    }
    if (employee.age > 70) {
        errors.push('Age should be less than 70')
    }
    console.log(errors.length)
    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', { errors });
    }
}

async function addEmployee(_, { employee }) {
    validateIssue(employee);
    const emp = new EmployeeDAO(employee);
    const empCreated = await emp.save();
    console.log('created employee... ', empCreated);
    return empCreated;
}


async function updateEmployee(_, { employee }) {
    const emp = new EmployeeDAO(employee);
    const res = await EmployeeDAO.updateOne({id:employee.id},employee);
    console.log("Response___api/employee.js"+JSON.stringify(res))
    return "updated";
  }
  
  async function deleteEmployee(_, { id }) {
    await EmployeeDAO.deleteOne({id:id});
    return "deleted";
  }
  
  async function getEmployee(_, { id }) {
    const employee = await EmployeeDAO.findOne({ id });
    return employee;
  }
  */
module.exports = { loginVerify ,userList, addUser };