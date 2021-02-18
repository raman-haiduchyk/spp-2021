const Sequelize = require("sequelize");

const sequelize = new Sequelize('findworkdb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Job = sequelize.define("job", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salary: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    requirments: {
        type: Sequelize.STRING,
        allowNull: false
    },
    responsibilities: {
        type: Sequelize.STRING,
        allowNull: false
    },
    offers: {
        type: Sequelize.STRING,
        allowNull: false
    },
    specialization: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


const Company = sequelize.define("company", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    home_page: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

Company.hasMany(Job, { onDelete: "cascade" });
Job.belongsTo(Company);

module.exports = {
    sequelize: sequelize,
    Job: Job,
    Company: Company
}