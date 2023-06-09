const {Sequelize,DataTypes} = require('sequelize')

const sequelize = new Sequelize('invoice', 'root', '', {
    port: 3306,
    dialect: 'mysql'
})

const User = sequelize.define("users" , {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  SID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  theme: {
    type: DataTypes.STRING
  },
  department: {
    type: DataTypes.STRING
  }
})

const ADUser = sequelize.define("ADUsers" , {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  SID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullname : {
    type: DataTypes.STRING,
    allowNull: false
  },
  departmentId: {
    type: DataTypes.INTEGER
  }
})

const Invoice = sequelize.define("invoices" , {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  invoiceCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(["matched","not-matched","under-clarification","signed","error"]),
    allowNull: false
  },
  department: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

const Role = sequelize.define("roles" , {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
  },
  access_level: {
    type: DataTypes.INTEGER,
    validate: {
      min:1,
      max: 3
    }
  }
})

const Ticket = sequelize.define("tickets" , {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING
  }
})

User.belongsTo(Role, {foreignKey: "roleId"})
Invoice.belongsTo(Ticket, {foreignKey: "ticketId"})

module.exports = {sequelize, User, Invoice, Ticket, Role , ADUser}