module.exports = (sequelize, DataTypes) => {
  return sequelize.define("chapter", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      text: {
          type: DataTypes.STRING,
          allowNull: false
      },
      number: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
  }); 
}