const {Sequelize,DataTypes} = require('sequelize')

const sequelize = new Sequelize('invoice', 'root', 'root', {
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
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  theme: {
    type: DataTypes.STRING
  },
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
  }
})

User.belongsTo(Role, {foreignKey: "roleId"})

module.exports = {sequelize, User, Invoice, Ticket, Role}