const { Role, User } = require("./sequelize");


exports.createRoles = async () => {
  const newRoles = [
    { name: 'admin', access_level: 1 },
    { name: 'accountant', access_level: 2 },
    { name: 'dep_employee', access_level: 3 },
  ];

  return Role.findAll().then((roles) => {
    if (roles.length === 0) Role.bulkCreate(newRoles).catch((_) => console.log('Error creating roles'));
  });
}

exports.createAdmin = async () => {
  const admin = {
    firstName: process.env.ADMIN_NAME,
    lastName: process.env.ADMIN_LAST_NAME,
    email : process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PWD,
    roleId: 1,
    verified: true
  }

  console.log(admin)

  User.findOne({
    where: {
      email: admin.email
    }
  })
  .then((user) => {
    if(!user) return User.create(admin).then((_) => console.log("Admin created"))
  })
}

exports.createAccountant = async () => {
  const accountant = {
    firstName: process.env.ACC_NAME,
    lastName: process.env.ACC_LAST_NAME,
    email : process.env.ACC_EMAIL,
    password: process.env.ACC_PWD,
    roleId: 2,
    verified: true
  }

  User.findOne({
    where: {
      email: accountant.email
    }
  })
  .then((user) => {
    if(!user) return User.create(accountant).then((_) => console.log("Accountant created"))
  })
}

exports.createDepEmployee = async () => {
const dep_employee = {
    firstName: process.env.DEP_NAME,
    lastName: process.env.DEP_LAST_NAME,
    email : process.env.DEP_EMAIL,
    password: process.env.DEP_PWD,
    roleId: 3,
    verified: true
  }

  User.findOne({
    where: {
      email: dep_employee.email
    }
  })
  .then((user) => {
    if(!user) return User.create(dep_employee).then((_) => console.log("Department Employee created"))
  })
}