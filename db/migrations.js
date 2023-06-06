const { Role, User, ADUser, Invoice } = require("./sequelize");
const {users} = require("./ad-users") 
const crypto = require("crypto");
const { invoices } = require("./invoices");

exports.createRoles = async () => {
  const newRoles = [
    { name: 'admin', access_level: 1 },
    { name: 'HOD' , access_level: 2 },
    { name: 'accountant', access_level: 3 },
    { name: 'contributer' , access_level: 4},
    { name: 'viewer', access_level: 5}
  ];

  return Role.findAll().then((roles) => {
    if (roles.length === 0) Role.bulkCreate(newRoles).catch((_) => console.log('Error creating roles'));
  });
}

exports.createAdmin = async () => {
  const admin = {
    SID: crypto.randomUUID(),
    fullname: process.env.ADMIN_FULLNAME,
    email : process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PWD,
    username: process.env.ADMIN_USERNAME,
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
    SID: crypto.randomUUID(),
    fullname: process.env.ACC_FULLNAME,
    email : process.env.ACC_EMAIL,
    password: process.env.ACC_PWD,
    username: process.env.ACC_USERNAME,
    roleId: 3,
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
    SID: crypto.randomUUID(),
    fullname: process.env.DEP_FULLNAME,
    email : process.env.DEP_EMAIL,
    username: process.env.DEP_USERNAME,
    password: process.env.DEP_PWD,
    roleId: 2,
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

exports.createAdUsers = async () => {
  return ADUser.bulkCreate(users).then(() => console.log("AD Users created")).catch(e => console.log(e))
}

exports.createInvoices = async () => {
  return Invoice.bulkCreate(invoices).then(() => console.log("Invoices created")).catch(e => console.log(e))
}